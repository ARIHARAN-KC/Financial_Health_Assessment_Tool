"use client";

import { useState } from "react";
import api from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Lock, 
  Mail, 
  LogIn, 
  Eye, 
  EyeOff, 
  Loader2, 
  Shield, 
  ArrowRight,
  Key,
  UserPlus,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      saveToken(res.data.access_token);
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tr from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="glass rounded-2xl p-8 md:p-10 border border-gray-800/50 shadow-2xl shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-2">
                {/* Option 1: Using Next.js Image component (recommended) */}
                <div className="relative w-16 h-16">
                  <Image 
                    src="/logo.svg" 
                    alt="FinMind Logo" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Option 2: Regular img tag with fixed size */}
                {/* <img 
                  src="/logo.svg" 
                  alt="FinMind Logo" 
                  className="w-10 h-10" 
                /> */}
                <h2 className="text-3xl font-bold gradient-text">FinMind</h2>
              </div>
            </Link>
            <h3 className="text-xl font-semibold text-white">Welcome Back</h3>
            <p className="text-gray-400 text-sm mt-2 flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  className="w-full pl-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={login}
              disabled={isLoading}
              className="w-full px-6 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group relative overflow-hidden flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 disabled:-translate-x-full"></div>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Additional links */}
            <div className="text-center space-y-4">
              <Link 
                href="/forgot-password" 
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-300 group"
              >
                <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Forgot your password?
              </Link>
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                Don't have an account?
                <Link 
                  href="/signup" 
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300 group"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your data is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}