"use client";

import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  User,
  Building2,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
  UserPlus,
  LogIn,
  Check
} from "lucide-react";
import { useNotify } from "@/utils/notify";

export default function SignupPage() {
  const router = useRouter();
  const notify = useNotify(); 
  const [form, setForm] = useState<any>({
    email: "",
    full_name: "",
    business_name: "",
    industry: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {
    // Validation
    if (!form.email || !form.full_name || !form.business_name || !form.industry || !form.password) {
      notify.error("Please fill in all required fields", "Validation Error");
      return;
    }

    if (form.password !== confirmPassword) {
      notify.error("Passwords do not match", "Validation Error");
      return;
    }

    if (form.password.length < 6) {
      notify.error("Password must be at least 6 characters long", "Validation Error");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/signup", form);
      notify.success("Signup successful! Please login to continue.", "Account Created"); 
      router.push("/login");
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || "Signup failed. Please try again.";
      notify.error(errorMsg, "Signup Failed"); 
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signup();
    }
  };

  const industries = [
    "Technology",
    "Retail",
    "Healthcare",
    "Manufacturing",
    "Finance",
    "Hospitality",
    "Construction",
    "Consulting",
    "Education",
    "Other"
  ];

  const getPasswordStrength = () => {
    const length = form.password.length;
    if (length >= 8) return { strength: "Strong", color: "text-green-400", bg: "bg-green-500" };
    if (length >= 6) return { strength: "Medium", color: "text-yellow-400", bg: "bg-yellow-500" };
    return { strength: "Weak", color: "text-red-400", bg: "bg-red-500" };
  };

  const getPasswordWidth = () => {
    const length = form.password.length;
    if (length >= 8) return "w-full";
    if (length >= 6) return "w-2/3";
    if (length >= 4) return "w-1/2";
    return "w-1/3";
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-linear-to-tr from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="glass rounded-2xl p-8 md:p-10 border border-gray-800/50 shadow-2xl shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.svg"
                    alt="FinMind Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h2 className="text-3xl font-bold gradient-text">FinMind</h2>
              </div>
            </Link>
            <h3 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-cyan-400" />
              Create Your Account
            </h3>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="your@business.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  className="w-full pl-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="John Doe"
                  value={form.full_name}
                  onChange={e => setForm({ ...form, full_name: e.target.value })}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Business Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  className="w-full pl-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="Your Business Inc."
                  value={form.business_name}
                  onChange={e => setForm({ ...form, business_name: e.target.value })}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Industry <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                </div>
                <select
                  className="w-full pl-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500 appearance-none"
                  value={form.industry}
                  onChange={e => setForm({ ...form, industry: e.target.value })}
                  disabled={isLoading}
                >
                  <option value="" className="bg-gray-900">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="bg-gray-900">
                      {industry}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 p-3 glass border border-gray-700/50 rounded-xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password requirements */}
          <div className="mb-6 p-4 glass border border-gray-800/50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Password Requirements
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {form.password.length >= 6 ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                )}
                <span className={`text-sm ${form.password.length >= 6 ? 'text-green-400' : 'text-gray-400'}`}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                {form.password === confirmPassword && confirmPassword ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                )}
                <span className={`text-sm ${form.password === confirmPassword && confirmPassword ? 'text-green-400' : 'text-gray-400'}`}>
                  Passwords match
                </span>
              </div>
            </div>
          </div>

          {/* Password strength indicator */}
          {form.password && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Password strength
                </span>
                <span className={`flex items-center gap-2 ${passwordStrength.color}`}>
                  {form.password.length >= 8 ? <Check className="w-4 h-4" /> : null}
                  {passwordStrength.strength}
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getPasswordWidth()} ${passwordStrength.bg}`}
                ></div>
              </div>
            </div>
          )}

          {/* Terms and Signup Button */}
          <div className="space-y-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-3 rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500/50 focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{" "}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              onClick={signup}
              disabled={isLoading}
              className="w-full px-6 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group relative overflow-hidden flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 disabled:-translate-x-full"></div>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Login link */}
            <div className="text-center pt-4 border-t border-gray-800/50">
              <p className="text-gray-500 flex items-center justify-center gap-2">
                Already have an account?
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300 group"
                >
                  <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}