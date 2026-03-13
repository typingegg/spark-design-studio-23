import { Link } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import DonationButtons from '@/components/DonationButtons';
import makerImg from '@/assets/dolls/doll-maker.jpeg';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const lastPicks = new Map<string, unknown>();
function pickNoRepeat<T>(arr: T[], key: string): T {
  if (arr.length <= 1) return arr[0];
  const last = lastPicks.get(key);
  let choice: T;
  let attempts = 0;
  do {
    choice = arr[Math.floor(Math.random() * arr.length)];
    attempts++;
  } while (choice === last && attempts < 10);
  lastPicks.set(key, choice);
  return choice;
}

const OUCH_LINES = [
  "A donation! The spirits rejoice!",
  "Bless you.",
  "Oh! Right in the creative process.",
  "You clicked me. I felt that.",
  "The candles stay lit!",
  "Cha-ching, baby.",
  "Lucky me. Literally.",
  "Oh gosh, thank you.",
  "The servers live another day.",
  "Lucky you. Lucky me. Lucky us.",
  "You're too kind. Keep going.",
  "The universe logged this.",
  "Oh! My motivation!",
  "Right in the creative spirit.",
  "Tee hee. You're generous.",
  "Shucks. Really?",
  "This pays for my iced coffee. Bless.",
  "The voodoo must flow.",
  "One click closer to world domination.",
  "I felt that in my soul.",
];

const ZONE_LINES: Record<string, string[]> = {
  head: ["Thank you!"],
  shoulders: ["Thank you!"],
  torso: ["Thank you!"],
  hands: ["Thank you!"],
  feet: ["Thank you!"],
};

const ESC_LINES: Record<string, string[]> = {
  mild: [
    "Hi! I made all of this. Please don't tell anyone how long it took.",
    "Just a person with too many feelings and barely enough code.",
    "Yes I'm real. No I don't have my life together. Yes the dolls still work.",
    "Working on something new. Fuelled entirely by iced coffee and encouragement.",
    "I made voodoo dolls of everyone you know. It's fine. I'm fine.",
  ],
  moderate: [
    "Every click genuinely makes my day. I wish I were joking.",
    "You're keeping the candles lit. And the servers. And my will to create.",
    "I started this as a joke and now it's a whole thing. Classic me.",
    "If you've donated: I love you specifically. The universe has your name.",
    "This is what happens when a designer has feelings and too much free time.",
  ],
  intense: [
    "Okay I'm actually tearing up a little. Don't tell anyone.",
    "You believed in a website about voodoo dolls. You're the real magic.",
    "I made this at 2am wondering if anyone would care. Apparently you do. Hi.",
    "Fully, completely overwhelmed by the support. Back to making more dolls now.",
    "You funded the craft. The craft thanks you. I thank you. The spirits thank you.",
  ],
};

const MONEY_GLYPHS = ["💰", "💵", "💲", "🍀", "☘️", "🪙", "💎", "✨", "🤑", "🪴"];
const MONEY_COLORS = ["#2e7d32", "#4caf50", "#c8a030", "#e8c060", "#66bb6a", "#388e3c", "#81c784", "#a5d6a7"];

const ESCALATIONS = [
  { min: 0, pct: 2, tier: 'mild' },
  { min: 5, pct: 22, tier: 'mild' },
  { min: 12, pct: 48, tier: 'moderate' },
  { min: 25, pct: 74, tier: 'moderate' },
  { min: 40, pct: 100, tier: 'intense' },
];

function getEsc(pinCount: number) {
  let idx = 0;
  for (let i = 0; i < ESCALATIONS.length; i++) {
    if (pinCount >= ESCALATIONS[i].min) idx = i;
  }
  return ESCALATIONS[idx];
}

