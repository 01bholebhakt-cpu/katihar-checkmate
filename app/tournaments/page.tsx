
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Trophy,
  Users,
  CheckCircle2,
  RefreshCw,
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

type TournamentCounts = Record<string, number>;
type RegistrationIds = string[];

export default function TournamentsPage() {
  const [events, setEvents] = useState<Tournament[]>([]);
  const [counts, setCounts] = useState<TournamentCounts>({});
  const [registeredIds, setRegisteredIds] = useState<RegistrationIds>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      setMessage("Login status check nahi ho saka. Page refresh karo.");
    }

    setUserId(user?.id ?? "");

    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("starts_at", { ascending: true });

    if (error) {
      setEvents([]);
      setCounts({});
      setMessage(
        "Tournaments load nahi hue. Database settings check karo: " +
          error.message
      );
      setLoading(false);
      return;
    }

    const tournamentList = (data ?? []) as Tournament[];
    setEvents(tournamentList);

    if (tournamentList.length === 0) {
      setCounts({});
      setRegisteredIds([]);
      setLoading(false);
      return;
    }

    const countResults = await Promise.all(
      tournamentList.map(async (event) => {
        const { count, error: countError } = await supabase
          .from("tournament_registrations")
          .select("id", { count: "exact", head: true })
          .eq("tournament_id", event.id);

        return {
          id: event.id,
          count: countError ? null : count ?? 0,
        };
      })
    );

    const nextCounts: TournamentCounts = {};

    for (const result of countResults) {
      if (result.count !== null) {
        nextCounts[result.id] = result.count;
      }
    }

    setCounts(nextCounts);

    if (user) {
      const { data: registrations, error: registrationError } =
        await supabase
          .from("tournament_registrations")
          .select("tournament_id")
          .eq("player_id", user.id);

      if (!registrationError) {
        setRegisteredIds(
          (registrations ?? []).map((item) => item.tournament_id)
        );
      } else {
        setRegisteredIds([]);
      }
    } else {
      setRegisteredIds([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  async function register(tournamentId: string) {
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    if (registeredIds.includes(tournamentId)) {
      setMessage("Tum is tournament mein pehle se registered ho.");
      return;
    }

    const event = events.find((item) => item.id === tournamentId);

    if (!event || event.status !== "upcoming") {
      setMessage("Is tournament mein abhi registration available nahi hai.");
      return;
    }

    const registeredCount = counts[tournamentId] ?? 0;

    if (registeredCount >= event.max_players) {
      setMessage("Ye tournament full ho chuka hai.");
      return;
    }

    setBusyId(tournamentId);
    setMessage("");

    const { error } = await supabase
      .from("tournament_registrations")
      .insert({
        tournament_id: tournamentId,
        player_id: userId,
      });

    if (error?.code === "23505") {
      setMessage("Tum is tournament mein pehle se registered ho.");
    } else if (error) {
      setMessage("Registration nahi hua: " + error.message);
    } else {
      setRegisteredIds((previous) => [...previous, tournamentId]);
      setCounts((previous) => ({
        ...previous,
        [tournamentId]: (previous[tournamentId] ?? 0) + 1,
      }));
      setMessage("Registration successful! ♟️ Tum tournament mein join ho gaye.");
    }

    setBusyId("");
  }

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-8 text-[#f4f0e7] md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d7b66c]"
          >
            <ArrowLeft size={16} />
            Home
          </Link>

          <button
            onClick={() => void loadEvents()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-[#d7b66c]/40 hover:text-[#d7b66c] disabled:opacity-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <header className="mt-8 rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] to-[#111217] p-8 md:p-10">
          <Trophy className="text-[#d7b66c]" size={30} />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d7b66c]">
            Compete for glory
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Tournament Arena.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
            Find your next opponent. Represent Katihar. Join local chess
            tournaments and make your move.
          </p>
        </header>

        {message && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-[#d7b66c]/20 bg-[#17150f] p-4 text-sm leading-6 text-[#e5c981]"
          >
            {message}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Upcoming tournaments</h2>
          <span className="text-xs text-white/40">
            {events.length} {events.length === 1 ? "event" : "events"}
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-white/50">
            Loading tournaments...
          </div>
        ) : events.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#121318] p-8 text-center">
            <Trophy className="mx-auto text-[#d7b66c]" size={34} />
            <p className="mt-4 text-lg font-semibold">No tournaments yet.</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              New events will appear here once they are published.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {events.map((event) => {
              const count = counts[event.id];
              const isRegistered = registeredIds.includes(event.id);
              const isFull =
                count !== undefined && count >= event.max_players;
              const isUpcoming = event.status === "upcoming";

              return (
                <article
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-[#121318] p-6 transition hover:border-[#d7b66c]/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d7b66c]/20 bg-[#d7b66c]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d7b66c]">
                      {event.status}
                    </span>
                    <Trophy size={21} className="text-[#d7b66c]" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{event.title}</h3>

                  {event.description && (
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-5 space-y-3 text-sm text-white/60">
                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-[#d7b66c]"
                      />
                      {new Date(event.starts_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        className="shrink-0 text-[#d7b66c]"
                      />
                      {event.venue}
                    </p>

                    <p className="flex items-center gap-2">
                      <Users
                        size={16}
                        className="shrink-0 text-[#d7b66c]"
                      />
                      {count === undefined ? "Count unavailable" : `${count}/${event.max_players} registered`}
                      {" · "}
                      {event.format}
                    </p>
                  </div>

                  <button
                    onClick={() => void register(event.id)}
                    disabled={
                      busyId === event.id ||
                      !isUpcoming ||
                      isRegistered ||
                      isFull
                    }
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7b66c] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#e8cc8a] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busyId === event.id ? (
                      "Registering..."
                    ) : isRegistered ? (
                      <>
                        <CheckCircle2 size={17} />
                        Registered
                      </>
                    ) : isFull ? (
                      "Tournament Full"
                    ) : !isUpcoming ? (
                      "Registration Closed"
                    ) : userId ? (
                      "Register for Tournament"
                    ) : (
                      "Login to Register"
                    )}
                  </button>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-6 text-white/30">
          Katihar Checkmate · Built for the chess community of Katihar, Bihar.
        </p>
      </div>
    </main>
  );
}
