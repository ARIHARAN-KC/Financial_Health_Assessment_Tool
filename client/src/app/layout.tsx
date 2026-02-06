import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FInMind",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}