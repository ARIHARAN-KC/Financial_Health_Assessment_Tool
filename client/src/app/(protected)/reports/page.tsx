"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  Upload,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingDown,
  Shield,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react";

type Report = {
  id: number;
  report_type: string;
  summary: string | null;
  metrics: Record<string, any>;
  ai_insights: any;
  created_at: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await api.get("/reports");
        setReports(res.data || []);
      } catch (err: any) {
        console.error("Failed to load reports:", err);
        setError(err.response?.data?.detail || "Failed to load reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  /* ----------------------- LOADING STATE ----------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center">
        <div className="text-cyan-300 animate-pulse flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-lg font-medium">Loading reports...</span>
        </div>
      </div>
    );
  }

  /* ----------------------- ERROR STATE ----------------------- */
  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center">
        <div className="glass p-10 rounded-3xl text-center max-w-md border border-red-900/50 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6 p-2 bg-red-500/10 rounded-full" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-300 mb-8 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ----------------------- EMPTY STATE ----------------------- */
  if (!reports.length) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center">
        <div className="glass p-12 rounded-3xl text-center max-w-lg border border-gray-800/70 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center shadow-lg">
            <FileText className="w-12 h-12 text-cyan-400" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            No Reports Yet
          </h2>
          <p className="text-gray-300 mb-10 text-lg leading-relaxed">
            Upload your financial data and run an analysis to generate AI-powered reports.
          </p>

          <Link
            href="/upload"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-cyan-500/30"
          >
            <Upload className="w-5 h-5" />
            Upload Financial Data
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  /* ----------------------- MAIN CONTENT ----------------------- */
  const report = reports[0]; // latest (already DESC from backend)

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              Financial Report
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-gray-300 flex items-center gap-2 mt-2 text-lg">
              <Clock className="w-5 h-5 text-cyan-400" />
              Generated on {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        {report.summary && (
          <section className="glass p-8 rounded-2xl border border-gray-800/70 bg-gradient-to-br from-gray-900/50 to-black/50 shadow-xl">
            <h2 className="text-white font-bold text-xl mb-6 tracking-tight flex items-center gap-3">
              <BarChart3 className="text-cyan-400 w-6 h-6" />
              Executive Summary
            </h2>
            <div className="bg-gradient-to-br from-gray-900/70 to-black/50 p-8 rounded-xl border border-gray-800/50">
              {/* Financial Health Overview */}
              <div className="mb-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/10 rounded-xl border border-green-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Overall Financial Health</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300 font-medium">Profit Margin</span>
                    </div>
                    <p className="text-white text-2xl font-bold">29.14%</p>
                    <p className="text-green-400 text-sm mt-1">Healthy</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300 font-medium">Working Capital</span>
                    </div>
                    <p className="text-white text-2xl font-bold">$76,700</p>
                    <p className="text-green-400 text-sm mt-1">Sufficient Liquidity</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300 font-medium">Debt-to-Revenue</span>
                    </div>
                    <p className="text-white text-2xl font-bold">0.26</p>
                    <p className="text-yellow-400 text-sm mt-1">Monitor Closely</p>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  The company appears to be in a relatively healthy financial position with good profitability and sufficient liquidity. However, the moderate debt level requires close monitoring.
                </p>
              </div>

              {/* Key Risk Areas */}
              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-900/20 to-amber-900/10 rounded-xl border border-yellow-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Key Risk Assessment</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Cash Flow Management</h4>
                      <p className="text-gray-300">Healthy profit margin suggests good cash flow, but monitor accounts receivable and payable closely to ensure consistent inflows and outflows.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Debt Management</h4>
                      <p className="text-gray-300">Avoid additional debt unless for productive, growth-oriented investments. Excessive debt can strain cash flow and profitability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Compliance & Regulatory</h4>
                      <p className="text-gray-300">Ensure all tax, regulatory, and reporting requirements are met. Consult an accountant or financial advisor to avoid penalties.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Optimization */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 rounded-xl border border-blue-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Cost Optimization Opportunities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h4 className="text-white font-semibold mb-2">Supplier Contracts</h4>
                    <p className="text-gray-300">Review and negotiate supplier contracts for better pricing</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h4 className="text-white font-semibold mb-2">Process Automation</h4>
                    <p className="text-gray-300">Automate administrative processes to reduce overhead</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h4 className="text-white font-semibold mb-2">Energy Efficiency</h4>
                    <p className="text-gray-300">Explore energy-efficient upgrades to reduce utility costs</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h4 className="text-white font-semibold mb-2">Inventory Management</h4>
                    <p className="text-gray-300">Optimize inventory to minimize holding costs</p>
                  </div>
                </div>
              </div>

              {/* Financial Products */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/10 rounded-xl border border-purple-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <PieChart className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Recommended Financial Products</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-cyan-800/30">
                    <h4 className="text-cyan-300 font-bold mb-2">Short-term Loans</h4>
                    <p className="text-gray-300 text-sm">Business loans or lines of credit for working capital needs</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-blue-800/30">
                    <h4 className="text-blue-300 font-bold mb-2">Equipment Financing</h4>
                    <p className="text-gray-300 text-sm">Equipment financing or leasing for capital expenditures</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-green-800/30">
                    <h4 className="text-green-300 font-bold mb-2">Invoice Factoring</h4>
                    <p className="text-gray-300 text-sm">Accelerate accounts receivable to improve cash flow</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4 text-sm italic">Shop around with multiple banks and NBFCs to compare terms</p>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-6 bg-gradient-to-r from-emerald-900/20 to-teal-900/10 rounded-xl border border-emerald-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Actionable Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Closely monitor cash flow, accounts receivable, and accounts payable to maintain healthy liquidity",
                    "Avoid taking on additional debt unless for strategic, growth-oriented investments",
                    "Explore cost-saving opportunities in supplier contracts, administrative processes, and energy efficiency",
                    "Investigate short-term financing options for working capital needs",
                    "Consult an accountant or financial advisor to ensure full compliance with all requirements"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors">
                      <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-emerald-400 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-200">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <p className="text-gray-300 text-sm italic">
                    Note: These recommendations are based on provided financial metrics and are intended to be conservative and risk-aware. Always seek professional advice specific to your business situation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* METRICS */}
        <section className="glass p-8 rounded-2xl border border-gray-800/70 bg-gradient-to-br from-gray-900/50 to-black/50 shadow-xl">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3 tracking-tight">
            <TrendingUp className="text-green-400 w-6 h-6" />
            Key Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(report.metrics || {}).map(([key, value]) => (
              <div
                key={key}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <p className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-2">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-white font-bold text-2xl">
                  {typeof value === "number"
                    ? value.toLocaleString()
                    : JSON.stringify(value)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RISK */}
        {report.ai_insights?.risk && (
          <section className="glass p-8 rounded-2xl border border-gray-800/70 bg-gradient-to-br from-gray-900/50 to-black/50 shadow-xl">
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3 tracking-tight">
              <AlertTriangle className="text-yellow-400 w-6 h-6" />
              Risk Assessment
            </h2>
            <pre className="text-gray-200 text-base font-mono bg-gray-900/50 p-6 rounded-xl border border-gray-800 overflow-x-auto">
              {JSON.stringify(report.ai_insights.risk, null, 2)}
            </pre>
          </section>
        )}

        {/* AI INSIGHTS */}
        {report.ai_insights && (
          <section className="glass p-8 rounded-2xl border border-gray-800/70 bg-gradient-to-br from-gray-900/50 to-black/50 shadow-xl">
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3 tracking-tight">
              <Lightbulb className="text-blue-400 w-6 h-6" />
              AI Insights
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed bg-gray-900/30 p-6 rounded-xl border border-gray-800/50">
              {typeof report.ai_insights === "string"
                ? report.ai_insights
                : JSON.stringify(report.ai_insights, null, 2)}
            </p>
          </section>
        )}

        {/* FOOTER */}
        <div className="text-gray-400 text-sm text-right font-medium pt-4 border-t border-gray-800/50">
          Report ID: <span className="text-cyan-300 font-bold">{report.id}</span>
        </div>
      </div>
    </div>
  );
}