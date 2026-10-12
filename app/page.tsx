
import {
  ArrowUpRight,
  Crown,
  Swords,
  Trophy,
  Users,
  Zap,
  ShieldCheck,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Swords,
    title: "Find Your Rival",
    desc: "Discover local players, challenge opponents and bring the competition to the board.",
    tag: "LOCAL MATCHES",
  },
  {
    icon: Trophy,
    title: "Own The Rankings",
    desc: "Build your rating, track your wins and fight your way to the top of Katihar.",
    tag: "CITY LEADERBOARD",
  },
  {
    icon: CalendarDays,
    title: "Tournament Arena",
    desc: "Discover upcoming events, compete with the best and earn your place in history.",
    tag: "REAL COMPETITION",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090a0d] text-[#f4f0e7]">
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/[0.08] px-5 py-5 md:px-10">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#d7b66c]/40 bg-[#d7b66c]/10 text-2xl text-[#d7b66c]">♞</span>
          <span className="text-sm font-black tracking-[0.16em]">
            KATIHAR <span className="text-[#d7b66c]">CHECKMATE</span>
            <span className="mt-1 block text-[9px] font-medium tracking-[0.32em] text-white/40">THE CITY CHESS CLUB</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#features" className="hover:text-[#d7b66c]">Discover</a>
          <a href="#community" className="hover:text-[#d7b66c]">Community</a>
          <a href="#rankings" className="hover:text-[#d7b66c]">Rankings</a>
        </nav>
        <a href="#community" className="flex items-center gap-2 rounded-lg bg-[#d7b66c] px-4 py-3 text-xs font-bold text-black transition hover:bg-[#f0d18a]">
          Join the club <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-[#d7b66c]/[0.06] blur-[100px]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b66c]/25 bg-[#d7b66c]/[0.06] px-4 py-2 text-[10px] font-bold tracking-[0.22em] text-[#d7b66c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7b66c]" />
            BUILT FOR KATIHAR
          </div>
          <h1 className="mt-8 font-serif text-6xl font-bold leading-[0.98] tracking-[-0.055em] md:text-8xl">
            Think.
            <br />
            Play.
            <br />
            <span className="text-[#d7b66c]">Conquer.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-white/50">
            A new home for Katihar&apos;s chess community. Find your rivals,
            enter tournaments and build your legacy — one move at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#features" className="inline-flex items-center gap-3 rounded-lg bg-[#d7b66c] px-6 py-4 text-sm font-bold text-black transition hover:bg-[#f0d18a]">
              Explore the arena <ArrowUpRight size={17} />
            </a>
            <a href="#community" className="rounded-lg border border-white/15 px-6 py-4 text-sm font-semibold text-white/80 transition hover:border-[#d7b66c]/60">
              Meet the community
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
            <div><p className="text-xl font-bold">01</p><p className="mt-1 text-[10px] tracking-widest text-white/40">YOUR CITY</p></div>
            <div><p className="text-xl font-bold">∞</p><p className="mt-1 text-[10px] tracking-widest text-white/40">POSSIBILITIES</p></div>
            <div><p className="text-xl font-bold text-[#d7b66c]">♞</p><p className="mt-1 text-[10px] tracking-widest text-white/40">YOUR LEGACY</p></div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-[#d7b66c]/10 blur-[80px]" />
          <div className="relative rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] via-[#121217] to-[#0d0e12] p-5 shadow-2xl shadow-black/40 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div><p className="text-[10px] tracking-[0.25em] text-[#d7b66c]">THE ROYAL GAME</p><p className="mt-1 text-sm font-semibold">Your next move awaits.</p></div>
              <Crown className="text-[#d7b66c]" size={25} />
            </div>
            <div className="mx-auto grid aspect-square w-full max-w-[390px] grid-cols-8 overflow-hidden rounded-lg border border-[#d7b66c]/30">
              {Array.from({ length: 64 }, (_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const light = (row + col) % 2 === 0;
                const pieces: Record<number, string> = {
                  0:"♜",1:"♞",2:"♝",3:"♛",4:"♚",5:"♝",6:"♞",7:"♜",
                  8:"♟",9:"♟",10:"♟",11:"♟",12:"♟",13:"♟",14:"♟",15:"♟",
                  48:"♙",49:"♙",50:"♙",51:"♙",52:"♙",53:"♙",54:"♙",55:"♙",
                  56:"♖",57:"♘",58:"♗",59:"♕",60:"♔",61:"♗",62:"♘",63:"♖"
                };
                return (
                  <div key={i} className={`flex aspect-square items-center justify-center ${light ? "bg-[#d9c8a4]" : "bg-[#65513b]"}`}>
                    <span className={`select-none text-[clamp(16px,3.3vw,32px)] leading-none ${row < 2 ? "text-[#17151a]" : "text-[#fff8e8] drop-shadow-[0_2px_1px_#352718]"}`}>
                      {pieces[i] || ""}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/20 p-4">
              <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#d7b66c]/10 text-[#d7b66c]"><Zap size={18}/></span><div><p className="text-xs font-semibold">Your journey starts here</p><p className="mt-1 text-[10px] text-white/40">A city united by chess</p></div></div>
              <ChevronRight className="text-[#d7b66c]" size={18}/>
            </div>
          </div>
          <div className="absolute -right-3 top-1/3 hidden rounded-xl border border-[#d7b66c]/25 bg-[#15151a] p-4 shadow-xl sm:block">
            <Trophy className="mb-2 text-[#d7b66c]" size={21}/>
            <p className="text-xs font-bold">Rise to the top.</p>
            <p className="mt-1 text-[10px] text-white/40">Your city. Your game.</p>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-[10px] font-bold tracking-[0.25em] text-[#d7b66c]">THE EXPERIENCE</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Built for the ambitious.</h2></div>
          <p className="max-w-xs text-sm leading-6 text-white/40">Not just a chessboard. A place to compete, connect and grow.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({icon: Icon,title,desc,tag},i)=>(
            <article key={title} className="group rounded-2xl border border-white/[0.08] bg-[#111217] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d7b66c]/40">
              <div className="mb-10 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-[#d7b66c]/20 bg-[#d7b66c]/[0.07] text-[#d7b66c]"><Icon size={22}/></span><span className="text-xs text-white/25">0{i+1}</span></div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#d7b66c]">{tag}</p>
              <h3 className="mt-3 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/45">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="rankings" className="mx-auto max-w-7xl px-5 py-12 md:px-10">
        <div className="rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-r from-[#1a1711] to-[#111217] p-8 md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div><p className="text-[10px] font-bold tracking-[0.25em] text-[#d7b66c]">THE ROAD TO NUMBER ONE</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Katihar&apos;s throne is waiting.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-white/45">Verified player rankings will take shape as the community joins and matches are recorded.</p></div>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#d7b66c]/30 bg-[#d7b66c]/10"><Trophy size={38} className="text-[#d7b66c]"/></div>
          </div>
        </div>
      </section>

      <section id="community" className="mx-auto max-w-7xl px-5 py-20 text-center md:px-10 md:py-28">
        <Users className="mx-auto text-[#d7b66c]" size={34}/>
        <p className="mt-6 text-[10px] font-bold tracking-[0.25em] text-[#d7b66c]">YOUR CITY. YOUR COMMUNITY.</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Every legend begins with a move.</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/45">Katihar&apos;s chess community is taking shape. Come be part of the beginning.</p>
        <a href="#features" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#d7b66c] px-7 py-4 text-sm font-bold text-black transition hover:bg-[#f0d18a]">Explore the platform <ArrowUpRight size={17}/></a>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/35"><ShieldCheck size={15}/> Built around fair play and community.</div>
      </section>

      <footer className="border-t border-white/[0.08] px-5 py-8 text-center text-xs text-white/30">
        <span className="text-[#d7b66c]">♞ KATIHAR CHECKMATE</span> · THINK. PLAY. CONQUER.
      </footer>
    </main>
  );
}
