import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ALL_DOLLS, CATEGORY_META, type DollCategory } from '@/data/dolls';
import { getDollImage } from '@/data/dollImages';
import { motion } from 'framer-motion';
import mysteryDollImg from '@/assets/dolls/mystery-doll.jpeg';
import DonationButtons from '@/components/DonationButtons';

const CATEGORY_ORDER: DollCategory[] = ['corporate', 'relationship', 'family', 'friendship'];

const CATEGORY_INTROS: Partial<Record<DollCategory, { packNum: string; title: string[]; subtitle: string }>> = {
  corporate: { packNum: 'Pack 1 of 4', title: ['Corporate', 'Voodoo™'], subtitle: 'The boardroom. The synergy. The reply-all incident of 2024.' },
  relationship: { packNum: 'Pack 2 of 4', title: ['Relationship', 'Voodoo™'], subtitle: "The text at 2am. The \"it's complicated.\" The read receipts." },
  family: { packNum: 'Pack 3 of 4', title: ['Family', 'Matters™'], subtitle: 'The holidays. The group chat. The unsolicited advice.' },
  friendship: { packNum: 'Pack 4 of 4', title: ['With Friends', 'Like These™'], subtitle: 'The group chat. The brunch. The "I\'m almost there" text sent from home.' },
};

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

