import { useParams, Link } from 'react-router-dom';
import { getDollById, type DollConfig, type WishCategory } from '@/data/dolls';
import { getDollImage } from '@/data/dollImages';
import { useCallback, useEffect, useRef, useState } from 'react';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const PIN_COLORS = ["#c62828","#1565c0","#2e7d32","#f9a825","#6a1b9a","#ad1457","#e65100","#00838f"];
const ESCALATIONS = [
  { min: 0, pct: 2, tier: 'mild' },
  { min: 5, pct: 22, tier: 'mild' },
  { min: 12, pct: 48, tier: 'moderate' },
  { min: 25, pct: 74, tier: 'moderate' },
  { min: 40, pct: 100, tier: 'intense' },
];

function getEsc(pinCount: number, labels: string[]) {
  let idx = 0;
  for (let i = 0; i < ESCALATIONS.length; i++) {
    if (pinCount >= ESCALATIONS[i].min) idx = i;
  }
  return { ...ESCALATIONS[idx], label: labels[idx] || labels[0] };
}

function WishesSection({ wishes, showToast }: { wishes: WishCategory[]; showToast: (msg: string) => void }) {
  const [wishTexts, setWishTexts] = useState<string[]>(() => wishes.map(w => w.pool[Math.floor(Math.random() * w.pool.length)]));
  const [sentWishes, setSentWishes] = useState<Set<number>>(new Set());

  function shuffleWish(idx: number) {
    setWishTexts(prev => {
      const next = [...prev];
      let newText: string;
      do {
        newText = wishes[idx].pool[Math.floor(Math.random() * wishes[idx].pool.length)];
      } while (newText === prev[idx] && wishes[idx].pool.length > 1);
      next[idx] = newText;
      return next;
    });
    setSentWishes(prev => { const n = new Set(prev); n.delete(idx); return n; });
  }

  function sendWish(idx: number) {
    if (sentWishes.has(idx)) return;
    setSentWishes(prev => new Set(prev).add(idx));
    showToast(`♥ ${wishes[idx].category} wish sent. The universe received it.`);
  }

  return (
    <section id="wishes" className="px-8 py-16">
      <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-2">
        <span className="w-8 h-px bg-voodoo-muted" />The Seven Wishes
      </div>
      <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
        Send a Wish<br /><em className="italic" style={{ color: '#c0394a' }}>Into the World.</em>
      </h2>
      <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light max-w-[580px] mb-8">
        No curses here. No revenge. Just seven wishes you can send into the universe — for yourself, or for someone who needs them.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishes.map((w, i) => (
          <div key={w.category}
            className={`border-[1.5px] rounded-sm p-5 transition-all ${sentWishes.has(i) ? 'opacity-70 border-foreground/10' : 'border-foreground/[0.14] hover:border-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_hsl(var(--ink))]'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{w.icon}</span>
              <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase font-bold" style={{ color: w.color }}>{w.category}</span>
            </div>
            <p className="font-handwritten text-[0.9rem] leading-relaxed text-ink mb-3 min-h-[60px]">{wishTexts[i]}</p>
            <div className="flex gap-2 items-center">
              <button onClick={() => shuffleWish(i)}
                className="font-mono text-[0.55rem] tracking-[0.1em] uppercase bg-transparent text-voodoo-muted border-[1px] border-foreground/[0.14] px-3 py-2 cursor-pointer hover:text-ink hover:border-ink transition-all">
                ↻ Another
              </button>
              <button onClick={() => sendWish(i)}
                className={`font-mono text-[0.55rem] tracking-[0.1em] uppercase px-3 py-2 cursor-pointer transition-all ${sentWishes.has(i) ? 'bg-transparent text-voodoo-muted border-[1px] border-foreground/10' : 'text-white border-none'}`}
                style={!sentWishes.has(i) ? { background: w.color } : {}}
                disabled={sentWishes.has(i)}>
                {sentWishes.has(i) ? '♥ Sent' : '♥ Send This Wish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DollPage() {
  const { dollId } = useParams<{ dollId: string }>();
  const doll = getDollById(dollId || '');
  const isBonus = doll?.category === 'bonus';

  const [pinCount, setPinCount] = useState(0);
  const [escPct, setEscPct] = useState(2);
  const [escLabel, setEscLabel] = useState('');
  const [bossText, setBossText] = useState('');
  const [bossVisible, setBossVisible] = useState(false);
  const [fortuneText, setFortuneText] = useState('');
  const [fortuneRarity, setFortuneRarity] = useState({ text: '', cls: '' });
  const [fortuneVisible, setFortuneVisible] = useState(false);
  const [curseText, setCurseText] = useState('');
  const [vibesText, setVibesText] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const [stabbed, setStabbed] = useState(false);

  const dollAreaRef = useRef<HTMLDivElement>(null);
  const pinColorIdx = useRef(0);
  const curAnnoyance = useRef('');
  const curVibe = useRef('');
  const bossTimer = useRef<ReturnType<typeof setTimeout>>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!doll) return;
    setEscLabel(doll.escLabels[0]);
    shuffleCurse();
    shuffleVibes();
    // Reset state on doll change
    setPinCount(0);
    setEscPct(2);
    setBossVisible(false);
    setFortuneVisible(false);
    // Clear pins
    if (dollAreaRef.current) {
      dollAreaRef.current.querySelectorAll('.doll-pin, .ouch-pop, .sparkle').forEach(el => el.remove());
    }
  }, [dollId]);

  if (!doll) return <div className="min-h-screen bg-cream flex items-center justify-center font-display text-2xl text-ink">Doll not found</div>;

  function showToast(msg: string) {
    setToastMsg(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3500);
  }

  function buildPersonalized(template: string, name: string, color: string) {
    const styled = `<span style="color:${color};font-weight:700">${name}</span>`;
    return template.split('__NAME__').join(styled);
  }

  function shuffleCurse() {
    if (!doll || doll.annoyances.length === 0) return;
    const template = pick(doll.annoyances);
    curAnnoyance.current = template;
    const name = (document.getElementById('curseRecipient') as HTMLInputElement)?.value?.trim().toUpperCase() || 'YOUR BOSS';
    setCurseText(buildPersonalized(template, name, doll.accentColor));
  }

  function shuffleVibes() {
    if (!doll || doll.goodVibes.length === 0) return;
    const template = pick(doll.goodVibes);
    curVibe.current = template;
    const name = (document.getElementById('vibesRecipient') as HTMLInputElement)?.value?.trim().toUpperCase() || 'YOUR FAVORITE PERSON';
    setVibesText(buildPersonalized(template, name, '#c8a030'));
  }

  function revealFortune() {
    if (!doll) return;
    const r = Math.random();
    let pool: { text: string; rarity: string }[], cls: string;
    if (r < 0.6) { pool = doll.fortunes.common; cls = 'common'; }
    else if (r < 0.9) { pool = doll.fortunes.uncommon; cls = 'uncommon'; }
    else { pool = doll.fortunes.rare; cls = 'rare'; }
    const f = pick(pool);
    setFortuneText(f.text);
    setFortuneRarity({ text: f.rarity, cls });
    setFortuneVisible(false);
    requestAnimationFrame(() => setFortuneVisible(true));
  }

  function showBoss(text: string) {
    if (bossTimer.current) clearTimeout(bossTimer.current);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    setBossVisible(true);
    setBossText('');
    bubbleTimer.current = setTimeout(() => {
      setBossText(text);
      bossTimer.current = setTimeout(() => setBossVisible(false), 10000);
    }, 950);
  }

  function spawnSparkles(area: HTMLElement, x: number, y: number) {
    const syms = ["❆","★","·","⋆","✸","◆","✼"];
    const colors = [doll!.accentColor, "#c8a030","#e8c050","#b82a24","#fff8ee"];
    for (let i = 0; i < 9; i++) {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.textContent = pick(syms);
      el.style.color = pick(colors);
      el.style.fontSize = (0.6 + Math.random() * 0.85) + "rem";
      el.style.left = x + "px";
      el.style.top = y + "px";
      const angle = Math.random() * Math.PI * 2;
      const dist = 28 + Math.random() * 65;
      el.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      el.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      area.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }
  }

  function spawnOuch(area: HTMLElement, x: number, y: number) {
    const el = document.createElement("span");
    el.className = "ouch-pop";
    el.textContent = pick(doll!.ouchLines);
    el.style.left = (x - 32) + "px";
    el.style.top = (y - 22) + "px";
    area.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function spawnPin(area: HTMLElement, x: number, y: number) {
    const color = PIN_COLORS[pinColorIdx.current % PIN_COLORS.length];
    pinColorIdx.current++;
    const angle = Math.random() * 30 - 15;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "52");
    svg.setAttribute("viewBox", "0 0 18 52");
    svg.classList.add("doll-pin");
    svg.style.left = (x - 9) + "px";
    svg.style.top = (y - 52) + "px";
    svg.style.transform = `rotate(${angle}deg)`;

    const shaft = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    shaft.setAttribute("x", "8"); shaft.setAttribute("y", "14");
    shaft.setAttribute("width", "2"); shaft.setAttribute("height", "36");
    shaft.setAttribute("rx", "1"); shaft.setAttribute("fill", "#c8c0b4");
    svg.appendChild(shaft);

    const tip = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    tip.setAttribute("cx", "9"); tip.setAttribute("cy", "49");
    tip.setAttribute("rx", "1.2"); tip.setAttribute("ry", "2");
    tip.setAttribute("fill", "#7a7060");
    svg.appendChild(tip);

    const headShadow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    headShadow.setAttribute("cx", "9"); headShadow.setAttribute("cy", "9");
    headShadow.setAttribute("r", "8"); headShadow.setAttribute("fill", "rgba(0,0,0,0.2)");
    headShadow.setAttribute("transform", "translate(1,1)");
    svg.appendChild(headShadow);

    const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", "9"); head.setAttribute("cy", "9");
    head.setAttribute("r", "8"); head.setAttribute("fill", color);
    svg.appendChild(head);

    const shine = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    shine.setAttribute("cx", "6.5"); shine.setAttribute("cy", "5.5");
    shine.setAttribute("rx", "3"); shine.setAttribute("ry", "2.2");
    shine.setAttribute("fill", "rgba(255,255,255,0.38)");
    svg.appendChild(shine);

    area.appendChild(svg);
  }

  const HEART_GLYPHS = ["♥","❤","♡","❥","💕","💗","💓","💞","✨","✦"];
  const HEART_COLORS = ["#c8a030","#e8c060","#c0394a","#e07080","#e8a0b0","#d4a000","#f0d060","#b02040"];

  function spawnHearts(area: HTMLElement, x: number, y: number) {
    const count = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.textContent = pick(HEART_GLYPHS);
      el.style.color = pick(HEART_COLORS);
      el.style.fontSize = (0.8 + Math.random() * 1.2) + "rem";
      el.style.left = x + "px";
      el.style.top = y + "px";
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      el.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      el.style.setProperty("--ty", (Math.sin(angle) * dist - 30) + "px");
      area.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  }

  const handleDollClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!doll || !dollAreaRef.current) return;
    const area = dollAreaRef.current;
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCount = pinCount + 1;
    setPinCount(newCount);

    const esc = getEsc(newCount, doll.escLabels);
    setEscPct(esc.pct);
    setEscLabel(esc.label);

    setStabbed(true);
    setTimeout(() => setStabbed(false), 320);

    spawnSparkles(area, x, y);

    if (isBonus) {
      spawnHearts(area, x, y);
    } else {
      spawnOuch(area, x, y);
      spawnPin(area, x, y);
    }

    // Get zone from click position
    const areaHeight = rect.height;
    const yPct = y / areaHeight;
    let zone = 'feet';
    if (yPct < 0.22) zone = 'head';
    else if (yPct < 0.38) zone = 'shoulders';
    else if (yPct < 0.72) zone = 'torso';
    else if (yPct < 0.88) zone = 'hands';

    if (newCount % 3 === 0) {
      showBoss(pick(doll.zoneLines[zone] || doll.zoneLines.torso));
    } else {
      showBoss(pick(doll.escLines[esc.tier] || doll.escLines.mild));
    }
  }, [doll, pinCount, isBonus]);

  function resetPins() {
    setPinCount(0);
    setEscPct(2);
    if (doll) setEscLabel(doll.escLabels[0]);
    setBossVisible(false);
    if (dollAreaRef.current) {
      dollAreaRef.current.querySelectorAll('.doll-pin, .ouch-pop, .sparkle').forEach(el => el.remove());
    }
  }

  function shareDoll() {
    if (navigator.share) {
      navigator.share({ title: 'Virtual Voodoo Dolls™', text: `Try ${doll!.name} — Virtual Voodoo Dolls`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied!'));
    }
  }

  const rarityBg = fortuneRarity.cls === 'rare' ? 'bg-voodoo-red/10 text-voodoo-red'
    : fortuneRarity.cls === 'uncommon' ? 'bg-voodoo-gold/15 text-[#a07820]'
    : 'bg-ink/5 text-voodoo-muted';

  return (
    <div className="min-h-screen bg-cream">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[300] h-[58px] flex items-center justify-between px-8 bg-cream/95 backdrop-blur-[18px] border-b border-foreground/[0.14]">
        <Link to="/" className="font-display font-black text-base text-ink no-underline tracking-tight">
          {doll.categoryLabel.split('™')[0]} <span style={{ color: doll.accentColor }}>Voodoo</span>™
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <a href="#fortune" className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-voodoo-muted no-underline hover:text-ink transition-colors">Fortune</a>
          <a href="#curse" className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-voodoo-muted no-underline hover:text-ink transition-colors">Annoyance</a>
          <a href="#good-vibes" className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-voodoo-muted no-underline hover:text-ink transition-colors">Good Vibes</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[0.56rem] tracking-[0.1em] text-voodoo-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
            <span>{doll.navTagText}</span>
          </div>
          <Link to="/" className="font-body text-[0.7rem] font-bold tracking-[0.08em] uppercase bg-ink text-cream border-none px-4 py-2 cursor-pointer hover:bg-voodoo-red transition-colors no-underline">
            All Dolls ✦
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[28fr_72fr] min-h-screen pt-[58px]">
        {/* Left panel */}
        <div className="flex flex-col justify-center px-8 py-12 bg-cream relative z-[2]">
          <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-4">
            <span className="w-8 h-px bg-voodoo-muted" />
            {doll.navTagText}
          </div>
          <h1 className="font-display font-black leading-none text-ink mb-4" style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.2rem)' }}>
            {doll.heroTitle.map((line, i) => <span key={i}>{line}<br /></span>)}
            <span className="italic" style={{ color: doll.accentColor }}>{doll.heroItalicWord}</span>
          </h1>
          <p className="text-base leading-relaxed text-ink-mid font-light max-w-[460px] mb-6 whitespace-pre-line">
            {doll.heroDescription}
          </p>

          <div className="flex gap-2.5 flex-wrap mb-2">
            <button onClick={() => dollAreaRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-[0.7rem] font-bold tracking-[0.08em] uppercase bg-ink text-cream border-none px-5 py-3 cursor-pointer hover:bg-voodoo-red transition-colors">
              ↓ Meet {doll.name}
            </button>
            <button onClick={() => { revealFortune(); document.getElementById('fortune')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-ink border-[1.5px] border-foreground/[0.14] px-5 py-3 cursor-pointer hover:border-ink transition-colors">
              Get a Fortune
            </button>
          </div>
          <div className="flex gap-2.5 flex-wrap mb-2">
            <button onClick={() => document.getElementById('curse')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-ink border-[1.5px] border-foreground/[0.14] px-5 py-3 cursor-pointer hover:border-ink transition-colors">
              🎲 Send an Annoyance
            </button>
            <button onClick={() => document.getElementById('good-vibes')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-ink border-[1.5px] border-foreground/[0.14] px-5 py-3 cursor-pointer hover:border-ink transition-colors">
              ✨ Send Good Vibes
            </button>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <button onClick={shareDoll}
              className="font-body text-[0.7rem] font-bold tracking-[0.08em] uppercase text-cream border-none px-5 py-3 cursor-pointer hover:brightness-90 transition-all"
              style={{ background: doll.accentColor }}>
              ⬆ Send to a Friend
            </button>
            <button onClick={resetPins}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-voodoo-muted border-[1.5px] border-foreground/[0.14] px-5 py-3 cursor-pointer hover:text-ink hover:border-ink transition-all">
              ↻ Reset Pins
            </button>
          </div>

          <div className="flex items-start gap-8 pt-6">
            <div>
              <span className="font-display font-black text-5xl leading-none block text-ink">{pinCount}</span>
              <span className="font-mono text-[0.54rem] tracking-[0.16em] uppercase block text-voodoo-muted mt-0.5">Pins Stuck</span>
            </div>
          </div>
        </div>

        {/* Right panel - Doll area */}
        <div
          ref={dollAreaRef}
          className="relative flex flex-col items-center justify-center min-h-[calc(100vh-58px)] lg:min-h-0 px-8 py-12 cursor-crosshair border-l border-foreground/[0.14] overflow-visible"
          style={{
            background: 'hsl(var(--cream))',
            boxShadow: 'inset 8px 0 60px rgba(200,160,48,0.07), inset -2px 0 0 rgba(200,160,48,0.04)',
          }}
          onClick={handleDollClick}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_52%_48%,rgba(255,255,255,0.38)_0%,transparent_72%)] pointer-events-none" />
          <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-voodoo-muted mb-4 text-center pointer-events-none select-none z-10">
            📌 Click anywhere on the doll to stick a pin
          </p>
          <div className="relative z-[2] rounded-md overflow-hidden border-[2.5px] border-ink/20 bg-[#e8e6e2] flex items-center justify-center"
            style={{
              width: 'min(72vh, 82%)',
              aspectRatio: '1/1',
              boxShadow: 'inset 0 0 0 5px rgba(255,255,255,0.32), inset 0 0 0 7px rgba(26,20,16,0.07), 0 32px 80px rgba(40,24,8,0.32), 0 6px 18px rgba(40,24,8,0.14)',
            }}>
            {(() => {
              const img = getDollImage(doll.id);
              return img ? (
                <img src={img} alt={doll.name}
                  className={`w-full h-full object-cover object-[center_10%] select-none pointer-events-none transition-transform ${stabbed ? 'animate-[stab_0.32s_ease]' : ''}`}
                  style={{ filter: 'drop-shadow(0 20px 56px rgba(60,35,10,0.42)) drop-shadow(0 4px 14px rgba(60,35,10,0.22))' }}
                />
              ) : (
                <div className={`text-[12rem] select-none pointer-events-none transition-transform ${stabbed ? 'animate-[stab_0.32s_ease]' : ''}`}
                  style={{ filter: 'drop-shadow(0 20px 56px rgba(60,35,10,0.42)) drop-shadow(0 4px 14px rgba(60,35,10,0.22))' }}>
                  {doll.emoji}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ESCALATION BAR */}
      <div className="w-full bg-cream border-y border-foreground/[0.14] px-8 py-3">
        <div className="flex items-center gap-5 w-full">
          <span className="font-mono text-[0.54rem] tracking-[0.18em] uppercase text-voodoo-muted shrink-0">Escalation</span>
          <div className="flex-1 h-2 bg-ink/10 rounded overflow-hidden">
            <div className="esc-fill" style={{ width: `${escPct}%` }} />
          </div>
          <span className="font-body text-[0.78rem] font-semibold text-ink shrink-0 min-w-[155px] text-right">{escLabel}</span>
        </div>
      </div>

      {/* BOSS BAR */}
      <div className={`w-full bg-cream px-8 py-5 border-b border-foreground/[0.14] transition-opacity duration-400 min-h-[68px] ${bossVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-voodoo-muted mb-2">{doll.name} says:</div>
        <div className={`inline-block bg-cream border-[1.5px] border-ink rounded-[20px] px-6 py-3.5 font-handwritten text-ink leading-relaxed max-w-[680px] relative transition-all duration-300 ${bossText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
          style={{ boxShadow: '4px 4px 0 hsl(var(--ink))' }}>
          {bossText || <span className="boss-dots">• • •</span>}
          <span className="absolute top-[-10px] left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-ink" />
          <span className="absolute top-[-7.5px] left-[calc(2rem+1.5px)] w-0 h-0 border-l-[8.5px] border-l-transparent border-r-[8.5px] border-r-transparent border-b-[8.5px] border-b-cream" />
        </div>
      </div>

      <hr className="border-none border-t border-foreground/[0.14]" />

      {/* FORTUNE */}
      <section id="fortune">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 py-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-2">
              <span className="w-8 h-px bg-voodoo-muted" />Office Oracle
            </div>
            <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
              Your Corporate<br /><em className="italic" style={{ color: doll.accentColor }}>Fortune.</em>
            </h2>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              The Office Spirits have a message for you. It may be vaguely prophetic. It may be deeply uncomfortable. Either way — you asked.
            </p>
            <button onClick={revealFortune}
              className="font-mono text-[0.64rem] tracking-[0.14em] uppercase bg-transparent text-ink border-[1.5px] border-ink px-8 py-3.5 cursor-pointer hover:bg-ink hover:text-cream transition-all inline-flex items-center gap-2 mb-3">
              🔮 Reveal Fortune
            </button>
          </div>
          <div>
            {fortuneVisible && (
              <div className="bg-cream border-[1.5px] border-ink p-7 rounded-sm fortune-card-show" style={{ boxShadow: '4px 4px 0 hsl(var(--ink))' }}>
                <div className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-voodoo-muted mb-2.5">Your Fortune</div>
                <p className="font-handwritten text-base text-ink leading-relaxed mb-3">{fortuneText}</p>
                <span className={`font-mono text-[0.54rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm inline-block ${rarityBg}`}>
                  {fortuneRarity.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="border-none border-t border-foreground/[0.14]" />

      {/* WISHES (bonus doll) or CURSE + VIBES (regular dolls) */}
      {doll.wishes && doll.wishes.length > 0 ? (
        <WishesSection wishes={doll.wishes} showToast={showToast} />
      ) : (
        <>
          {/* CURSE / ANNOYANCE */}
          {doll.annoyances.length > 0 && (
            <section id="curse">
              <div className="px-8 py-16 flex flex-col gap-4 items-start">
                <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-2">
                  <span className="w-8 h-px bg-voodoo-muted" />{doll.curseLabel}
                </div>
                <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
                  {doll.curseSectionTitle[0]}<br /><em className="italic" style={{ color: doll.accentColor }}>{doll.curseSectionTitle[1]}</em>
                </h2>
                <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light max-w-[580px]">
                  Not a curse. An annoyance. A minor inconvenience with impeccable aim. Think of someone who deserves a little cosmic nudge today.
                </p>
                <input
                  id="curseRecipient"
                  type="text"
                  placeholder="Enter their name…"
                  maxLength={40}
                  className="font-body text-[0.88rem] bg-cream border-none border-b-[1.5px] border-b-ink px-1 py-2 text-ink w-full max-w-[460px] outline-none"
                  onChange={() => { if (curAnnoyance.current) setCurseText(buildPersonalized(curAnnoyance.current, (document.getElementById('curseRecipient') as HTMLInputElement)?.value?.trim().toUpperCase() || 'YOUR BOSS', doll.accentColor)); }}
                />
                <div className="bg-cream border-[1.5px] border-ink rounded-sm p-5 font-handwritten text-[0.95rem] text-ink leading-relaxed w-full max-w-[700px] min-h-[90px] cursor-pointer relative"
                  style={{ boxShadow: '3px 3px 0 hsl(var(--ink))' }}
                  onClick={shuffleCurse}>
                  <span dangerouslySetInnerHTML={{ __html: curseText }} />
                  <span className="absolute bottom-2 right-3 font-mono text-[0.47rem] tracking-[0.1em] uppercase text-voodoo-muted">click to refresh</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={shuffleCurse}
                    className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-voodoo-muted border-[1.5px] border-foreground/[0.14] px-5 py-3.5 cursor-pointer hover:text-ink hover:border-ink transition-all">
                    🎲 New Annoyance
                  </button>
                  <button onClick={() => showToast(`✦ The spirits have been dispatched.`)}
                    className="font-body text-[0.78rem] font-bold tracking-[0.06em] uppercase bg-ink text-cream border-none px-6 py-3.5 cursor-pointer hover:bg-voodoo-red transition-colors inline-flex items-center gap-2">
                    ✉ Send the Curse
                  </button>
                </div>
              </div>
            </section>
          )}

          <hr className="border-none border-t border-foreground/[0.14]" />

          {/* GOOD VIBES */}
          {doll.goodVibes.length > 0 && (
            <section id="good-vibes">
              <div className="px-8 py-16 flex flex-col gap-4 items-start">
                <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-2">
                  <span className="w-8 h-px bg-voodoo-muted" />{doll.vibesLabel}
                </div>
                <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
                  {doll.vibesSectionTitle[0]}<br /><em className="italic text-voodoo-gold">{doll.vibesSectionTitle[1]}</em>
                </h2>
                <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light max-w-[580px]">
                  You stuck the pins. You sent the curse. Now balance the universe. Think of someone who deserves a little magic today.
                </p>
                <input
                  id="vibesRecipient"
                  type="text"
                  placeholder="Enter their name for the full magic…"
                  maxLength={40}
                  className="font-body text-[0.88rem] bg-cream border-none border-b-[1.5px] border-b-voodoo-gold px-1 py-2 text-ink w-full max-w-[460px] outline-none"
                  onChange={() => { if (curVibe.current) setVibesText(buildPersonalized(curVibe.current, (document.getElementById('vibesRecipient') as HTMLInputElement)?.value?.trim().toUpperCase() || 'YOUR FAVORITE PERSON', '#c8a030')); }}
                />
                <div className="rounded-sm p-5 font-handwritten text-[0.95rem] text-[#a07820] leading-relaxed w-full max-w-[700px] min-h-[90px] cursor-pointer relative"
                  style={{ background: 'linear-gradient(135deg, #fffef5, #fff8e7)', border: '2px solid #c8a030', boxShadow: '4px 4px 0 #c8a030' }}
                  onClick={shuffleVibes}>
                  <span dangerouslySetInnerHTML={{ __html: vibesText }} />
                  <span className="absolute bottom-2 right-3 font-mono text-[0.47rem] tracking-[0.1em] uppercase text-voodoo-muted">click to refresh</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={shuffleVibes}
                    className="font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-transparent text-voodoo-muted border-[1.5px] border-foreground/[0.14] px-5 py-3.5 cursor-pointer hover:text-ink hover:border-ink transition-all">
                    ✨ New Vibe
                  </button>
                  <button onClick={() => showToast(`✨ Good vibes sent. The universe is on it.`)}
                    className="font-body text-[0.78rem] font-bold tracking-[0.06em] uppercase text-white border-none px-6 py-3.5 cursor-pointer hover:brightness-90 transition-all inline-flex items-center gap-2"
                    style={{ background: '#c8a030' }}>
                    ✨ Send the Good Vibes
                  </button>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <hr className="border-none border-t border-foreground/[0.14]" />

      {/* DONATE / SUPPORT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 py-16">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-2">
            <span className="w-8 h-px bg-voodoo-muted" />Support the Craft
          </div>
          <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
            Keep the<br /><em className="italic" style={{ color: doll.accentColor }}>Spirits Funded.</em>
          </h2>
          <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
            Running a voodoo operation isn't free. If this brought you even one moment of cathartic relief — consider throwing the spirits a coin or two.
          </p>
        </div>
        <div className="flex flex-col gap-3.5">
          {[
            { title: 'Merch on Etsy', desc: 'T-shirts & toys. Corporate trauma, now wearable.', icon: '🛍' },
            { title: 'Venmo', desc: 'Send a little something to keep the spirits happy.', icon: '💙' },
            { title: 'PayPal', desc: 'Old school. The spirits accept all currencies.', icon: '💛' },
          ].map(item => (
            <div key={item.title} className="border-[1.5px] border-foreground/[0.14] rounded-sm p-4 hover:border-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_hsl(var(--ink))] transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.icon}</span>
                <span className="font-body text-sm font-bold">{item.title}</span>
              </div>
              <div className="text-xs text-voodoo-muted font-light">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cream border-t-[1.5px] border-foreground/[0.14] px-8 py-6 flex flex-col items-center gap-1 text-center">
        <div className="font-display font-black text-base text-ink">
          {doll.categoryLabel.split('™')[0]} <span style={{ color: doll.accentColor }}>Voodoo</span>™
        </div>
        <div className="text-xs text-voodoo-muted leading-relaxed">{doll.footerTagline}</div>
        <div className="text-[0.65rem] text-voodoo-muted/50 mt-1">{doll.footerDisclaimer}</div>
        <div className="text-voodoo-gold text-base mt-1.5">❖</div>
      </footer>

      {/* TOAST */}
      <div className={`toast-notification ${toastShow ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
