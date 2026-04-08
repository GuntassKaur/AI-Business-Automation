"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { ShellLayout } from "@/components/layout/shell-layout";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <ShellLayout>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass neon-border float-card rounded-3xl p-5">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <p className="mt-2 text-sm text-slate-300">Manage your organization identity and API permissions.</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl bg-white/5 p-3">Workspace: Vitalshield Labs</div>
              <div className="rounded-xl bg-white/5 p-3">Tier: Enterprise AI</div>
              <div className="rounded-xl bg-white/5 p-3">Region: US-East</div>
            </div>
          </div>
          <div className="glass neon-border float-card rounded-3xl p-5">
            <h2 className="text-2xl font-bold">Automation Preferences</h2>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center justify-between rounded-xl bg-white/5 p-3"><span>Autonomous Routing</span><input type="checkbox" defaultChecked /></label>
              <label className="flex items-center justify-between rounded-xl bg-white/5 p-3"><span>Invoice Pre-Validation</span><input type="checkbox" defaultChecked /></label>
              <label className="flex items-center justify-between rounded-xl bg-white/5 p-3"><span>AI Risk Alerts</span><input type="checkbox" /></label>
            </div>
          </div>
        </div>
      </ShellLayout>
    </AuthGuard>
  );
}
