
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Trophy,
  Users,
  CalendarDays,
  Coffee,
  Crown,
  ChevronRight,
  Swords,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "My Profile", href: "/profile" },
];

const pieces: Record<number, string> = {
  0: "♜", 1: "♞", 2: "♝", 3: "♛", 4: "♚", 5: "♝", 6: "♞", 7: "♜",
  8: "♟", 9: "♟", 10: "♟", 11: "♟", 12: "♟", 13: "♟", 14: "♟", 15: "♟",
  48: "♙", 49: "♙", 50: "♙", 51: "♙", 52: "♙", 53: "♙", 54: "♙", 55: "♙",
  56: "♖", 57: "♘", 58: "♗", 59: "♕", 60: "♔", 61: "♗", 62: "♘", 63: "♖",
};

const squares = Array.from({ length: 64 }, (_, i) => i);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EC] text-[#252D27]">
      <header className="sticky top-0 z-50 border-b border-[#E5E3D9] bg-[#F5F3EC]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#344B3D] text-2xl text-[#F5F3EC]">
              ♞
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Katihar Checkmate</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#788275]">
                Apna sheher. Apna game.
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#5D665D] transition hover:text-[#344B3D]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#344B3D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#26392D]"
          >
            Join the club <ArrowRight size={16} />
          </Link>
        </div>
        <nav className="flex gap-5 overflow-x-auto border-t border-[#E5E3D9] px-5 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-sm font-medium text-[#5D665D]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D8DFD3] bg-[#E9EDE5] px-4 py-2 text-xs font-bold tracking-wide text-[#405844]">
            <MapPin size={14} /> KATIHAR, BIHAR
            <span className="h-1 w-1 rounded-full bg-[#879A7E]" />
            MADE FOR LOCAL PLAYERS
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Chai ki chuski.
            <br />
            <span className="text-[#6F876B]">Chess ki baazi.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#697168] sm:text-lg">
            Gali ke dost hon ya sheher ke champions — Katihar mein har chaal
            ki apni kahani hai. Apne players se milo, tournaments khelo aur
            apna naam leaderboard par lao.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/tournaments"
              className="inline-flex items-center gap-2 rounded-xl bg-[#344B3D] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#26392D]"
            >
              Find your next game <ArrowRight size={18} />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-xl border border-[#DADDD3] bg-white px-6 py-4 font-bold text-[#344B3D] transition hover:bg-[#EDEFE8]"
            >
              <Trophy size={17} /> City rankings
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-[#777F75]">
            <div className="flex -space-x-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5F3EC] bg-[#E5D0B6]">♟</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5F3EC] bg-[#D5DFCD]">♞</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5F3EC] bg-[#E6C9B5]">♜</span>
            </div>
            <span>A local community, one move at a time.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="absolute -right-3 -top-4 h-28 w-28 rounded-full bg-[#E3D8C4] opacity-60 blur-2xl" />
          <div className="relative rounded-[2rem] border border-[#E2DED2] bg-[#EAE5D9] p-4 shadow-[0_25px_70px_-35px_rgba(45,57,44,0.3)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A8275]">The local chess scene</p>
                <p className="mt-1 text-lg font-black">Your next move starts here.</p>
              </div>
              <div className="rounded-xl bg-[#DCE4D6] p-3 text-[#405844]">
                <Crown size={22} />
              </div>
            </div>

            <div className="grid grid-cols-8 overflow-hidden rounded-xl border-4 border-[#D0C4AE]">
              {squares.map((i) => {
                const light = (Math.floor(i / 8) + i % 8) % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`flex aspect-square items-center justify-center text-[clamp(20px,4.6vw,36px)] leading-none sm:text-[38px] ${
                      light ? "bg-[#EDE5D5]" : "bg-[#879B80]"
                    }`}
                  >
                    {pieces[i] && (
                      <span
                        className={
                          i < 16
                            ? "text-[#344238] drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]"
                            : "text-[#F9F5E9] drop-shadow-[0_2px_1px_rgba(42,53,43,0.4)]"
                        }
                      >
                        {pieces[i]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#F7F5EE] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5D9C6]">
                  <Coffee size={20} className="text-[#6B5743]" />
                </div>
                <div>
                  <p className="text-sm font-bold">One chai. One game.</p>
                  <p className="text-xs text-[#7A8275]">The Katihar way.</p>
                </div>
              </div>
              <span className="text-2xl text-[#6F876B]">♟</span>
            </div>
            <p className="mt-3 text-center text-[10px] text-[#8A8D80]">
              A chessboard preview · Online play is not enabled yet
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E4E1D7] bg-[#EFEEE6]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-4 rounded-2xl bg-[#F8F7F1] p-5">
            <div className="rounded-xl bg-[#E1E8DC] p-3 text-[#49634A]"><Users size={22} /></div>
            <div>
              <p className="font-bold">Meet local players</p>
              <p className="mt-1 text-sm text-[#7A8275]">Find your chess circle.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-[#F8F7F1] p-5">
            <div className="rounded-xl bg-[#E9DFCE] p-3 text-[#866747]"><CalendarDays size={22} /></div>
            <div>
              <p className="font-bold">Play in tournaments</p>
              <p className="mt-1 text-sm text-[#7A8275]">See events and register.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-[#F8F7F1] p-5">
            <div className="rounded-xl bg-[#E1E8DC] p-3 text-[#49634A]"><Trophy size={22} /></div>
            <div>
              <p className="font-bold">Earn your place</p>
              <p className="mt-1 text-sm text-[#7A8275]">Climb the city rankings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#788B70]">Your move, Katihar</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">The game brings us together.</h2>
            <p className="mt-3 max-w-xl leading-7 text-[#72796F]">
              From a friendly match after chai to a serious tournament — start wherever you are.
            </p>
          </div>
          <Link href="/tournaments" className="inline-flex items-center gap-2 font-bold text-[#405844] hover:underline">
            Explore events <MoveUpRight size={17} />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          <Link href="/tournaments" className="group rounded-2xl border border-[#E2DFD5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6ECE1] text-[#49634A]"><Swords size={23} /></div>
            <h3 className="mt-5 text-xl font-black">Find a tournament</h3>
            <p className="mt-2 text-sm leading-6 text-[#72796F]">Discover upcoming chess events and join the competition.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#405844]">Explore tournaments <ChevronRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>

          <Link href="/leaderboard" className="group rounded-2xl border border-[#E2DFD5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEE4D5] text-[#866747]"><Trophy size={23} /></div>
            <h3 className="mt-5 text-xl font-black">Check the leaderboard</h3>
            <p className="mt-2 text-sm leading-6 text-[#72796F]">See player ratings and find out who is leading the pack.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#405844]">View rankings <ChevronRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>

          <Link href="/login" className="group rounded-2xl border border-[#E2DFD5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6ECE1] text-[#49634A]"><Sparkles size={23} /></div>
            <h3 className="mt-5 text-xl font-black">Make your mark</h3>
            <p className="mt-2 text-sm leading-6 text-[#72796F]">Create your player profile and become part of the community.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#405844]">Create your profile <ChevronRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <footer className="bg-[#29372D] text-[#F5F3EC]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-lg font-black">Katihar Checkmate <span className="text-[#B7C7AB]">♞</span></p>
            <p className="mt-1 text-sm text-[#C1C9BE]">Built for the love of chess, right here in Katihar.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-[#D6DDD2]">
            <Link href="/tournaments" className="hover:text-white">Tournaments</Link>
            <Link href="/leaderboard" className="hover:text-white">Leaderboard</Link>
            <Link href="/login" className="hover:text-white">Join the community</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
