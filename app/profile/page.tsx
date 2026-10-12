
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Trophy, Swords, LogOut, MapPin, ShieldCheck } from "lucide-react";

type PlayerProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  city: string;
  rating: number;
  wins: number;
  losses: number;
  draws: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace("/login");
        return;
      }

      const user = authData.user;

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setError("Could not load your profile. Please try again.");
      } else if (data) {
        setProfile(data as PlayerProfile);
      } else {
        const fullName =
          user.user_metadata?.full_name || user.email?.split("@")[0] || "Player";

        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            full_name: fullName,
            username: null,
            city: "Katihar",
          })
          .select("*")
          .single();

        if (createError) {
          setError("Profile setup failed. Please refresh and try again.");
        } else {
          setProfile(newProfile as PlayerProfile);
        }
      }

      setLoading(false);
    }

    void loadProfile();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#090a0d] text-[#d7b66c]">
        Loading your profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#090a0d] px-5 text-center text-white">
        <div>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-[#d7b66c] px-5 py-3 font-bold text-black">
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  const name = profile.full_name || "Chess Player";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-8 text-[#f4f0e7] md:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="font-bold tracking-widest">
            ♞ KATIHAR <span className="text-[#d7b66c]">CHECKMATE</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-[#d7b66c]/40">
            <LogOut size={16} /> Log out
          </button>
        </header>

        <section className="mt-10 rounded-3xl border border-[#d7b66c]/20 bg-gradient-to-br from-[#211d15] to-[#111217] p-7 md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-[#d7b66c]/30 bg-[#d7b66c]/10 text-3xl font-bold text-[#d7b66c]">
              {initials}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.2em] text-[#d7b66c]">YOUR PLAYER PROFILE</p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">{name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                <MapPin size={15} /> {profile.city}
              </p>
              <p className="mt-3 text-xs text-white/40">{profile.username ? `@${profile.username}` : "Username not set yet"}</p>
            </div>
            <div className="rounded-xl border border-[#d7b66c]/20 bg-black/20 p-5">
              <Trophy className="text-[#d7b66c]" size={24} />
              <p className="mt-3 text-2xl font-bold">{profile.rating}</p>
              <p className="text-xs text-white/40">Starting rating</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "WINS", value: profile.wins },
            { label: "LOSSES", value: profile.losses },
            { label: "DRAWS", value: profile.draws },
            { label: "TOTAL MATCHES", value: profile.wins + profile.losses + profile.draws },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#121318] p-5">
              <p className="text-xs tracking-widest text-white/40">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#121318] p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#d7b66c]" size={24} />
            <div>
              <h2 className="font-bold">Your chess journey</h2>
              <p className="mt-1 text-sm text-white/45">Your stats will grow as verified matches are recorded.</p>
            </div>
          </div>
          <div className="mt-5 border-t border-white/10 pt-5">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[#d7b66c] px-5 py-3 text-sm font-bold text-black">
              <Swords size={17} /> Explore the club
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
