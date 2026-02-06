"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  Home,
  Upload,
  Zap,
  BarChart3,
  User,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="backdrop-blur-xl bg-gray-900/80 border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              href={isAuthenticated ? "/dashboard" : "/"} 
              className="flex items-center space-x-3 group"
              onClick={closeAllMenus}
            >
              <div className="relative w-14 h-14">
                <Image 
                  src="/logo.svg" 
                  alt="FinMind Logo" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl bg-linear-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  FinMind
                </h1>
              </div>
            </Link>
          </div>

          {/* Conditional Navigation based on auth status */}
          {!isAuthenticated ? (
            // Public Navigation (Before Login)
            <>
              {/* Desktop - Login/Signup */}
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 text-gray-200 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 flex items-center gap-2 group"
                >
                  <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-2.5 bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign Up
                </Link>
              </div>

              {/* Mobile - Login/Signup Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </>
          ) : (
            // Authenticated Navigation (After Login)
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <Link 
                  href="/dashboard" 
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={closeAllMenus}
                >
                  <div className="flex items-center space-x-2">
                    <Home className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-transform" />
                    <span className="font-medium">Dashboard</span>
                  </div>
                </Link>
                
                <Link 
                  href="/upload" 
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={closeAllMenus}
                >
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-transform" />
                    <span className="font-medium">Upload</span>
                  </div>
                </Link>
                
                <Link 
                  href="/analysis" 
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={closeAllMenus}
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-transform" />
                    <span className="font-medium">AI Analysis</span>
                  </div>
                </Link>
                
                <Link 
                  href="/reports" 
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={closeAllMenus}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-transform" />
                    <span className="font-medium">Reports</span>
                  </div>
                </Link>

                {/* User profile dropdown */}
                <div className="relative ml-4">
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full border-2 border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <UserCircle className="w-5 h-5" />
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-gray-900/90 rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 animate-in fade-in-0 zoom-in-95">
                      <div className="py-2">
                        <Link 
                          href="/profile" 
                          className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 group"
                          onClick={closeAllMenus}
                        >
                          <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Profile</span>
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 group"
                          onClick={closeAllMenus}
                        >
                          <Settings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
                          <span className="font-medium">Settings</span>
                        </Link>
                        <div className="border-t border-white/10 my-2"></div>
                        <button 
                          onClick={() => {
                            logout();
                            closeAllMenus();
                          }}
                          className="w-full text-left flex items-center px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/10 transition-colors duration-200 group relative overflow-hidden rounded-b-2xl"
                        >
                          <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Logout</span>
                          <div className="absolute inset-0 bg-linear-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-500"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-xl bg-gray-900/90 rounded-2xl border border-white/10 mt-3 mb-4 shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in fade-in-0 zoom-in-95">
            {!isAuthenticated ? (
              // Mobile - Public Menu
              <div className="px-4 py-4 space-y-3">
                <Link 
                  href="/login" 
                  className="block w-full px-4 py-3 text-center text-gray-200 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 group"
                  onClick={closeAllMenus}
                >
                  <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block w-full px-4 py-3 text-center bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                  onClick={closeAllMenus}
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign Up
                </Link>
              </div>
            ) : (
              // Mobile - Authenticated Menu
              <div className="px-3 py-3 space-y-1">
                <Link 
                  href="/dashboard" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <Home className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                
                <Link 
                  href="/upload" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <Upload className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">Upload</span>
                </Link>
                
                <Link 
                  href="/analysis" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <Zap className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">AI Analysis</span>
                </Link>
                
                <Link 
                  href="/reports" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <BarChart3 className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">Reports</span>
                </Link>

                <div className="border-t border-white/10 mx-4 my-2"></div>

                <Link 
                  href="/profile" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <User className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">Profile</span>
                </Link>
                
                <Link 
                  href="/settings" 
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 group"
                  onClick={closeAllMenus}
                >
                  <Settings className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-transform" />
                  <span className="font-medium">Settings</span>
                </Link>
                
                <button 
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  className="w-full text-left flex items-center px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-colors duration-200 group relative overflow-hidden"
                >
                  <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                  <span className="font-medium">Logout</span>
                  <div className="absolute inset-0 bg-linear-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}