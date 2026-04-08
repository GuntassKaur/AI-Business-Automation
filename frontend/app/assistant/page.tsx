"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { ShellLayout } from "@/components/layout/shell-layout";
import { apiFetch } from "@/lib/api";
import { AuthGuard } from "@/components/auth/auth-guard";

type ChatMessage = { id: number; role: "user" | "ai"; text: string; typing?: boolean };

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-cyan-300"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

export default function AssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const nextId = useMemo(() => messages.length + 1, [messages.length]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    const value = prompt;
    setPrompt("");

    const userMessage: ChatMessage = { id: nextId, role: "user", text: value };
    const typingMessage: ChatMessage = { id: nextId + 1, role: "ai", text: "", typing: true };
    setMessages((prev) => [...prev, userMessage, typingMessage]);

    try {
      const res = await apiFetch<{ response: string; recommendation: string }>("/chat/", {
        method: "POST",
        body: JSON.stringify({ prompt: value }),
      });
      const finalText = `${res.response}\nSuggestion: ${res.recommendation}`;
      setMessages((prev) => prev.map((m) => (m.id === typingMessage.id ? { ...m, typing: false, text: finalText } : m)));
    } catch {
      setMessages((prev) => prev.map((m) => (m.id === typingMessage.id ? { ...m, typing: false, text: "Unable to reach AI service." } : m)));
    }
  };

  return (
    <AuthGuard>
      <ShellLayout>
        <div className="glass neon-border float-card rounded-3xl p-5">
          <h2 className="flex items-center gap-2 text-3xl font-bold">
            <Sparkles className="h-5 w-5 text-cyan-300" /> AI Chat Assistant
          </h2>

          <div className="mt-4 h-[500px] space-y-4 overflow-y-auto rounded-2xl bg-black/25 p-4">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className={`max-w-[82%] rounded-2xl p-3 text-sm ${m.role === "user" ? "ml-auto bg-gradient-to-r from-indigo-500/40 to-purple-500/35" : "bg-cyan-500/12"}`}
                >
                  {m.role === "ai" && (
                    <div className="mb-2 flex items-center gap-2 text-xs text-cyan-300">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        <Bot size={13} />
                      </span>
                      AI Copilot
                    </div>
                  )}
                  {m.typing ? <TypingDots /> : <p className="whitespace-pre-line">{m.text}</p>}
                </motion.div>
              ))}
            </AnimatePresence>

            {!messages.length && <p className="text-sm text-slate-400">Ask about orders, invoices, or workflow automation intelligence.</p>}
          </div>

          <form onSubmit={send} className="mt-4 flex gap-3">
            <input
              className="glass flex-1 rounded-xl px-4 py-3 text-sm"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask the AI to optimize a workflow..."
            />
            <button type="submit" className="glow-button rounded-xl bg-cyan-400/20 px-5 py-3 hover:bg-cyan-400/35">
              Send
            </button>
          </form>
        </div>
      </ShellLayout>
    </AuthGuard>
  );
}
