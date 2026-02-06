"use client";

import api from "@/lib/api";
import { useState } from "react";
import {
  Globe,
  Sparkles,
  FileText,
  Shield,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Coins,
  Loader2,
  Brain,
  Target,
  LineChart,
  BarChart3,
  ChevronRight,
  Languages,
  Bot
} from "lucide-react";

export default function AnalysisPage() {
  const [lang, setLang] = useState("en");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setIsGenerating(true);
    setError(null);
    setText("");

    try {
      const res = await api.post(`/ai/financial-health?language=${lang}`);
      setText(res.data.insights);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to generate insights");
      console.error("Analysis error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  ];

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              AI Financial Analysis
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
            Get AI-powered insights into your business financial health
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 border border-gray-800/50 sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                Analysis Settings
              </h2>

              {/* Language Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <span className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-cyan-400" />
                    Analysis Language
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => setLang(language.code)}
                      className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-300 group ${lang === language.code
                          ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-white"
                          : "bg-gray-900/50 border-gray-700/50 text-gray-400 hover:border-cyan-500/30 hover:text-white"
                        }`}
                    >
                      <span className="mr-2 text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                      <ChevronRight className={`w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-transform ${lang === language.code ? 'opacity-100' : ''
                        }`} />
                    </button>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-3 flex items-center gap-2">
                  <Languages className="w-3 h-3" />
                  Select the language for your financial insights
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={run}
                disabled={isGenerating}
                className="w-full px-6 py-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-white/20 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Insights...
                    </>
                  ) : (
                    <>
                      Generate Financial Insights
                      <Bot className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              {/* Information */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <div className="space-y-3">
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-cyan-500/20 transition-colors">
                      <FileText className="w-3 h-3 text-cyan-400" />
                    </div>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      Analysis is based on your uploaded financial data and documents
                    </p>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-purple-500/20 transition-colors">
                      <Shield className="w-3 h-3 text-purple-400" />
                    </div>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      All data is processed securely and not stored
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-gray-800/50 overflow-hidden">
              {/* Results Header */}
              <div className="p-6 border-b border-gray-800/50 bg-linear-to-r from-gray-900/50 to-gray-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-linear-to-br from-purple-500/10 to-indigo-500/10 rounded-lg">
                      <LineChart className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">AI Financial Insights</h2>
                      <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Language: {languages.find(l => l.code === lang)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Content */}
              <div className="p-6 min-h-125">
                {error ? (
                  <div className="p-4 bg-linear-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">Analysis Error</p>
                        <p className="text-red-300/70 text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : text ? (
                  <div className="space-y-6">
                    {/* Insights Card */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Financial Health Summary
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {text}
                        </div>
                      </div>
                    </div>

                    {/* Additional Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors group">
                        <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                          Growth Opportunities
                        </h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Consider expanding to new markets</span>
                          </li>
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Optimize pricing strategy for higher margins</span>
                          </li>
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Invest in digital transformation initiatives</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                        <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                          Risk Management
                        </h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Diversify revenue streams to reduce dependency</span>
                          </li>
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Review insurance coverage and risk assessment</span>
                          </li>
                          <li className="flex items-start group/item">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                            <span>Establish emergency fund reserves</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Cost Optimization Card */}
                    <div className="bg-linear-to-br from-emerald-500/5 to-teal-500/5 rounded-xl p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors group">
                      <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                        <Coins className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                        Cost Optimization
                      </h4>
                      <ul className="text-gray-400 text-sm space-y-2">
                        <li className="flex items-start group/item">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                          <span>Review recurring subscriptions and services</span>
                        </li>
                        <li className="flex items-start group/item">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                          <span>Negotiate better terms with suppliers</span>
                        </li>
                        <li className="flex items-start group/item">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 group-hover/item:scale-150 transition-transform"></div>
                          <span>Implement energy-saving measures</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-96">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 border-4 border-gray-800 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      Analyzing Your Financial Data
                    </h3>
                    <p className="text-gray-400 text-center max-w-md">
                      Our AI is processing your financial information to generate personalized insights...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <div className="w-20 h-20 bg-linear-to-br from-purple-500/10 to-indigo-500/10 rounded-full flex items-center justify-center mb-6 group">
                      <Lightbulb className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Generate Financial Insights</h3>
                    <p className="text-gray-400 max-w-md mb-4">
                      Click the "Generate Financial Insights" button to get AI-powered analysis of your financial data.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BarChart3 className="w-4 h-4" />
                        <span>Detailed Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Target className="w-4 h-4" />
                        <span>Actionable Insights</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}