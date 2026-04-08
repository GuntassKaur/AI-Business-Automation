"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Row = { day: string; revenue: number; orders: number };

export function DashboardCharts({ revenueData }: { revenueData: Row[] }) {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="glass float-card rounded-3xl p-5">
          <p className="mb-4 text-sm text-slate-300">Revenue Wave</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#22d3ee" fill="url(#revFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass float-card rounded-3xl p-5">
          <p className="mb-3 text-sm text-slate-300">AI Insights</p>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="rounded-xl bg-white/5 p-3">Momentum spike in enterprise upgrades after workflow nudges.</li>
            <li className="rounded-xl bg-white/5 p-3">Invoice anomaly risk dropped with confidence-gated approvals.</li>
            <li className="rounded-xl bg-white/5 p-3">AI recommends auto-routing delayed orders to escalation queue.</li>
          </ul>
        </div>
      </div>

      <div className="glass float-card rounded-3xl p-5">
        <p className="mb-4 text-sm text-slate-300">Orders Throughput</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Line dataKey="orders" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
