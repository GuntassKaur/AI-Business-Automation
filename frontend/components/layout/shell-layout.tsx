"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bot, LayoutDashboard, LogOut, Receipt, Settings, ShoppingCart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/components/auth/auth-provider";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/invoice", label: "Invoice AI", icon: Receipt },
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function ShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="relative z-10 min-h-screen px-4 py-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-[8%] top-10 h-44 w-44 rounded-full bg-indigo-500/35 blur-3xl" />
        <div className="absolute right-[12%] top-44 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute bottom-12 left-[38%] h-44 w-44 rounded-full bg-purple-500/25 blur-3xl" />
      </div>

      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass neon-border mx-auto mb-6 flex max-w-7xl items-center justify-between rounded-2xl px-6 py-4"
      >
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-cyan-200">
            <Sparkles className="h-5 w-5 text-cyan-300" /> AI Business Automation OS
          </div>
          <div className="mt-1 text-xs text-slate-400">{user?.full_name || "Operator"}</div>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="glow-button inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        >
          <LogOut size={14} /> Logout
        </button>
      </motion.nav>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-[280px_1fr]">
        <aside className="glass neon-border rounded-3xl p-4">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-cyan-300/80">Modules</p>
          <div className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`float-card group relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-sm transition duration-300 ease-in-out ${
                    isActive ? "bg-cyan-500/20 text-cyan-100" : "hover:bg-cyan-500/10"
                  }`}
                >
                  <span className="inline-flex items-center gap-2"><Icon size={16} />{label}</span>
                  <span className={`h-2 w-2 rounded-full transition ${isActive ? "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" : "bg-cyan-300/40 group-hover:bg-cyan-300"}`} />
                  {isActive && <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />}
                </Link>
              );
            })}
          </div>
        </aside>

        <AnimatePresence mode="wait">
          <motion.section
            key={pathname}
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
          >
            {children}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
