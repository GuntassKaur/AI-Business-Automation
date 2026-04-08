"use client";

import { useState } from "react";
import { ShellLayout } from "@/components/layout/shell-layout";
import { API_URL } from "@/lib/api";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function InvoicePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    const token = localStorage.getItem("ai_os_token");
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/invoice/process`, { method: "POST", body: form, headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!response.ok) throw new Error("Upload failed");
      setResult(await response.json());
    } catch {
      setError("Invoice processing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <ShellLayout>
        <div className="space-y-4">
          <div className="glass neon-border float-card rounded-3xl p-5">
            <h2 className="text-3xl font-bold">Invoice AI Module</h2>
            <p className="text-slate-300">Upload invoice and auto-extract structured metadata.</p>
            <input type="file" className="mt-4 block" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </div>
          <div className="glass neon-border float-card rounded-3xl p-5">
            {loading && <div className="animate-pulse rounded-xl bg-white/5 p-6">Processing with AI...</div>}
            {error && <p className="text-sm text-rose-300">{error}</p>}
            {result && (
              <div className="space-y-2 text-sm">
                <p>Vendor: <span className="text-cyan-300">{result.vendor}</span></p>
                <p>Total: <span className="text-cyan-300">${result.total}</span></p>
                <p>Tax: <span className="text-cyan-300">${result.tax}</span></p>
                <p>Confidence: <span className="text-cyan-300">{Math.round(result.confidence * 100)}%</span></p>
              </div>
            )}
          </div>
        </div>
      </ShellLayout>
    </AuthGuard>
  );
}
