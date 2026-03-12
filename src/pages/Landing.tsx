import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ALL_DOLLS, CATEGORY_META, type DollCategory } from '@/data/dolls';
import { getDollImage } from '@/data/dollImages';
import { motion } from 'framer-motion';

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
          <strong className="text-voodoo-gold text-lg">{count.toLocaleString()}</strong> souls served
        </motion.div>

        {/* Hero doll preview */}
        <motion.div
          className="flex gap-3 items-end justify-center flex-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {ALL_DOLLS.filter(d => d.category !== 'bonus').slice(0, 5).map((doll, i) => {
            const img = getDollImage(doll.id);
            return (
              <Link key={doll.id} to={`/doll/${doll.id}`}
                className={`rounded border-2 border-voodoo-gold/25 overflow-hidden bg-ink/80 flex items-center justify-center hover:-translate-y-2 hover:rotate-[-2deg] hover:border-voodoo-gold transition-all duration-300 ${
                  i === 2 ? 'w-[110px] h-[140px]' : i === 1 || i === 3 ? 'w-[100px] h-[125px]' : 'w-[90px] h-[110px]'
                }`}
              >
                {img ? (
                  <img src={img} alt={doll.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <span className="text-4xl">{doll.emoji}</span>
                )}
              </Link>
            );
          })}
          <div className="w-[90px] h-[110px] rounded border-2 border-dashed border-voodoo-gold/30 flex flex-col items-center justify-center text-voodoo-muted text-[0.65rem] tracking-[0.15em] uppercase gap-1">
            <span className="text-2xl text-voodoo-gold">+</span>
            More
          </div>
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

      {/* BONUS DOLL — The Inner You */}
      {(() => {
        const bonusDoll = ALL_DOLLS.find(d => d.category === 'bonus');
        if (!bonusDoll) return null;
        return (
          <section id="bonus" className="bg-mystery py-20 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(192,57,74,0.15)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <FadeUp>
                <div className="text-[0.7rem] tracking-[0.3em] uppercase text-voodoo-gold/60 mb-6 font-body">Bonus Doll</div>
              </FadeUp>
              <FadeUp>
                <Link to={`/doll/${bonusDoll.id}`} className="no-underline">
                  <div className="w-[140px] h-[180px] bg-cream/[0.06] border-2 border-voodoo-gold/30 rounded-md mx-auto mb-8 flex flex-col items-center justify-center gap-2 hover:-translate-y-2 hover:border-voodoo-gold transition-all duration-300">
                    <span className="text-6xl">{bonusDoll.emoji}</span>
                  </div>
                </Link>
              </FadeUp>
              <FadeUp>
                <h2 className="font-display font-black italic text-cream mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  The <span className="text-voodoo-red">Inner</span><br />You.
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="font-handwritten text-base text-cream/50 max-w-[440px] mx-auto mb-12 leading-loose">
                  This one is different. No pins. No curses.<br />
                  Just wishes, fortunes, and a reminder<br />
                  that you were never the problem.
                </p>
              </FadeUp>
              <FadeUp>
                <Link to={`/doll/${bonusDoll.id}`} className="bg-transparent text-cream border border-cream/40 px-8 py-3 rounded-sm text-sm tracking-[0.12em] uppercase font-medium hover:border-cream hover:-translate-y-0.5 transition-all no-underline">
                  Meet The Inner You ✦
                </Link>
              </FadeUp>
            </div>
          </section>
        );
      })()}

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