export default function Landing() {
  const [count, setCount] = useState(55000);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const today = new Date();
    const base = 55000 + (today.getFullYear() - 2024) * 8000 + today.getMonth() * 600 + today.getDate() * 18;
    let current = base - 420;
    const iv = setInterval(() => {
      current += Math.floor(Math.random() * 13) + 3;
      setCount(current);
      if (current >= base) { setCount(base); clearInterval(iv); }
    }, 18);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[58px] bg-ink flex items-center justify-between px-6 md:px-10 border-b-2 border-voodoo-gold">
        <Link to="/" className="font-handwritten text-cream text-lg tracking-wider">
          Virtual Voodoo <span className="text-voodoo-gold">Dolls</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {CATEGORY_ORDER.map(cat => (
            <a key={cat} href={`#${cat}`} className="font-body text-voodoo-muted text-xs tracking-[0.12em] uppercase hover:text-voodoo-gold transition-colors no-underline">
              {cat === 'friendship' ? 'Friends' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </a>
          ))}
          <a href="#bonus" className="font-body text-voodoo-muted text-xs tracking-[0.12em] uppercase hover:text-voodoo-gold transition-colors no-underline">Bonus</a>
          <Link to="/doll/micromanager" className="bg-voodoo-red text-cream px-4 py-1.5 text-xs tracking-[0.1em] uppercase font-medium rounded-sm hover:brightness-90 transition no-underline">
            Play Now ✦
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mt-[58px] min-h-[92vh] bg-ink flex flex-col items-center justify-center text-center px-8 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(200,160,48,0.08)_0%,transparent_70%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="font-body text-[0.72rem] tracking-[0.3em] uppercase text-voodoo-gold mb-6">
            The Complete Collection — {ALL_DOLLS.length} Dolls & Counting
          </div>
        </motion.div>
        <motion.h1
          className="font-display text-cream font-black leading-none mb-1"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Pin the<br /><em className="text-voodoo-gold italic">pain</em> away.
        </motion.h1>
        <motion.p
          className="font-handwritten text-voodoo-muted mb-10 max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Virtual voodoo for every toxic person in your life.
        </motion.p>
        <motion.div
          className="inline-flex items-center gap-3 bg-cream/5 border border-voodoo-gold/30 rounded-full px-7 py-2.5 text-[0.8rem] tracking-[0.15em] uppercase text-cream mb-14"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <strong className="text-voodoo-gold text-lg">{count.toLocaleString()}</strong> people helped & healed
        </motion.div>

      </section>

      {/* CATEGORY SECTIONS */}
      {CATEGORY_ORDER.map((cat, catIdx) => {
        const dolls = ALL_DOLLS.filter(d => d.category === cat);
        const meta = CATEGORY_META[cat];
        const intro = CATEGORY_INTROS[cat];
        return (
          <section key={cat} id={cat} className={catIdx % 2 === 1 ? 'bg-[#f0ebe0]' : 'bg-cream'}>
            <FadeUp className="text-center py-16 px-8">
              <div className="font-body text-[0.7rem] tracking-[0.3em] uppercase text-voodoo-muted mb-4">{intro?.packNum}</div>
              <h2 className="font-display font-bold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                {intro?.title[0]}<br />{intro?.title[1]}
              </h2>
              <p className="text-base text-ink-mid max-w-[520px] mx-auto leading-relaxed">{intro?.subtitle}</p>
            </FadeUp>

            <div className="max-w-[1400px] mx-auto px-8 pb-16">
              <FadeUp className="flex items-center gap-6 mb-10 pb-5 border-b border-foreground/10">
                <span className={`font-handwritten text-[0.7rem] tracking-[0.2em] uppercase px-3.5 py-1 rounded-sm text-cream whitespace-nowrap ${meta.tagClass}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
                <span className="font-display text-2xl font-bold">{meta.packTitle}</span>
                <span className="ml-auto text-xs tracking-[0.15em] uppercase text-voodoo-muted">
                  {dolls.length} dolls · {dolls.length} live
                </span>
              </FadeUp>

              <FadeUp>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {dolls.map(doll => {
                    const img = getDollImage(doll.id);
                    return (
                      <Link key={doll.id} to={`/doll/${doll.id}`} className="no-underline">
                        <div className="relative rounded-md overflow-hidden aspect-[3/4] bg-ink cursor-pointer hover:-translate-y-1.5 hover:rotate-[-1deg] transition-all duration-300 group">
                          {img ? (
                            <img src={img} alt={doll.name} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                              style={{ background: `linear-gradient(135deg, ${doll.accentColor}22, ${doll.accentColor}08)` }}>
                              <span className="text-5xl">{doll.emoji}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-90 flex flex-col justify-end p-4">
                            <div className="font-display text-sm font-bold text-cream leading-tight mb-1">{doll.name}</div>
                            <div className="font-body text-[0.65rem] text-cream/60 tracking-wide leading-snug">{doll.tagline}</div>
                          </div>
                          <span className="absolute top-2 right-2 bg-voodoo-gold text-ink text-[0.58rem] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm font-body">
                            Live ✦
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </FadeUp>
            </div>

            {catIdx < CATEGORY_ORDER.length - 1 && (
              <div className="h-px mx-8 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            )}
          </section>
        );
      })}

      {/* MYSTERY DOLL — The Inner You */}
      {(() => {
        const bonusDoll = ALL_DOLLS.find(d => d.category === 'bonus');
        if (!bonusDoll) return null;
        const bonusImg = getDollImage(bonusDoll.id);
        return (
          <section id="bonus" className="bg-mystery py-20 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(192,57,74,0.15)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <FadeUp>
                <div className="text-[0.7rem] tracking-[0.3em] uppercase text-voodoo-gold/60 mb-6 font-body">Bonus Doll</div>
              </FadeUp>
              <FadeUp>
                <Link to={`/doll/${bonusDoll.id}`} className="no-underline">
                  <div className="w-[140px] h-[180px] rounded-md mx-auto mb-8 overflow-hidden hover:-translate-y-2 hover:border-voodoo-gold transition-all duration-300 border-2 border-voodoo-gold/30">
                    <img src={mysteryDollImg} alt="Mystery Doll" className="w-full h-full object-cover" />
                  </div>
                </Link>
              </FadeUp>
              <FadeUp>
                <h2 className="font-display font-black italic text-cream mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  The <span className="text-voodoo-red">Mystery</span><br />Doll.
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="font-handwritten text-base text-cream/50 max-w-[440px] mx-auto mb-12 leading-loose">
                  One doll. No name. No category.<br />
                  No spoilers.
                </p>
              </FadeUp>
            </div>
          </section>
        );
      })()}

      {/* REQUEST A DOLL */}
      <section className="bg-cream py-20 px-8">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Request a Doll<br />for Your <em className="italic text-voodoo-red">Ex.</em>
          </h2>
          <p className="text-base text-ink-mid leading-relaxed mb-8">
            No doll in the collection quite captures them? Send us a description and the things they actually say. We'll build something truly personal.
          </p>
          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const desc = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
            const quotes = (form.elements.namedItem('quotes') as HTMLTextAreaElement).value;
            const body = `Name: ${name}%0AEmail: ${email}%0A%0ADescription:%0A${encodeURIComponent(desc)}%0A%0AThings they say:%0A${encodeURIComponent(quotes)}`;
            window.location.href = `mailto:virtualvoodoodolls@gmail.com?subject=${encodeURIComponent('Custom Ex Doll Request from ' + name)}&body=${body}`;
            setRequestSent(true);
          }}>
            <input name="name" type="text" placeholder="Your name" maxLength={80} required
              className="font-body text-base bg-white border-[1.5px] border-foreground/[0.14] rounded-sm px-5 py-4 text-ink outline-none focus:border-ink transition-colors" />
            <input name="email" type="email" placeholder="Your email" maxLength={120} required
              className="font-body text-base bg-white border-[1.5px] border-foreground/[0.14] rounded-sm px-5 py-4 text-ink outline-none focus:border-ink transition-colors" />
            <textarea name="description" placeholder="Describe them. Appearance, personality, red flags…" maxLength={1000} rows={4} required
              className="font-body text-base bg-white border-[1.5px] border-foreground/[0.14] rounded-sm px-5 py-4 text-ink outline-none focus:border-ink transition-colors resize-none" />
            <textarea name="quotes" placeholder="Things they say. The more specific, the better." maxLength={1000} rows={4}
              className="font-body text-base bg-white border-[1.5px] border-foreground/[0.14] rounded-sm px-5 py-4 text-ink outline-none focus:border-ink transition-colors resize-none" />
            <button type="submit"
              className="font-body text-sm font-bold tracking-[0.12em] uppercase bg-ink text-cream border-none px-8 py-4 cursor-pointer hover:bg-voodoo-red transition-colors w-full">
              {requestSent ? '✓ Request Sent' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>

      {/* SUPPORT THE CREATOR */}
      <section className="bg-ink py-20 px-8 text-center">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-voodoo-gold/40" />
            <span className="font-body text-[0.7rem] tracking-[0.3em] uppercase text-voodoo-gold">Support the Creator</span>
            <span className="w-10 h-px bg-voodoo-gold/40" />
          </div>
          <h2 className="font-display font-black text-cream leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            If this brought you joy,<br />support the <em className="italic text-voodoo-gold">revenge arc.</em>
          </h2>
          <p className="text-base text-cream/60 leading-relaxed mb-10 max-w-[520px] mx-auto">
            One person made all {ALL_DOLLS.length} of these. If the pins landed, consider fuelling the next round.
          </p>
          <DonationButtons variant="dark" />
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-cream py-16 px-8 text-center">
        <div className="max-w-[640px] mx-auto">
          <p className="font-display font-bold text-ink text-base leading-relaxed mb-4">
            No actual dolls were harmed in the making of this experience.<br />
            Any similarities to real people are purely coincidental… and deeply unfortunate for you.
          </p>
          <p className="text-sm text-ink-mid mb-6">
            ⚠️ No real voodoo was used. Only wishful thinking. Maybe. 😉
          </p>
          <p className="text-sm text-ink-mid leading-relaxed">
            Got a complaint? A suggestion? A deeply personal grievance? Want a custom corporate doll made in someone's exact likeness? <em>Oh, we can talk.</em> We hear you. We feel you. We are also underpaid.{' '}
            <a href="#" className="text-voodoo-red font-bold underline hover:text-ink transition-colors">Send a small donation — help us stick it to them!</a>{' '}
            We might fix it. Big might.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-12 px-8 text-center border-t border-voodoo-gold/20">
        <div className="font-handwritten text-xl text-cream mb-2">
          Virtual Voodoo <span className="text-voodoo-gold">Dolls</span>™
        </div>
        <div className="text-xs tracking-[0.15em] uppercase text-voodoo-muted mb-8">Stick it to them. Virtually.</div>
        <div className="flex gap-8 justify-center mb-8 flex-wrap">
          {['Corporate Pack', 'Relationships', 'Family', 'Friends', 'Bonus'].map(label => (
            <a key={label} href="#" className="text-xs text-voodoo-muted no-underline tracking-[0.1em] uppercase hover:text-voodoo-gold transition-colors">
              {label}
            </a>
          ))}
        </div>
        <div className="text-[0.7rem] text-voodoo-muted/50">
          © 2025 Virtual Voodoo Dolls · Purely fictional. No actual harm intended. Probably.
        </div>
      </footer>
    </div>
  );
}
