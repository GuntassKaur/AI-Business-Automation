"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

const quickProviders = [
  { id: "google", label: "Continue with Google", icon: Chrome },
  { id: "github", label: "Continue with GitHub", icon: Github },
  { id: "microsoft", label: "Continue with Microsoft", icon: Sparkles },
];

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("Vitalshield Operator");
  const [email, setEmail] = useState("demo@vitalshield.ai");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, fullName, password);
      router.push("/dashboard");
    } catch {
      setError("Signup failed. Try a different email.");
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass neon-border float-card w-full max-w-md rounded-3xl p-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold"><Sparkles className="h-5 w-5 text-cyan-300" /> Create Account</h1>
        <p className="mt-2 text-sm text-slate-300">Launch your autonomous operations workspace</p>

        <div className="mt-5 space-y-2">
          {quickProviders.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="glow-button glass w-full rounded-xl px-4 py-2 text-left text-sm text-slate-200"
              onClick={() => setError(`${label} is coming soon. Use email signup for now.`)}
            >
              <span className="inline-flex items-center gap-2"><Icon size={15} /> {label}</span>
            </button>
          ))}
        </div>

        <div className="my-4 h-px bg-white/10" />

        <form onSubmit={submit} className="space-y-3">
          <input className="glass w-full rounded-xl px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
          <input className="glass w-full rounded-xl px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" className="glass w-full rounded-xl px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button className="glow-button w-full rounded-xl bg-cyan-400/25 px-4 py-2 text-cyan-100 hover:bg-cyan-400/40">Create Account</button>
        </form>
        <p className="mt-4 text-sm text-slate-300">Already have an account? <Link className="text-cyan-300" href="/login">Login</Link></p>
      </motion.div>
    </div>
  );
}
