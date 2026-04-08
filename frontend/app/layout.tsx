import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/auth-provider";

export const metadata = {
  title: "AI Business Automation OS",
  description: "Futuristic AI operations platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
