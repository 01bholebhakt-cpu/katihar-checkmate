
import Link from "next/link";
import {
  Swords,
  Trophy,
  Puzzle,
  Users,
  Clock3,
  ChevronRight,
  Settings2,
  Search,
  Bell,
  Crown,
  Target,
  Flame,
  MapPin,
  CircleHelp,
  UserRound,
  Zap,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const board = [
  "♜","♞","♝","♛","♚","♝","♞","♜",
  "♟","♟","♟","♟","♟","♟","♟","♟",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "♙","♙","♙","♙","♙","♙","♙","♙",
  "♖","♘","♗","♕","♔","♗","♘","♖",
];

const modes = [
  { name: "Bullet", time: "1 + 0", icon: Zap, color: "bg-orange-50 text-orange-700" },
  { name: "Blitz", time: "3 + 2", icon: Flame, color: "bg-amber-50 text-amber-700" },
  { name: "Rapid", time: "10 + 0", icon: Clock3, color: "bg-emerald-50 text-emerald-800" },
  { name: "Daily", time: "1 day", icon: Target, color: "bg-sky-50 text-sky-700" },
];

const menu = [
  { label: "Play", href: "/play", icon: Swords },
  { label: "Puzzles", href: "/puzzles", icon: Puzzle },
  { label: "Tournaments", href: "/tournaments", icon: Trophy },
  { label: "Leaderboard", href: "/leaderboard", icon: Crown },
  { label: "Players", href: "/leaderboard", icon: Users },
  { label: "My Profile", href: "/profile", icon: UserRound },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f6f2] text-[#262e29]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[230px] shrink-0 border-r border-[#e3e6df] bg-white px-4 py-5 lg:flex lg:flex-col">
          <Link href="/" className="mb-9 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#76966b] text-2xl text-white">
              ♞
            </div>
            <div>
              <div className="text-[17px] font-black tracking-tight">Katihar</div>
              <div className="-mt-1 text-sm font-semibold text-[#6e8b64]">CHECKMATE</div>
            </div>
          </Link>

          <Link href="/play" className="mb-7 flex items-center justify-center gap-2 rounded-xl bg-[#81a86f] px-4 py-3.5 font-bold text-white shadow-sm transition hover:bg-[#6c955c]">
            <Swords size={19} /> Play chess
          </Link>

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#98a096]">
            Explore
          </p>

          <nav className="space-y-1">
            {menu.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-[#f0f3ed] ${
                    i === 0 ? "bg-[#edf3e9] text-[#4f7546]" : "text-[#59635a]"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.label}
                  {item.label === "Tournaments" && (
                    <span className="ml-auto rounded-md bg-[#e8eee2] px-1.5 py-0.5 text-[10px] text-[#59754f]">Local</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-[#e4e8df] bg-[#f7f8f4] p-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <MapPin size={16} className="text-[#78966c]" /> Katihar, Bihar
            </div>
            <p className="mt-2 text-xs leading-5 text-[#7a8378]">
              Your city. Your rivals. Your next move.
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5e9e0]">
              <div className="h-full w-2/3 rounded-full bg-[#9ab58a]" />
            </div>
            <p className="mt-2 text-[10px] text-[#929a90]">A home for local chess players</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#e4e7e0] bg-[#f9faf7]/95 px-4 backdrop-blur-md sm:px-7">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="text-2xl text-[#6c8c60]">♞</span>
              <span className="font-black">Katihar Checkmate</span>
            </Link>

            <div className="hidden items-center gap-2 rounded-xl border border-[#e4e7e0] bg-white px-3 py-2.5 text-sm text-[#8a9288] md:flex md:w-[290px]">
              <Search size={17} />
              <span>Find players and tournaments</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/leaderboard" aria-label="Leaderboard" className="hidden rounded-xl p-2.5 text-[#6e786d] hover:bg-[#edf0e9] sm:block">
                <Trophy size={19} />
              </Link>
              <Link href="/login" aria-label="Notifications and account" className="rounded-xl p-2.5 text-[#6e786d] hover:bg-[#edf0e9]">
                <Bell size={19} />
              </Link>
              <Link href="/login" className="rounded-xl bg-[#35483a] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#28382c]">
                Sign in
              </Link>
            </div>
          </header>

          <nav className="flex gap-5 overflow-x-auto border-b border-[#e4e7e0] bg-white px-4 py-3 lg:hidden">
            {menu.map((item) => (
              <Link key={item.label} href={item.href} className="shrink-0 text-sm font-semibold text-[#667064]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mx-auto max-w-[1450px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#78916e]">
                  <MapPin size={13} /> KATIHAR CHESS COMMUNITY
                </div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Your next move.
                </h1>
                <p className="mt-2 text-sm text-[#7b8479] sm:text-base">
                  Find a game. Sharpen your skills. Represent Katihar.
                </p>
              </div>
              <Link href="/profile" className="hidden items-center gap-2 rounded-xl border border-[#e0e5dc] bg-white px-4 py-3 text-sm font-semibold text-[#596858] hover:bg-[#f2f4ef] sm:flex">
                My profile <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0 space-y-7">
                <section className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex flex-col justify-between rounded-2xl bg-[#35483a] p-6 text-white sm:p-7">
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <Swords size={25} />
                      </div>
                      <p className="text-sm font-semibold text-[#c4d4bc]">READY WHEN YOU ARE</p>
                      <h2 className="mt-2 text-3xl font-black tracking-tight">Play chess.</h2>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-[#d3ddd0]">
                        Choose your pace and challenge yourself to the next level.
                      </p>
                    </div>
                    <Link href="/play" className="mt-8 flex items-center justify-between rounded-xl bg-[#a8c795] px-4 py-3.5 font-bold text-[#26372b] transition hover:bg-[#bbd5a9]">
                      Find a game <ArrowRightIcon />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-[#e2e6dd] bg-white p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h2 className="font-black">Choose your time</h2>
                        <p className="mt-1 text-xs text-[#8a9287]">Pick the pace you enjoy</p>
                      </div>
                      <Clock3 size={20} className="text-[#83917d]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {modes.map((mode) => {
                        const Icon = mode.icon;
                        return (
                          <Link key={mode.name} href="/play" className="group rounded-xl border border-[#e8ebe4] p-4 transition hover:border-[#a9bea0] hover:bg-[#f8faf6]">
                            <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${mode.color}`}>
                              <Icon size={18} />
                            </div>
                            <div className="font-bold">{mode.name}</div>
                            <div className="mt-1 text-xs text-[#899187]">{mode.time}</div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e2e6dd] bg-white p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black">The chessboard</h2>
                      <p className="mt-1 text-sm text-[#8a9287]">A little preview before your next match</p>
                    </div>
                    <span className="rounded-lg bg-[#f0f3ec] px-3 py-1.5 text-xs font-bold text-[#64775c]">Practice starts here</span>
                  </div>

                  <div className="mx-auto grid w-full max-w-[470px] grid-cols-8 overflow-hidden rounded-lg border border-[#d4d9ce] shadow-sm">
                    {board.map((piece, i) => {
                      const light = (Math.floor(i / 8) + (i % 8)) % 2 === 0;
                      const whitePiece = i >= 48;
                      return (
                        <div key={i} className={`flex aspect-square items-center justify-center text-[clamp(20px,4vw,39px)] leading-none ${light ? "bg-[#e9eadf]" : "bg-[#829b78]"}`}>
                          {piece && (
                            <span className={whitePiece ? "text-[#fffdf3] drop-shadow-[0_1px_1px_rgba(40,50,40,0.65)]" : "text-[#29392e] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"}>
                              {piece}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-center text-xs text-[#969d92]">Board preview only · Start a game from Play chess</p>
                </section>

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black">Explore Katihar Checkmate</h2>
                      <p className="mt-1 text-sm text-[#858d82]">Everything you need in one place.</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FeatureCard href="/tournaments" icon={<Trophy size={21} />} title="Tournaments" text="Find events and register to compete." />
                    <FeatureCard href="/leaderboard" icon={<Crown size={21} />} title="Leaderboard" text="Discover the city's leading players." />
                    <FeatureCard href="/profile" icon={<UserRound size={21} />} title="Your profile" text="Build your chess identity." />
                  </div>
                </section>
              </div>

              <aside className="space-y-5">
                <section className="rounded-2xl border border-[#e2e6dd] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-black">Katihar leaderboard</h2>
                    <Trophy size={19} className="text-[#8a9c78]" />
                  </div>
                  <p className="mt-1 text-xs text-[#8a9287]">Local player rankings</p>
                  <div className="my-5 rounded-xl bg-[#f5f7f2] p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e4ebde] text-[#637b57]">
                      <Users size={20} />
                    </div>
                    <p className="mt-3 text-sm font-bold">Your city. Your competition.</p>
                    <p className="mt-1 text-xs leading-5 text-[#899187]">
                      Sign in and create your profile to join the community.
                    </p>
                  </div>
                  <Link href="/leaderboard" className="flex items-center justify-between rounded-xl border border-[#e4e8e0] px-4 py-3 text-sm font-bold text-[#50664a] hover:bg-[#f6f8f3]">
                    View leaderboard <ChevronRight size={17} />
                  </Link>
                </section>

                <section className="rounded-2xl border border-[#e2e6dd] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-black">Local tournaments</h2>
                      <p className="mt-1 text-xs text-[#8a9287]">Compete closer to home</p>
                    </div>
                    <CalendarIcon />
                  </div>
                  <div className="mt-5 rounded-xl border border-[#e6e9e2] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#71886a]">
                      <MapPin size={14} /> KATIHAR, BIHAR
                    </div>
                    <p className="font-bold">Find your next tournament</p>
                    <p className="mt-2 text-sm leading-6 text-[#838b80]">
                      Check event details, available places and registration status.
                    </p>
                    <Link href="/tournaments" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#56734d]">
                      Browse events <ChevronRight size={16} />
                    </Link>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e2e6dd] bg-[#edf1e8] p-5">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldCheck size={18} className="text-[#5f7b54]" /> Built for Katihar
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#687563]">
                    A dedicated place for local players to connect, compete and grow.
                  </p>
                  <Link href="/login" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#405a39]">
                    Join the community <ChevronRight size={16} />
                  </Link>
                </section>
              </aside>
            </div>

            <footer className="mt-12 flex flex-col gap-3 border-t border-[#e1e5dc] pt-6 text-xs text-[#899187] sm:flex-row sm:items-center sm:justify-between">
              <span>© Katihar Checkmate · Made for Katihar, Bihar</span>
              <Link href="/login" className="flex items-center gap-2 hover:text-[#50664a]">
                Need help getting started? <CircleHelp size={15} />
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="group rounded-2xl border border-[#e2e6dd] bg-white p-5 transition hover:-translate-y-1 hover:border-[#c8d6bf] hover:shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2e8] text-[#627b58]">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#838b80]">{text}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#617a57]">
        Open <ChevronRight size={14} className="transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}

function CalendarIcon() {
  return <span className="text-xl text-[#829574]">▦</span>;
}