export default function MakerPage() {
  const [clickCount, setClickCount] = useState(0);
  const [bossText, setBossText] = useState('');
  const [bossVisible, setBossVisible] = useState(false);
  const dollAreaRef = useRef<HTMLDivElement>(null);
  const bossTimer = useRef<ReturnType<typeof setTimeout>>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();

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

  function spawnMoney(area: HTMLElement, x: number, y: number) {
    const count = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.textContent = pick(MONEY_GLYPHS);
      el.style.color = pick(MONEY_COLORS);
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

  function spawnOuch(area: HTMLElement, x: number, y: number) {
    const el = document.createElement("span");
    el.className = "ouch-pop";
    el.textContent = pickNoRepeat(OUCH_LINES, 'ouch');
    const areaRect = area.getBoundingClientRect();
    const maxLeft = areaRect.width - 120;
    const clampedX = Math.max(8, Math.min(x - 32, maxLeft));
    el.style.left = clampedX + "px";
    el.style.top = (y - 22) + "px";
    area.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dollAreaRef.current) return;
    const area = dollAreaRef.current;
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Stab animation
    const imgEl = area.querySelector('img') as HTMLElement;
    if (imgEl) {
      imgEl.style.animation = 'none';
      imgEl.offsetHeight;
      imgEl.style.animation = 'stab 0.32s ease';
    }

    spawnMoney(area, x, y);
    spawnOuch(area, x, y);

    // Zone detection
    const yPct = y / rect.height;
    let zone = 'feet';
    if (yPct < 0.22) zone = 'head';
    else if (yPct < 0.38) zone = 'shoulders';
    else if (yPct < 0.72) zone = 'torso';
    else if (yPct < 0.88) zone = 'hands';

    const esc = getEsc(newCount);
    if (newCount % 3 === 0) {
      showBoss(pickNoRepeat(ZONE_LINES[zone] || ZONE_LINES.torso, 'zone'));
    } else {
      showBoss(pickNoRepeat(ESC_LINES[esc.tier] || ESC_LINES.mild, 'esc'));
    }
  }, [clickCount]);

  return (
    <div className="min-h-screen bg-cream">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[300] h-[58px] flex items-center justify-between px-8 bg-cream/95 backdrop-blur-[18px] border-b border-foreground/[0.14]">
        <Link to="/" className="font-display font-black text-base text-ink no-underline tracking-tight">
          About the Doll Maker
        </Link>
        <Link to="/" className="font-body text-[0.7rem] font-bold tracking-[0.08em] uppercase bg-ink text-cream border-none px-4 py-2 cursor-pointer hover:bg-voodoo-red transition-colors no-underline">
          All Dolls ✦
        </Link>
      </nav>

      {/* HERO - Image + Text */}
      <section className="pt-[58px] flex flex-col items-center">
        <div className="w-full flex flex-col items-center px-8 py-12">
          {/* Interactive image area */}
          <div
            ref={dollAreaRef}
            className="relative cursor-pointer mb-8 overflow-visible"
            onClick={handleClick}
            style={{ width: 'min(72vh, 82%)', maxWidth: '500px' }}
          >
            <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-voodoo-muted mb-4 text-center pointer-events-none select-none">
              💰 Click to show some love
            </p>
            <div className="relative rounded-md overflow-hidden border-[2.5px] border-ink/20 bg-[#e8e6e2]"
              style={{
                aspectRatio: '1/1',
                boxShadow: 'inset 0 0 0 5px rgba(255,255,255,0.32), inset 0 0 0 7px rgba(26,20,16,0.07), 0 32px 80px rgba(40,24,8,0.32), 0 6px 18px rgba(40,24,8,0.14)',
              }}>
              <img src={makerImg} alt="The Doll Maker"
                className="w-full h-full object-cover object-[center_10%] select-none pointer-events-none"
                style={{ filter: 'drop-shadow(0 20px 56px rgba(60,35,10,0.42)) drop-shadow(0 4px 14px rgba(60,35,10,0.22))' }}
              />
            </div>
          </div>

          {/* Speech Bubble */}
          <div className={`w-full max-w-[500px] transition-opacity duration-400 min-h-[68px] ${bossVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-voodoo-muted mb-2">The Doll Maker says:</div>
            <div className={`inline-block bg-cream border-[1.5px] border-ink rounded-[20px] px-6 py-3.5 font-handwritten text-ink leading-relaxed max-w-[680px] relative transition-all duration-300 ${bossText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
              style={{ boxShadow: '4px 4px 0 hsl(var(--ink))' }}>
              {bossText || <span className="boss-dots">• • •</span>}
              <span className="absolute top-[-10px] left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-ink" />
              <span className="absolute top-[-7.5px] left-[calc(2rem+1.5px)] w-0 h-0 border-l-[8.5px] border-l-transparent border-r-[8.5px] border-r-transparent border-b-[8.5px] border-b-cream" />
            </div>
          </div>

          {/* Text about the maker */}
          <div className="mt-12 max-w-[560px] text-center">
            <h1 className="font-display font-black text-ink leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Meet the <em className="italic text-voodoo-gold">Doll Maker.</em>
            </h1>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              I made a website where you stab representations of people you might know with pins. Then I made one where you show yourself some love. This is character development.
            </p>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              I'm a one-person operation fuelled by iced coffee, unresolved feelings, and the deeply human need to process things through jokes. This project was born out of being laid off — a casualty of failed leadership elegantly rebranded as reorganisation. Instead of being destructive about it, I made dolls. Tiny, clickable, deeply cathartic dolls. Consider it group therapy for people who'd rather laugh than cry. Or people who want to do both at the same time. The spirits don't judge.
            </p>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              All dolls are free. All dolls will remain free. The donation button exists for people who feel called. The universe will note your generosity either way.
            </p>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              No pressure. The Inner You wouldn't want you to feel guilty about it.
            </p>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-4">
              If you'd like to support the craft: there's a button. If you'd like to just enjoy the dolls and move on with your life: also valid. Genuinely.
            </p>
            <p className="text-[0.92rem] leading-relaxed text-ink-mid font-light mb-6">
              Thanks for being here. Go give yourself a treat. Or click a heart. Same thing, really.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-none border-t border-foreground/[0.14]" />

      {/* DONATE / SUPPORT */}
      <section className="px-8 py-16 text-center">
        <div className="flex items-center justify-center gap-2.5 font-mono text-[0.58rem] tracking-[0.22em] uppercase text-voodoo-muted mb-4">
          <span className="w-8 h-px bg-voodoo-muted" />Support the Craft<span className="w-8 h-px bg-voodoo-muted" />
        </div>
        <h2 className="font-display font-black text-ink leading-tight mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
          Keep the <em className="italic text-voodoo-gold">Spirits Funded.</em>
        </h2>
        <p className="text-[0.85rem] leading-relaxed text-ink-mid font-light mb-8 max-w-[460px] mx-auto">
          If this brought you even a moment of relief — consider throwing the spirits a coin.
        </p>
        <DonationButtons variant="light" />
      </section>

      {/* FOOTER */}
      <footer className="bg-cream border-t-[1.5px] border-foreground/[0.14] px-8 py-6 flex flex-col items-center gap-1 text-center">
        <Link to="/" className="font-display font-black text-base text-ink no-underline">
          Virtual Voodoo Dolls™
        </Link>
        <div className="text-xs text-voodoo-muted leading-relaxed">No actual dolls were harmed in the making of this experience.</div>
        <div className="text-voodoo-gold text-base mt-1.5">❖</div>
      </footer>
    </div>
  );
}
