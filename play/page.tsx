
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
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

function newGame() {
  return new Chess();
}

export default function PlayPage() {
  const [game, setGame] = useState(newGame);
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [message, setMessage] = useState("");
  const [lastMove, setLastMove] = useState<[Square, Square] | null>(null);
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [finished, setFinished] = useState(false);

  const turn = game.turn() === "w" ? "White" : "Black";
  const history = game.history({ verbose: true });
  const last = history[history.length - 1];

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

  function clickSquare(square: Square) {
    if (finished || game.isGameOver()) return;

    if (selected && legalTargets.includes(square)) {
      try {
        const next = new Chess(game.fen());
        const move = next.move({ from: selected, to: square, promotion: "q" });
        if (move) {
          setGame(next);
          setLastMove([move.from as Square, move.to as Square]);
          setSelected(null);
          setLegalTargets([]);
          updateStatus(next);
          return;
        }
      } catch {
        setMessage("That move is not legal.");
      }
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelected(square);
      setLegalTargets(
        game.moves({ square, verbose: true }).map((move) => move.to as Square)
      );
    } else {
      setSelected(null);
      setLegalTargets([]);
    }
  }

  function restart() {
    setGame(newGame());
    setSelected(null);
    setLegalTargets([]);
    setLastMove(null);
    setMessage("");
    setFinished(false);
    setOrientation("white");
  }

  function resign() {
    if (finished || game.isGameOver()) return;
    setMessage(`${turn} resigned. ${turn === "White" ? "Black" : "White"} wins.`);
    setFinished(true);
    setSelected(null);
    setLegalTargets([]);
  }

  const ranks = orientation === "white"
    ? [8, 7, 6, 5, 4, 3, 2, 1]
    : [1, 2, 3, 4, 5, 6, 7, 8];

  const boardFiles = orientation === "white"
    ? files
    : [...files].reverse();

  const pieceSymbols: Record<string, string> = {
    wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
    bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
  };

  return (
    <main className="min-h-screen bg-[#f3f4ef] text-[#273229]">
      <header className="flex h-[68px] items-center justify-between border-b border-[#e0e5dc] bg-white px-4 sm:px-7">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#79966d] text-2xl text-white">♞</span>
          <span>
            <span className="block font-black">Katihar Checkmate</span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#7b8c72]">Play chess</span>
          </span>
        </Link>
        <Link href="/" className="flex items-center gap-2 rounded-xl border border-[#e0e5dc] px-3 py-2 text-sm font-semibold hover:bg-[#f5f7f2]">
          <ArrowLeft size={16} /> <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 lg:py-9">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#78906c]">
            <MapPin size={13} /> Katihar, Bihar
          </div>
          <h1 className="text-3xl font-black tracking-tight">Your game starts here.</h1>
          <p className="mt-2 text-sm text-[#7b8479]">Two sides. One board. Make your move.</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,620px)_minmax(260px,1fr)]">
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between rounded-xl border border-[#e1e5dc] bg-white p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9ece5] text-xl">♟</div>
                <div>
                  <p className="text-sm font-bold">Black</p>
                  <p className="text-xs text-[#899186]">Opponent · local practice</p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f1f3ed] px-3 py-2 text-sm font-bold">
                {orientation === "white" ? "Your opponent" : "You"}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border-4 border-[#d9ddcf] shadow-sm">
              <div className="grid grid-cols-8">
                {ranks.flatMap((rank) =>
                  boardFiles.map((file) => {
                    const square = `${file}${rank}` as Square;
                    const piece = game.get(square);
                    const fileIndex = files.indexOf(file);
                    const isLight = (fileIndex + rank) % 2 === 0;
                    const isSelected = selected === square;
                    const isTarget = legalTargets.includes(square);
                    const isLast = lastMove?.includes(square) ?? false;
                    const isCheck = piece?.type === "k" && piece.color === game.turn() && game.isCheck();

                    return (
                      <button
                        key={square}
                        type="button"
                        onClick={() => clickSquare(square)}
                        aria-label={`${square}${piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : ""}`}
                        className={`relative flex aspect-square min-w-0 items-center justify-center text-[clamp(25px,6.2vw,54px)] leading-none transition-colors sm:text-[clamp(32px,5.5vw,55px)] ${
                          isLight ? "bg-[#edf0e3]" : "bg-[#829c76]"
                        } ${isLast ? "after:absolute after:inset-0 after:bg-[#d8df71]/30" : ""} ${
                          isSelected ? "ring-inset ring-4 ring-[#d9e77b]" : ""
                        } ${isCheck ? "!bg-[#d96b61]" : ""}`}
                      >
                        {rank === (orientation === "white" ? 1 : 8) && (
                          <span className={`absolute bottom-0 left-1 text-[9px] font-bold sm:text-xs ${isLight ? "text-[#829578]" : "text-white/90"}`}>
                            {file}
                          </span>
                        )}
                        {file === (orientation === "white" ? "a" : "h") && (
                          <span className={`absolute left-1 top-0 text-[9px] font-bold sm:text-xs ${isLight ? "text-[#829578]" : "text-white/90"}`}>
                            {rank}
                          </span>
                        )}
                        {piece && (
                          <span className={`relative z-[1] select-none ${
                            piece.color === "w"
                              ? "text-[#fffdf5] drop-shadow-[0_2px_1px_rgba(35,45,35,0.8)]"
                              : "text-[#27342b] drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]"
                          }`}>
                            {pieceSymbols[`${piece.color}${piece.type}`]}
                          </span>
                        )}
                        {isTarget && !piece && (
                          <span className="absolute h-[25%] w-[25%] rounded-full bg-[#344b3d]/35" />
                        )}
                        {isTarget && piece && (
                          <span className="absolute inset-1 rounded-full border-[3px] border-[#344b3d]/45 sm:inset-1.5" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-[#727c70]">
                <span className={`h-2.5 w-2.5 rounded-full ${finished ? "bg-[#c77c65]" : "bg-[#82a46f]"}`} />
                {finished ? "Game finished" : `${turn} to move`}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setOrientation(orientation === "white" ? "black" : "white")} className="rounded-lg border border-[#dfe4da] bg-white px-3 py-2 text-xs font-bold hover:bg-[#f2f5ee]">
                  Flip board
                </button>
                <button onClick={restart} className="flex items-center gap-2 rounded-lg bg-[#35483a] px-3 py-2 text-xs font-bold text-white hover:bg-[#293a2e]">
                  <RotateCcw size={14} /> New game
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[#e1e5dc] bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <Crown size={19} className="text-[#779268]" />
                <h2 className="font-black">Game status</h2>
              </div>
              <div className="rounded-xl bg-[#f2f5ee] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7e8d76]">Current turn</p>
                <p className="mt-1 text-xl font-black">{finished ? "Game over" : turn}</p>
                <p className="mt-2 text-sm leading-6 text-[#788274]">
                  {message || (game.isCheck() ? "Check! Protect your king." : "Select one of your pieces, then select a highlighted square.")}
                </p>
              </div>

              {finished ? (
                <button onClick={restart} className="mt-4 w-full rounded-xl bg-[#35483a] px-4 py-3 font-bold text-white hover:bg-[#293a2e]">
                  Play again
                </button>
              ) : (
                <button onClick={resign} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e4e4dc] px-4 py-3 text-sm font-bold text-[#9a5b4d] hover:bg-[#fbf2ef]">
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
                  <div className="text-3xl">♟</div>
                  <p className="mt-2 text-sm font-semibold">The board is yours.</p>
                  <p className="mt-1 text-xs text-[#899186]">Make the first move to begin.</p>
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
                Local players first, then nearby cities and wider opponents when online matchmaking is connected.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6e8067]">
                <Clock3 size={14} /> Online multiplayer coming next
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8c9488]">
          <MapPin size={13} /> Katihar Checkmate · Built for the local chess community
        </div>
      </div>
    </main>
  );
}
