import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes } from "react";

export function NeonButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("rounded-xl border border-cyan-300/30 bg-cyan-400/15 px-4 py-2 text-cyan-100 transition hover:bg-cyan-300/25", className)} {...props} />;
}
