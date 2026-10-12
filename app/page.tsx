
import Link from "next/link";
import {
  Swords,
  Trophy,
  Users,
  CalendarDays,
  ChevronRight,
  Zap,
  Target,
  Globe2,
  Crown,
  ArrowUpRight,
  CircleUserRound,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const squares = [
  "♜","♞","♝","♛","♚","♝","♞","♜",
  "♟","♟","♟","♟","♟","♟","♟","♟",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "♙","♙","♙","♙","♙","♙","♙","♙",
  "♖","♘","♗","♕","♔","♗","♘","♖",
];

const menu = [
  { label: "Home", href: "/", icon: Globe2 },
  { label: "Play chess", href: "/login", icon: Swords },
  { label: "Puzzles & tactics", href: "/login", icon: Target },
  { label: "Tournaments", href: "/tournaments", icon: Trophy },
  { label: "Leaderboard", href: "/leaderboard", icon: Crown },
  { label: "Community", href: "/profile", icon: Users },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101512] text-[#f4f5f1]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-white/[0.07] bg-[#131a15] px-5 py-6 lg:flex">
          <Link href="/" className="flex items-center gap-3 px-2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#81b64c] text-3xl font-bold text-[#10200e]">
              ♞
            </span>
            <span>
              <span className="block text-sm font-black tracking-tight">
                KATIHAR
              </span>
              <span className="block text-xs font-bold tracking-[0.13em] text-[#81b64c]">
                CHECKMATE
              </span>
            </span>
          </Link>

          <Link
            href="/login"
            className="mt-9 flex items-center justify-center gap-2 rounded-xl bg-[#81b64c] px-4 py-3.5 text-sm font-extrabold text-[#14200e] transition hover:bg-[#96ca61]"
          >
            <Swords size={17} /> Play chess
          </Link>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            Explore
          </p>

          <nav className="space-y-1">
            {menu.map(({ label, href, icon: Icon }, index) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-white/[0.07] text-white"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={19} className={index === 0 ? "text-[#81b64c]" : ""} />
                {label}
                {label === "Tournaments" && (
                  <span className="ml-auto rounded-md bg-[#81b64c]/15 px-1.5 py-1 text-[9px] font-bold text-[#a6d77c]">
                    LOCAL
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-[#1b241d] p-4">
            <div className="flex items-center gap-2 text-[#a8d880]">
              <ShieldCheck size={17} />
              <span className="text-xs font-bold">Built for Katihar</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/45">
              Your city. Your opponents. Your chess community.
            </p>
            <Link
              href="/profile"
              className="mt-4 flex items-center justify-between text-xs font-bold text-white/75 hover:text-[#a8d880]"
            >
              Your player profile <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#101512]/95 px-4 py-3 backdrop-blur-xl sm:px-7 lg:px-9">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="text-2xl text-[#81b64c]">♞</span>
              <span className="text-xs font-black tracking-wide">
                KATIHAR <span className="text-[#81b64c]">CHECKMATE</span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 text-xs text-white/40 sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#81b64c]" />
              YOUR LOCAL CHESS HUB
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/[0.06] hover:text-white sm:px-4 sm:text-sm"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-[#81b64c] px-3 py-2.5 text-xs font-extrabold text-[#14200e] hover:bg-[#96ca61] sm:px-5 sm:text-sm"
              >
                Sign up free
              </Link>
            </div>
          </header>

          <div className="grid gap-7 p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(270px,350px)] lg:gap-8 lg:p-9">
            <section className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/40">
                <span className="text-[#a5d77a]">Home</span>
                <ChevronRight size={13} />
                <span>Katihar Chess Club</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#1b241d] p-6 sm:p-9">
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#81b64c]/10 blur-[80px]" />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#81b64c]/25 bg-[#81b64c]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#a5d77a]">
                    <Zap size={13} /> The game starts here
                  </span>

                  <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.07] tracking-tight sm:text-6xl">
                    Make your
                    <br />
                    <span className="text-[#91c65d]">next move.</span>
                  </h1>

                  <p className="mt-4 max-w-md text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                    Play, compete and connect with chess players from Katihar.
                    Your local chess community starts here.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#81b64c] px-5 py-3.5 text-sm font-extrabold text-[#14200e] transition hover:bg-[#a0d66c]"
                    >
                      <Swords size={17} /> Get started
                    </Link>
                    <Link
                      href="/tournaments"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-bold text-white/85 transition hover:border-white/30 hover:bg-white/[0.07]"
                    >
                      <Trophy size={17} /> Tournaments
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold sm:text-xl">
                    Jump into chess
                  </h2>
                  <p className="mt-1 text-xs text-white/40 sm:text-sm">
                    Choose your next destination.
                  </p>
                </div>
                <BookOpen size={21} className="text-[#81b64c]" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  className="group rounded-2xl border border-white/[0.08] bg-[#171e19] p-5 transition hover:border-[#81b64c]/50 hover:bg-[#1b261d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#81b64c]/15 text-[#9dd46d]">
                    <Swords size={22} />
                  </span>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <h3 className="font-extrabold">Play chess</h3>
                    <ArrowUpRight size={17} className="text-white/30 transition group-hover:text-[#a5d77a]" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Join the platform and get your player profile.
                  </p>
                </Link>

                <Link
                  href="/leaderboard"
                  className="group rounded-2xl border border-white/[0.08] bg-[#171e19] p-5 transition hover:border-[#81b64c]/50 hover:bg-[#1b261d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e6bd59]/10 text-[#e6bd59]">
                    <Trophy size={22} />
                  </span>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <h3 className="font-extrabold">Leaderboard</h3>
                    <ArrowUpRight size={17} className="text-white/30 transition group-hover:text-[#a5d77a]" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    See player ratings and climb the local rankings.
                  </p>
                </Link>

                <Link
                  href="/tournaments"
                  className="group rounded-2xl border border-white/[0.08] bg-[#171e19] p-5 transition hover:border-[#81b64c]/50 hover:bg-[#1b261d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#74c4d8]/10 text-[#74c4d8]">
                    <CalendarDays size={22} />
                  </span>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <h3 className="font-extrabold">Tournaments</h3>
                    <ArrowUpRight size={17} className="text-white/30 transition group-hover:text-[#a5d77a]" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Find upcoming chess events in your city.
                  </p>
                </Link>

                <Link
                  href="/profile"
                  className="group rounded-2xl border border-white/[0.08] bg-[#171e19] p-5 transition hover:border-[#81b64c]/50 hover:bg-[#1b261d]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#bd91ed]/10 text-[#bd91ed]">
                    <CircleUserRound size={22} />
                  </span>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <h3 className="font-extrabold">Your profile</h3>
                    <ArrowUpRight size={17} className="text-white/30 transition group-hover:text-[#a5d77a]" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Track your player stats and progress.
                  </p>
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-[#171e19] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#81b64c]/10 text-[#91c65d]">
                    <Users size={22} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-extrabold">Built for Katihar.</h2>
                    <p className="mt-2 text-sm leading-6 text-white/45">
                      A place for local players to discover events, meet
                      opponents and grow chess across the city.
                    </p>
                    <Link
                      href="/tournaments"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#a5d77a] hover:text-white"
                    >
                      Explore the community <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <aside className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#171e19]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4">
                  <div>
                    <h2 className="text-sm font-extrabold">The chessboard</h2>
                    <p className="mt-1 text-[10px] text-white/40">
                      Your next challenge awaits
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#81b64c]/10 px-2.5 py-1.5 text-[10px] font-bold text-[#a5d77a]">
                    ♟ CLASSIC
                  </span>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-8 overflow-hidden rounded-lg border border-black/30">
                    {squares.map((piece, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const light = (row + col) % 2 === 0;
                      const darkPiece = row < 2;

                      return (
                        <div
                          key={i}
                          className={`flex aspect-square items-center justify-center ${
                            light ? "bg-[#ebecd0]" : "bg-[#779556]"
                          }`}
                        >
                          <span
                            className={`select-none text-[clamp(17px,3.5vw,34px)] leading-none sm:text-[clamp(20px,2.5vw,36px)] ${
                              darkPiece
                                ? "text-[#252a25]"
                                : "text-white drop-shadow-[0_2px_1px_#34452a]"
                            }`}
                          >
                            {piece}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center justify-between px-1 text-[10px] text-white/35">
                    <span>♟ White vs Black</span>
                    <span>Classic chess</span>
                  </div>

                  <Link
                    href="/login"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#81b64c] px-4 py-3.5 text-sm font-extrabold text-[#14200e] transition hover:bg-[#a0d66c]"
                  >
                    Start your journey <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#171e19] p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6bd59]/10 text-[#e6bd59]">
                    <Crown size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold">Claim your place.</h3>
                    <p className="mt-1 text-[11px] text-white/40">
                      Every strong player starts somewhere.
                    </p>
                  </div>
                </div>
                <Link
                  href="/leaderboard"
                  className="mt-5 flex items-center justify-between rounded-lg border border-white/10 px-3 py-3 text-xs font-bold text-white/75 transition hover:border-[#81b64c]/40 hover:text-[#a5d77a]"
                >
                  View city rankings <ChevronRight size={16} />
                </Link>
              </div>

              <div className="mt-4 flex items-start gap-3 px-2 py-3 text-[11px] leading-5 text-white/35">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#81b64c]" />
                <p>
                  Made for fair play, friendly competition and the growing
                  chess community of Katihar, Bihar.
                </p>
              </div>
            </aside>
          </div>

          <footer className="border-t border-white/[0.07] px-5 py-5 text-center text-[10px] text-white/30 sm:px-8">
            KATIHAR CHECKMATE · THINK. PLAY. IMPROVE.
          </footer>
        </div>
      </div>
    </main>
  );
}
