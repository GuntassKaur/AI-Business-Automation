"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("ai_os_token");
    router.replace(token ? "/dashboard" : "/login");
  }, [router]);
  return null;
}
