
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("starts_at", { ascending: true })
        .limit(50);

      if (error) {
        setMessage(
          "Tournament database abhi setup nahi hua hai. Agle step mein ise connect karenge."
        );
      } else {
        setEvents((data || []) as Tournament[]);
      }

      setLoading(false);
    }

    void loadEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-8 text-[#f4f0e7] md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#d7b66c]">
          <ArrowLeft size={16} /> Home
        </Link>

        <header className="mt-10 rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] to-[#111217] p-7 md:p-10">
          <div className="flex items-center gap-3 text-[#d7b66c]">
            <Trophy size={27} />
            <span className="text-xs font-bold tracking-[0.25em]">COMPETE FOR GLORY</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-6xl">Tournament Arena.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
            Meet Katihar's chess community, compete in organised events and earn your place on the leaderboard.
          </p>
        </header>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Upcoming tournaments</h2>
          <span className="text-xs text-white/40">{events.length} events</span>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-white/50">Loading tournaments...</p>
        ) : message ? (
          <div className="mt-5 rounded-2xl border border-[#d7b66c]/20 bg-[#121318] p-6">
            <p className="text-sm leading-7 text-white/60">{message}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#121318] px-6 py-14 text-center">
            <CalendarDays className="mx-auto text-[#d7b66c]" size={35} />
            <h3 className="mt-4 text-lg font-bold">The next move is yours.</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/45">
              No tournaments have been published yet. Check back when the first local event is announced.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <article key={event.id} className="rounded-2xl border border-white/10 bg-[#121318] p-6 transition hover:border-[#d7b66c]/35">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-[#d7b66c]/20 bg-[#d7b66c]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d7b66c]">
                    {event.status}
                  </span>
                  <Trophy className="text-[#d7b66c]" size={22} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{event.title}</h3>
                {event.description && (
                  <p className="mt-2 text-sm leading-6 text-white/45">{event.description}</p>
                )}
                <div className="mt-5 space-y-3 text-sm text-white/55">
                  <p className="flex items-center gap-2"><CalendarDays size={16} className="text-[#d7b66c]"/> {new Date(event.starts_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                  <p className="flex items-center gap-2"><MapPin size={16} className="text-[#d7b66c]"/> {event.venue}</p>
                  <p className="flex items-center gap-2"><Users size={16} className="text-[#d7b66c]"/> Up to {event.max_players} players · {event.format}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
