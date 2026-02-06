"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = () => {
      const authenticated = checkAuth();
      console.log('ProtectedRoute - Auth status:', authenticated);
      
      if (!authenticated) {
        console.log('Not authenticated, redirecting to login');
        router.push("/login");
      } else {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [router, checkAuth]);

  if (!isAuthenticated || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}