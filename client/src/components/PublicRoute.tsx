"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({ children, redirectTo = "/dashboard" }: PublicRouteProps) {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = () => {
      const authenticated = checkAuth();
      console.log('PublicRoute - Auth status:', authenticated);
      
      if (authenticated) {
        console.log('Already authenticated, redirecting to', redirectTo);
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [router, redirectTo, checkAuth]);

  if (isAuthenticated || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}