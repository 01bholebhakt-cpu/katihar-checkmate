
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, city: "Katihar" },
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

        if (error) throw error;

        if (data.session) {
          router.push("/profile");
          router.refresh();
        } else {
          setMessage("Account created! Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a0d] px-5 py-12 text-[#f4f0e7]">
      <section className="w-full max-w-md rounded-3xl border border-[#d7b66c]/20 bg-[#121318] p-7 shadow-2xl md:p-10">
        <Link href="/" className="text-sm font-bold tracking-widest text-[#d7b66c]">
          ♞ KATIHAR CHECKMATE
        </Link>

        <p className="mt-10 text-xs font-bold tracking-[0.25em] text-[#d7b66c]">
          YOUR MOVE STARTS HERE
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          {mode === "signup" ? "Join the club." : "Welcome back."}
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          {mode === "signup"
            ? "Create your player account and become part of Katihar's chess community."
            : "Sign in to continue your chess journey."}
        </p>

        <div className="mt-7 grid grid-cols-2 rounded-xl bg-black/30 p-1">
          <button
            type="button"
            onClick={() => { setMode("signup"); setMessage(""); }}
            className={`rounded-lg py-3 text-sm font-semibold ${mode === "signup" ? "bg-[#d7b66c] text-black" : "text-white/50"}`}
          >
            Create account
          </button>
          <button
            type="button"
            onClick={() => { setMode("login"); setMessage(""); }}
            className={`rounded-lg py-3 text-sm font-semibold ${mode === "login" ? "bg-[#d7b66c] text-black" : "text-white/50"}`}
          >
            Log in
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <label className="block text-sm text-white/70">
              Full name
              <input
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d7b66c]"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="block text-sm text-white/70">
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d7b66c]"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm text-white/70">
            Password
            <input
              required
              minLength={6}
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d7b66c]"
              placeholder="At least 6 characters"
            />
          </label>

          {message && (
            <p role="status" className="rounded-lg border border-[#d7b66c]/20 bg-[#d7b66c]/5 p-3 text-sm text-[#e6c984]">
              {message}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#d7b66c] py-4 font-bold text-black transition hover:bg-[#f0d18a] disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create my account →" : "Log in →"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/35">
          Play fair. Think sharp. Represent Katihar.
        </p>
      </section>
    </main>
  );
}
