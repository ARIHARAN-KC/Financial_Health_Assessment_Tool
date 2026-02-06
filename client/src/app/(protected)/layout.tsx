import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-950">
        <Navbar />
        <main className="pt-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}