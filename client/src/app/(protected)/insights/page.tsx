"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Brain,
  Sparkles,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  DollarSign,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Share2,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calculator,
  Coins,
  Building,
  Scale,
  LineChart,
  ArrowRight,
  Languages,
  Globe,
  Loader2
} from "lucide-react";

export default function InsightsPage() {
  const [insights, setInsights] = useState("");
  const [language, setLanguage] = useState("hi");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  ];

  const fetchInsights = async (lang: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get(`/ai/insights?lang=${lang}`);
      setInsights(res.data.insights);
      
      // Set last updated time
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    } catch (err: any) {
      console.error("Failed to fetch insights:", err);
      setError(err.response?.data?.detail || "Failed to load AI insights");
      setInsights("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(language);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    fetchInsights(lang);
  };

  // Extract key points from insights (for demonstration)
  const extractKeyPoints = (text: string) => {
    if (!text) return [];
    // This is a simple extraction - in real app, you might want more sophisticated parsing
    const sentences = text.split('।').filter(s => s.trim().length > 0);
    return sentences.slice(0, 4); // Return first 4 points
  };

  const keyPoints = extractKeyPoints(insights);

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  AI Financial Insights
                </h1>
                <p className="text-gray-400 mt-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Powered by advanced artificial intelligence
                </p>
              </div>
            </div>
            
            {lastUpdated && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Updated: {lastUpdated}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="glass rounded-2xl p-4 border border-gray-800/50 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300 font-medium">Insights Language</span>
              </div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 group ${
                      language === lang.code
                        ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-white"
                        : "bg-gray-900/50 border-gray-700/50 text-gray-400 hover:border-cyan-500/30 hover:text-white"
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights Panel */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-gray-800/50 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-800/50 bg-linear-to-r from-gray-900/50 to-gray-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h2 className="text-xl font-semibold text-white">AI-Generated Insights</h2>
                      <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                        <Languages className="w-3 h-3" />
                        Language: {languages.find(l => l.code === language)?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchInsights(language)}
                      disabled={isLoading}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group"
                      title="Refresh insights"
                    >
                      <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group">
                      <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group">
                      <Share2 className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-125">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-96">
                    <div className="relative mb-8">
                      <div className="w-20 h-20 border-4 border-gray-800 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Insights
                    </h3>
                    <p className="text-gray-400 text-center max-w-md">
                      Our AI is analyzing your financial data to provide personalized insights...
                    </p>
                  </div>
                ) : error ? (
                  <div className="p-4 bg-linear-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">Failed to Load Insights</p>
                        <p className="text-red-300/70 text-sm">{error}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => fetchInsights(language)}
                      className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </button>
                  </div>
                ) : insights ? (
                  <div className="space-y-6">
                    {/* Main Insights */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        AI Analysis Results
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                          {insights}
                        </div>
                      </div>
                    </div>

                    {/* Key Points */}
                    {keyPoints.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-xl p-4 border border-cyan-500/20">
                          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-cyan-400" />
                            Strengths Identified
                          </h4>
                          <ul className="space-y-2">
                            {keyPoints.slice(0, 2).map((point, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-400 text-sm">{point.trim()}।</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-500/20">
                          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {keyPoints.slice(2, 4).map((point, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-400 text-sm">{point.trim()}।</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <div className="w-20 h-20 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center mb-6 group">
                      <Brain className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Insights Available</h3>
                    <p className="text-gray-400 max-w-md mb-4">
                      We couldn't generate insights for your financial data. Please make sure you have uploaded sufficient financial information.
                    </p>
                    <button
                      onClick={() => fetchInsights(language)}
                      className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      Generate Insights
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* How It Works */}
              <div className="glass rounded-2xl p-6 border border-gray-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  How AI Analysis Works
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 transition-colors">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">1. Data Processing</h4>
                      <p className="text-gray-400 text-xs">AI analyzes uploaded financial documents</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                      <Calculator className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">2. Pattern Recognition</h4>
                      <p className="text-gray-400 text-xs">Identifies trends and patterns in data</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                      <Lightbulb className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">3. Insight Generation</h4>
                      <p className="text-gray-400 text-xs">Generates actionable business insights</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Overview */}
              <div className="glass rounded-2xl p-6 border border-gray-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Key Financial Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      Profit Margin
                    </span>
                    <span className="text-white font-medium">18.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      Growth Rate
                    </span>
                    <span className="text-white font-medium">12.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Scale className="w-3 h-3" />
                      Debt Ratio
                    </span>
                    <span className="text-white font-medium">0.42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Coins className="w-3 h-3" />
                      Cash Flow
                    </span>
                    <span className="text-white font-medium">Positive</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="glass rounded-2xl p-6 border border-gray-800/50">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Data Security & Privacy</h4>
                    <p className="text-gray-400 text-sm">
                      All analysis is performed securely using encrypted data. Your financial information is never stored permanently.
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="glass rounded-2xl p-6 border border-gray-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                  Recommended Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-linear-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg hover:border-cyan-500/40 transition-colors flex items-center justify-between group">
                    <span className="text-white text-sm">Review Detailed Reports</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button className="w-full text-left p-3 bg-linear-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors flex items-center justify-between group">
                    <span className="text-white text-sm">Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button className="w-full text-left p-3 bg-linear-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 transition-colors flex items-center justify-between group">
                    <span className="text-white text-sm">Update Financial Data</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}