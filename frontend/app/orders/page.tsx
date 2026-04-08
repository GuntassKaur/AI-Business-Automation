"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShellLayout } from "@/components/layout/shell-layout";
import { apiFetch } from "@/lib/api";
import { AuthGuard } from "@/components/auth/auth-guard";

type Order = { id: number; title: string; customer: string; amount: number; status: string };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState("");

  const load = async () => setOrders(await apiFetch<Order[]>("/orders/"));

  useEffect(() => {
    load().catch(() => setError("Unable to load orders"));
  }, []);

  const createOrder = async () => {
    setError("");
    try {
      await apiFetch<Order>("/orders/", { method: "POST", body: JSON.stringify({ title, customer, amount: Number(amount), status: "pending" }) });
      setTitle("");
      setCustomer("");
      setAmount("0");
      await load();
    } catch {
      setError("Failed to create order");
    }
  };

  return (
    <AuthGuard>
      <ShellLayout>
        <div className="space-y-4">
          <div className="glass neon-border float-card rounded-3xl p-5">
            <h2 className="text-3xl font-bold">Orders Module</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <input className="glass rounded-xl px-3 py-2" placeholder="Order title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="glass rounded-xl px-3 py-2" placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
              <input className="glass rounded-xl px-3 py-2" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <button onClick={createOrder} className="glow-button rounded-xl bg-cyan-400/20 px-4 py-2 text-cyan-200 hover:bg-cyan-400/35">Create</button>
            </div>
            {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
          </div>
          <div className="glass neon-border float-card rounded-3xl p-4">
            <div className="grid grid-cols-4 border-b border-white/10 pb-2 text-sm text-slate-300"><p>Title</p><p>Customer</p><p>Amount</p><p>Status</p></div>
            <div className="mt-2 space-y-2">
              {orders.map((o, i) => (
                <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="float-card grid grid-cols-4 rounded-xl bg-white/5 p-3 text-sm">
                  <p>{o.title}</p><p>{o.customer}</p><p>${o.amount.toFixed(2)}</p><p>{o.status}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ShellLayout>
    </AuthGuard>
  );
}
