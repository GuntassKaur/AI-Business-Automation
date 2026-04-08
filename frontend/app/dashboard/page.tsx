"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ShellLayout } from "@/components/layout/shell-layout";
import { AuthGuard } from "@/components/auth/auth-guard";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard-charts").then((m) => m.DashboardCharts),
  {
    ssr: false,
    loading: () => <div className="glass float-card h-72 rounded-3xl p-5 animate-pulse" />,
  }
);

const revenueData = [
  { day: "Mon", revenue: 12000, orders: 104 },
  { day: "Tue", revenue: 14500, orders: 128 },
  { day: "Wed", revenue: 16400, orders: 139 },
  { day: "Thu", revenue: 15220, orders: 131 },
  { day: "Fri", revenue: 18900, orders: 154 },
  { day: "Sat", revenue: 20300, orders: 170 },
];

const stats = [
  { label: "Orders", value: "1,284", delta: "+18%" },
  { label: "Revenue", value: "$284,920", delta: "+24%" },
  { label: "Active Users", value: "9,210", delta: "+11%" },
];

export default function DashboardPage() {
  return (
    <AuthGuard>
      <ShellLayout>
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass neon-border float-card rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-cyan-500/20 p-6"
          >
            <h1 className="text-4xl font-bold tracking-tight">Command Dashboard</h1>
            <p className="mt-2 text-slate-300">Neural control center for high-velocity business automation.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass float-card rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 p-5"
              >
                <p className="text-sm text-slate-300">{s.label}</p>
                <p className="mt-2 text-3xl font-bold text-cyan-200">{s.value}</p>
                <p className="mt-2 text-xs text-emerald-300">{s.delta} this week</p>
              </motion.div>
            ))}
          </div>

          <DashboardCharts revenueData={revenueData} />
        </div>
      </ShellLayout>
    </AuthGuard>
  );
}
