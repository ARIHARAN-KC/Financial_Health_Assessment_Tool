import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import NotificationContainer from "@/components/NotificationContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinMind",
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
          <NotificationProvider>
            <NotificationContainer />
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}