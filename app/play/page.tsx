
"use client";

import { useState } from "react";
import Link from "next/link";
import { Chess, type Square } from "chess.js";
import {
  ArrowLeft,
  RotateCcw,
  Flag,
  Crown,
  Clock3,
  Users,
  ChevronRight,
  MapPin,
} from "lucide-react";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PIECES: Record<string, string> = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
};

function createGame() {
  return new Chess();
}

export default function PlayPage() {
  const [game, setGame] = useState(createGame);
  const [selected, setSelected] = useState<Square | null>(null);
  const [targets, setTargets] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<[Square, Square] | null>(null);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const history = game.history({ verbose: true });
  const turn = game.turn() === "w" ? "White" : "Black";

  function updateStatus(next: Chess) {
    if (next.isCheckmate()) {
      setMessage(`${next.turn() === "w" ? "Black" : "White"} wins by checkmate!`);
      setFinished(true);
    } else if (next.isDraw()) {
      setMessage("Game drawn!");
      setFinished(true);
    } else if (next.isCheck()) {
      setMessage(`${next.turn() === "w" ? "White" : "Black"} is in check!`);
    } else {
      setMessage("");
    }
  }

  function handleSquareClick(square: Square) {
    if (finished || game.isGameOver()) return;

    if (selected && targets.includes(square)) {
      try {
        const next = new Chess(game.fen());
        const move = next.move({
          from: selected,
          to: square,
          promotion: "q",
        });

        if (move) {
          setGame(next);
          setLastMove([move.from as Square, move.to as Square]);
          setSelected(null);
          setTargets([]);
          updateStatus(next);
          return;
        }
      } catch {
        // Invalid moves are ignored.
      }
    }

    const piece = game.get(square);

    if (piece && piece.color === game.turn()) {
      setSelected(square);
      setTargets(
        game.moves({ square, verbose: true }).map((move) => move.to as Square)
      );
    } else {
      setSelected(null);
      setTargets([]);
    }
  }

  function restartGame() {
    setGame(createGame());
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setMessage("");
    setFinished(false);
    setOrientation("white");
  }

  function resignGame() {
    if (finished || game.isGameOver()) return;
    setMessage(`${turn} resigned. ${turn === "White" ? "Black" : "White"} wins.`);
    setFinished(true);
    setSelected(null);
    setTargets([]);
  }

  const ranks = orientation === "white"
    ? [8, 7, 6, 5, 4, 3, 2, 1]
    : [1, 2, 3, 4, 5, 6, 7, 8];

  const boardFiles = orientation === "white"
    ? FILES
    : [...FILES].reverse();

  return (
    <main className="min-h-screen bg-[#f3f4ef] text-[#273229]">
      <header className="flex h-[68px] items-center justify-between border-b border-[#e0e5dc] bg-white px-4 sm:px-7">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#78966d] text-3xl text-white">
            ♞
          </span>
          <span>
            <span className="block font-black">Katihar Checkmate</span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#7b8c72]">
              Play chess
            </span>
          </span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-[#e0e5dc] px-3 py-2 text-sm font-semibold hover:bg-[#f5f7f2]"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 lg:py-9">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#78906c]">
            <MapPin size={14} /> KATIHAR, BIHAR
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Your next move.
          </h1>
          <p className="mt-2 text-sm text-[#7b8479] sm:text-base">
            Two sides. One board. Make your move.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,620px)_minmax(260px,1fr)]">
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between rounded-xl border border-[#e1e5dc] bg-white p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9ece5] text-3xl">
                  ♟
                </div>
                <div>
                  <p className="text-sm font-bold">Black</p>
                  <p className="text-xs text-[#899186]">Opponent · practice</p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f1f3ed] px-3 py-2 text-sm font-bold">
                {orientation === "white" ? "Opponent" : "You"}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border-[5px] border-[#d4d9cc] bg-[#829b78] shadow-md">
              <div className="grid grid-cols-8">
                {ranks.flatMap((rank) =>
                  boardFiles.map((file) => {
                    const square = `${file}${rank}` as Square;
                    const piece = game.get(square);
                    const isLight = (FILES.indexOf(file) + rank) % 2 === 0;
                    const isSelected = selected === square;
                    const isTarget = targets.includes(square);
                    const isLast = lastMove?.includes(square) ?? false;
                    const isCheck =
                      piece?.type === "k" &&
                      piece.color === game.turn() &&
                      game.isCheck();

                    return (
                      <button
                        key={square}
                        type="button"
                        onClick={() => handleSquareClick(square)}
                        aria-label={`${square}${piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : ""}`}
                        className={`relative flex aspect-square min-w-0 items-center justify-center overflow-hidden transition-colors ${
                          isLight ? "bg-[#edf0e4]" : "bg-[#829b78]"
                        } ${
                          isLast ? "after:absolute after:inset-0 after:bg-[#e5eb74]/45" : ""
                        } ${
                          isSelected ? "!bg-[#d6e46e] ring-inset ring-4 ring-[#f6f5bb]" : ""
                        } ${
                          isCheck ? "!bg-[#d96b61]" : ""
                        }`}
                      >
                        {rank === (orientation === "white" ? 1 : 8) && (
                          <span className={`absolute bottom-0.5 left-1 z-10 text-[10px] font-black sm:text-xs ${
                            isLight ? "text-[#73866b]" : "text-white"
                          }`}>
                            {file}
                          </span>
                        )}

                        {file === (orientation === "white" ? "a" : "h") && (
                          <span className={`absolute left-1 top-0.5 z-10 text-[10px] font-black sm:text-xs ${
                            isLight ? "text-[#73866b]" : "text-white"
                          }`}>
                            {rank}
                          </span>
                        )}

                        {piece && (
                          <span
                            className={`relative z-[2] select-none font-normal leading-none ${
                              piece.color === "w"
                                ? "text-[clamp(38px,7vw,64px)] text-[#fffef8] drop-shadow-[0_2px_2px_rgba(25,35,25,0.95)] sm:text-[clamp(48px,6vw,68px)]"
                                : "text-[clamp(38px,7vw,64px)] text-[#25342a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] sm:text-[clamp(48px,6vw,68px)]"
                            }`}
                          >
                            {PIECES[`${piece.color}${piece.type}`]}
                          </span>
                        )}

                        {isTarget && !piece && (
                          <span className="pointer-events-none absolute z-[1] h-[28%] w-[28%] rounded-full bg-[#344b3d]/45" />
                        )}

                        {isTarget && piece && (
                          <span className="pointer-events-none absolute inset-[5%] z-[1] rounded-full border-[4px] border-[#344b3d]/55 sm:border-[5px]" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-[#727c70]">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  finished ? "bg-[#c77c65]" : "bg-[#82a46f]"
                }`} />
                {finished ? "Game finished" : `${turn} to move`}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setOrientation(orientation === "white" ? "black" : "white")}
                  className="rounded-lg border border-[#dfe4da] bg-white px-3 py-2 text-xs font-bold hover:bg-[#f2f5ee]"
                >
                  Flip board
                </button>
                <button
                  onClick={restartGame}
                  className="flex items-center gap-2 rounded-lg bg-[#35483a] px-3 py-2 text-xs font-bold text-white hover:bg-[#293a2e]"
                >
                  <RotateCcw size={14} /> New game
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[#e1e5dc] bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <Crown size={20} className="text-[#779268]" />
                <h2 className="font-black">Game status</h2>
              </div>

              <div className="rounded-xl bg-[#f2f5ee] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7e8d76]">
                  Current turn
                </p>
                <p className="mt-1 text-xl font-black">
                  {finished ? "Game over" : turn}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#788274]">
                  {message || "Select a piece, then tap a highlighted square to move it."}
                </p>
              </div>

              {finished ? (
                <button
                  onClick={restartGame}
                  className="mt-4 w-full rounded-xl bg-[#35483a] px-4 py-3 font-bold text-white hover:bg-[#293a2e]"
                >
                  Play again
                </button>
              ) : (
                <button
                  onClick={resignGame}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e4e4dc] px-4 py-3 text-sm font-bold text-[#9a5b4d] hover:bg-[#fbf2ef]"
                >
                  <Flag size={16} /> Resign game
                </button>
              )}
            </section>

            <section className="rounded-2xl border border-[#e1e5dc] bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-black">Move history</h2>
                <span className="text-xs text-[#899186]">{history.length} half-moves</span>
              </div>

              {history.length === 0 ? (
                <div className="rounded-xl bg-[#f6f7f3] px-4 py-8 text-center">
                  <div className="text-4xl">♟</div>
                  <p className="mt-2 text-sm font-semibold">The board is ready.</p>
                  <p className="mt-1 text-xs text-[#899186]">Make the first move.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {Array.from({ length: Math.ceil(history.length / 2) }, (_, i) => (
                    <div key={i} className="contents">
                      <span className="rounded-lg bg-[#f3f5f0] px-3 py-2 text-[#899186]">
                        {i + 1}. <strong className="ml-1 text-[#34483a]">{history[i * 2]?.san}</strong>
                      </span>
                      <span className="rounded-lg bg-[#f3f5f0] px-3 py-2 text-[#34483a]">
                        {history[i * 2 + 1]?.san || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-[#dfe5d8] bg-[#eaf0e5] p-5">
              <div className="flex items-center gap-2 font-bold text-[#40583b]">
                <Users size={18} /> Katihar matchmaking
              </div>
              <p className="mt-2 text-sm leading-6 text-[#687765]">
                Local players first, followed by nearby and wider opponents when online play is connected.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6e8067]">
                <Clock3 size={14} /> Online multiplayer is next
              </div>
            </section>
          </aside>
        </div>

        <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8c9488]">
          <MapPin size={13} /> Katihar Checkmate · Made for local chess players
        </footer>
      </div>
    </main>
  );
}
