
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Crown, MapPin, Trophy } from "lucide-react";

type Player = {
  id: string;
  username: string | null;
  full_name: string | null;
  city: string;
  rating: number;
  wins: number;
  losses: number;
  draws: number;
};

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlayers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, city, rating, wins, losses, draws")
        .order("rating", { ascending: false })
        .limit(100);

      if (error) {
        setError("Leaderboard load nahi hua. Please try again.");
      } else {
        setPlayers((data || []) as Player[]);
      }

      setLoading(false);
    }

    void loadPlayers();
  }, []);

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-8 text-[#f4f0e7] md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#d7b66c]">
          <ArrowLeft size={16} /> Home
        </Link>

        <header className="mt-10 rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] to-[#111217] p-7 md:p-10">
          <div className="flex items-center gap-3 text-[#d7b66c]">
            <Trophy size={28} />
            <span className="text-xs font-bold tracking-[0.25em]">THE CITY RANKINGS</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-6xl">Leaderboard.</h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
            Every game counts. Every victory matters. Climb the rankings and represent Katihar.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
            <MapPin size={14} /> Katihar, Bihar
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#121318] p-5 md:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <h2 className="font-bold">Top players</h2>
            <span className="text-xs text-white/40">{players.length} players</span>
          </div>

          {loading ? (
            <p className="py-12 text-center text-sm text-white/50">Loading rankings...</p>
          ) : error ? (
            <p role="alert" className="py-12 text-center text-sm text-red-300">{error}</p>
          ) : players.length === 0 ? (
            <div className="py-14 text-center">
              <Crown className="mx-auto text-[#d7b66c]" size={35} />
              <h3 className="mt-4 text-lg font-bold">The throne is open.</h3>
              <p className="mt-2 text-sm text-white/45">
                No registered players yet. Join the club and claim your place.
              </p>
              <Link href="/login" className="mt-6 inline-block rounded-lg bg-[#d7b66c] px-5 py-3 text-sm font-bold text-black">
                Join the club
              </Link>
            </div>
          ) : (
            <div>
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center gap-3 border-b border-white/[0.07] py-5 last:border-0">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold ${index < 3 ? "bg-[#d7b66c]/10 text-[#d7b66c]" : "bg-white/5 text-white/50"}`}>
                    {index === 0 ? <Crown size={19} /> : `#${index + 1}`}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{player.full_name || player.username || "Chess Player"}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {player.wins}W · {player.losses}L · {player.draws}D
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#d7b66c]">{player.rating}</p>
                    <p className="text-[10px] text-white/35">RATING</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="mt-5 text-center text-xs leading-6 text-white/30">
          Ratings currently use stored profile values. Verified match-based rating updates will be added with the match system.
        </p>
      </div>
    </main>
  );
}
