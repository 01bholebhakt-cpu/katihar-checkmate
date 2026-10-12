
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CalendarDays, MapPin, Trophy, Users } from "lucide-react";

type Tournament = {
  id: string;
  title: string;
  description: string | null;
  venue: string;
  starts_at: string;
  format: string;
  status: string;
  max_players: number;
};

export default function TournamentsPage() {
  const [events, setEvents] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      setUserId(auth.user?.id ?? "");

      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("starts_at", { ascending: true });

      if (error) setMessage("Tournaments load nahi hue. Database settings check karo.");
      else setEvents((data ?? []) as Tournament[]);

      setLoading(false);
    }

    void load();
  }, []);

  async function register(tournamentId: string) {
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    setBusyId(tournamentId);
    setMessage("");

    const { error } = await supabase
      .from("tournament_registrations")
      .insert({ tournament_id: tournamentId, player_id: userId });

    if (error?.code === "23505") {
      setMessage("Tum is tournament mein pehle se registered ho.");
    } else if (error) {
      setMessage("Registration nahi hua: " + error.message);
    } else {
      setMessage("Registration successful! ♟️");
    }

    setBusyId("");
  }

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-8 text-[#f4f0e7] md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50">
          <ArrowLeft size={16} /> Home
        </Link>

        <header className="mt-8 rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] to-[#111217] p-8">
          <Trophy className="text-[#d7b66c]" size={30} />
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">Tournament Arena.</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Find your next opponent. Represent Katihar.
          </p>
        </header>

        {message && (
          <p className="mt-5 rounded-xl border border-[#d7b66c]/20 bg-[#17150f] p-4 text-sm text-[#e5c981]">
            {message}
          </p>
        )}

        <h2 className="mt-8 text-xl font-bold">Upcoming tournaments</h2>

        {loading ? (
          <p className="py-10 text-white/50">Loading...</p>
        ) : events.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#121318] p-8">
            <p className="text-lg font-semibold">No tournaments yet.</p>
            <p className="mt-2 text-sm text-white/50">
              Events will appear here once they are published.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <article key={event.id} className="rounded-2xl border border-white/10 bg-[#121318] p-6">
                <span className="text-xs uppercase tracking-widest text-[#d7b66c]">
                  {event.status}
                </span>
                <h3 className="mt-3 text-xl font-bold">{event.title}</h3>
                {event.description && (
                  <p className="mt-2 text-sm text-white/50">{event.description}</p>
                )}
                <div className="mt-5 space-y-3 text-sm text-white/60">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />{" "}
                    {new Date(event.starts_at).toLocaleString("en-IN")}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> {event.venue}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} /> Up to {event.max_players} players · {event.format}
                  </p>
                </div>
                <button
                  onClick={() => register(event.id)}
                  disabled={busyId === event.id || event.status !== "upcoming"}
                  className="mt-6 w-full rounded-xl bg-[#d7b66c] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#e8cc8a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busyId === event.id
                    ? "Registering..."
                    : userId
                    ? "Register for Tournament"
                    : "Login to Register"}
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
