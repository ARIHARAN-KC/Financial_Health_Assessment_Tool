"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/50 to-gray-900"></div>
      
      <div className="text-center max-w-4xl relative z-10 space-y-8">
        {/* Logo/Brand with animation */}
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-6">
            FinMind
          </h2>
        </div>
        
        {/* Main title with enhanced gradient */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
          SME Financial
          <span className="block mt-2 bg-linear-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Health Platform
          </span>
        </h1>
        
        {/* Subtitle with glass effect */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-10 mb-12 max-w-3xl mx-auto border border-white/10 shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
            AI-powered insights for smarter business decisions
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/login"
            className="inline-flex items-center px-10 py-5 bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative z-10">Get Started</span>
            <svg 
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}