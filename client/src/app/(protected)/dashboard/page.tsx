"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import MetricCard from "@/components/MetricCard";
import Link from "next/link";
import {
  RefreshCw,
  Upload,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Target,
  PieChart,
  Building,
  Scale,
  Zap,
  Brain,
  FileText,
  Shield,
  Lightbulb,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  Coins,
  LineChart,
  DollarSign as DollarIcon,
  Calculator,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon
} from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/analysis");

        if (res.data && res.data.metrics) {
          setMetrics(res.data.metrics);

          // Set last updated time
          const now = new Date();
          setLastUpdated(now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }));
        } else {
          setMetrics(null);
          setError("No financial data available");
        }
      } catch (error: any) {
        console.error("Failed to fetch metrics:", error);
        setError(error.response?.data?.message || "Failed to load financial data");
        setMetrics(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Format currency values
  const formatCurrency = (value: number) => {
    if (value === undefined || value === null) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage values
  const formatPercentage = (value: number, decimals: number = 2) => {
    if (value === undefined || value === null) return "N/A";
    return `${(value * 100).toFixed(decimals)}%`;
  };

  // Format ratio values
  const formatRatio = (value: number) => {
    if (value === undefined || value === null) return "N/A";
    return value.toFixed(2);
  };

  // Determine trends (mock data - in real app this would come from API)
  const getTrend = (key: string) => {
    const trends: any = {
      total_revenue: 12.5,
      total_expenses: -5.2,
      profit: 18.7,
      profit_margin: 3.1,
      working_capital: 8.3,
      debt_to_revenue: -2.4,
    };
    return trends[key] || 0;
  };

  // Get icon for each metric
  const getIcon = (key: string) => {
    const icons: any = {
      total_revenue: <DollarSign className="w-6 h-6" />,
      total_expenses: <CreditCard className="w-6 h-6" />,
      profit: <TrendingUp className="w-6 h-6" />,
      profit_margin: <PieChart className="w-6 h-6" />,
      working_capital: <Building className="w-6 h-6" />,
      debt_to_revenue: <Scale className="w-6 h-6" />,
    };
    return icons[key];
  };

  // Get description for each metric
  const getDescription = (key: string) => {
    const descriptions: any = {
      total_revenue: "Total income generated",
      total_expenses: "Total operational costs",
      profit: "Net income after expenses",
      profit_margin: "Net profit percentage",
      working_capital: "Current assets minus liabilities",
      debt_to_revenue: "Debt relative to revenue",
    };
    return descriptions[key];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-8 w-48 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-4 w-64 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-gray-800/50 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-gray-800 rounded-lg"></div>
                  <div className="h-4 w-32 bg-gray-800 rounded"></div>
                </div>
                <div className="h-10 w-48 bg-gray-800 rounded mb-6"></div>
                <div className="h-2 w-full bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No data or error state
  if (!metrics || error) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-12 text-center">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-yellow-400" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              No Financial Data Available
            </h2>

            {/* Message */}
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {error || "We couldn't find any financial data for your account. Please upload your financial documents to get started with AI-powered insights."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/upload"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Upload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span className="relative">Upload Documents</span>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 backdrop-blur-md bg-white/5 border border-white/10 text-gray-200 hover:text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-semibold mb-6 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                Getting Started
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2 group">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-cyan-500/20 transition-colors">
                    <FileText className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    1. Upload Data
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">Upload your financial statements, invoices, or Excel files</p>
                </div>
                <div className="space-y-2 group">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                    <Brain className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    2. AI Analysis
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">Our AI processes and analyzes your financial data</p>
                </div>
                <div className="space-y-2 group">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
                    <LineChart className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    3. Get Insights
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">View comprehensive metrics and actionable insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get trend icon based on value
  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <TrendingUpIcon className="w-4 h-4" />;
    } else if (trend < 0) {
      return <TrendingDown className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  Financial Dashboard
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {lastUpdated && `Last updated: ${lastUpdated}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center space-x-2 group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Revenue"
            value={formatCurrency(metrics?.total_revenue)}
            trend={getTrend("total_revenue")}
            description={getDescription("total_revenue")}
            icon={getIcon("total_revenue")}
            trendIcon={getTrendIcon(getTrend("total_revenue"))}
          />

          <MetricCard
            title="Expenses"
            value={formatCurrency(metrics?.total_expenses)}
            trend={getTrend("total_expenses")}
            description={getDescription("total_expenses")}
            icon={getIcon("total_expenses")}
            trendIcon={getTrendIcon(getTrend("total_expenses"))}
          />

          <MetricCard
            title="Profit"
            value={formatCurrency(metrics?.profit)}
            trend={getTrend("profit")}
            description={getDescription("profit")}
            icon={getIcon("profit")}
            trendIcon={getTrendIcon(getTrend("profit"))}
          />

          <MetricCard
            title="Profit Margin"
            value={formatPercentage(metrics?.profit_margin)}
            trend={getTrend("profit_margin")}
            description={getDescription("profit_margin")}
            icon={getIcon("profit_margin")}
            trendIcon={getTrendIcon(getTrend("profit_margin"))}
          />

          <MetricCard
            title="Working Capital"
            value={formatCurrency(metrics?.working_capital)}
            trend={getTrend("working_capital")}
            description={getDescription("working_capital")}
            icon={getIcon("working_capital")}
            trendIcon={getTrendIcon(getTrend("working_capital"))}
          />

          <MetricCard
            title="Debt Ratio"
            value={formatRatio(metrics?.debt_to_revenue)}
            trend={getTrend("debt_to_revenue")}
            description={getDescription("debt_to_revenue")}
            icon={getIcon("debt_to_revenue")}
            trendIcon={getTrendIcon(getTrend("debt_to_revenue"))}
          />
        </div>

        {/* Additional Information */}
        <div className="mt-10 glass rounded-2xl p-6 border border-gray-800/50">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Financial Insights & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Profit margin is {metrics?.profit_margin ? `healthy at ${formatPercentage(metrics.profit_margin)}` : 'being calculated'}
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Revenue shows positive growth trend of {getTrend("total_revenue")}%
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Monitor expense ratios for optimization opportunities
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Actionable Recommendations
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Consider reinvesting {formatPercentage(0.3)} of profits for growth
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Review debt structure for better interest rates
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Schedule next financial review in 30 days
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 glass rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/analysis"
              className="p-4 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white group-hover:text-cyan-300 transition-colors">AI Analysis</h4>
                  <p className="text-gray-400 text-sm">Get detailed insights</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link
              href="/reports"
              className="p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Download className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">Download Reports</h4>
                  <p className="text-gray-400 text-sm">Export your data</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link
              href="/upload"
              className="p-4 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Upload className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white group-hover:text-emerald-300 transition-colors">Add Data</h4>
                  <p className="text-gray-400 text-sm">Upload new files</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <ShieldIcon className="w-4 h-4" />
            Data updated automatically • For detailed analysis, visit the{" "}
            <Link href="/reports" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors flex items-center gap-1 group">
              Reports section
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}