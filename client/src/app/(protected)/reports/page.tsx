"use client";

import { 
  Download, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Brain,
  BarChart3,
  Shield,
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingDown,
  PieChart,
  Building,
  Scale,
  LineChart,
  Target,
  Lightbulb,
  AlertCircle,
  Calendar,
  Users,
  Coins,
  Wallet,
  RefreshCw,
  Share2,
  Printer,
  FileSpreadsheet,
  Filter
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Financial Health Report
            </h1>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              AI-generated insights based on your financial data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group">
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group">
            <Filter className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            <span className="relative">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Summary */}
      <div className="glass rounded-2xl p-6 border border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              Report Summary
            </h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Generated: {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group">
              <Share2 className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group">
              <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 group">
              <FileSpreadsheet className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue" 
          value="$450,000" 
          icon={<DollarSign className="w-5 h-5 text-green-400" />}
          trend={12.5}
          description="Year-over-year growth"
        />
        <MetricCard 
          title="Total Expenses" 
          value="$319,000" 
          icon={<TrendingDown className="w-5 h-5 text-red-400" />}
          trend={-5.2}
          description="Quarter-over-quarter change"
        />
        <MetricCard 
          title="Profit Margin" 
          value="29.1%" 
          icon={<PieChart className="w-5 h-5 text-blue-400" />}
          trend={3.1}
          description="Net profit percentage"
        />
        <MetricCard 
          title="Debt-to-Revenue" 
          value="0.26" 
          icon={<Scale className="w-5 h-5 text-yellow-400" />}
          trend={-2.4}
          description="Healthy debt ratio"
        />
      </div>

      {/* Overall Financial Health */}
      <section className="glass rounded-2xl border border-gray-800/50 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Overall Financial Health</h2>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">Healthy</span> • Updated today
            </p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Your business is in a <strong className="text-green-400">healthy financial position</strong> with
          strong profitability and sufficient working capital. The current
          profit margin reflects efficient cost management, while liquidity
          levels are adequate to meet short-term obligations. 
          <span className="block mt-2 text-gray-400">
            Revenue growth shows a positive trend with consistent quarter-over-quarter improvements.
          </span>
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Strong cash flow</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Optimal liquidity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span>Low debt burden</span>
          </div>
        </div>
      </section>

      {/* Key Risks */}
      <section className="glass rounded-2xl border border-gray-800/50 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Key Financial Risks</h2>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Moderate Risk Level</span> • Monitor regularly
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-300 font-medium">Moderate debt levels</p>
              <p className="text-gray-400 text-sm">Should be reduced gradually to improve financial flexibility</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-300 font-medium">Cash flow pressure</p>
              <p className="text-gray-400 text-sm">Potential from delayed receivables averaging 45 days</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-300 font-medium">Revenue concentration</p>
              <p className="text-gray-400 text-sm">Dependency on stable revenue streams needs diversification</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Recommendations */}
      <section className="glass rounded-2xl border border-gray-800/50 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">AI Recommendations</h2>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">Actionable Insights</span> • Priority sorted
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded flex items-center justify-center mt-0.5">
              <span className="text-sm text-white">1</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 font-medium group-hover:text-cyan-300 transition-colors">
                Introduce a business line of credit for short-term liquidity
              </p>
              <p className="text-gray-400 text-sm mt-1">Estimated impact: High • Timeline: 30 days</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center mt-0.5">
              <span className="text-sm text-white">2</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 font-medium group-hover:text-purple-300 transition-colors">
                Gradually reduce outstanding debt to improve flexibility
              </p>
              <p className="text-gray-400 text-sm mt-1">Estimated impact: Medium • Timeline: 90 days</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded flex items-center justify-center mt-0.5">
              <span className="text-sm text-white">3</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 font-medium group-hover:text-green-300 transition-colors">
                Negotiate supplier contracts to optimize operating costs
              </p>
              <p className="text-gray-400 text-sm mt-1">Estimated impact: High • Timeline: 60 days</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded flex items-center justify-center mt-0.5">
              <span className="text-sm text-white">4</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 font-medium group-hover:text-yellow-300 transition-colors">
                Automate bookkeeping and GST reconciliation
              </p>
              <p className="text-gray-400 text-sm mt-1">Estimated impact: Medium • Timeline: 45 days</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded flex items-center justify-center mt-0.5">
              <span className="text-sm text-white">5</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 font-medium group-hover:text-indigo-300 transition-colors">
                Prepare quarterly investor-ready financial reports
              </p>
              <p className="text-gray-400 text-sm mt-1">Estimated impact: Low • Timeline: Ongoing</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="glass rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg">
              <LineChart className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Growth Indicators</h2>
              <p className="text-sm text-gray-400">Performance metrics and trends</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Quarterly Growth</span>
              <span className="text-green-400 font-medium">+8.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Customer Acquisition</span>
              <span className="text-blue-400 font-medium">+15.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Market Share</span>
              <span className="text-purple-400 font-medium">+3.4%</span>
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Performance Goals</h2>
              <p className="text-sm text-gray-400">Quarterly targets and achievements</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Revenue Target</span>
              <span className="text-green-400 font-medium">92% achieved</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Cost Reduction</span>
              <span className="text-red-400 font-medium">45% achieved</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Profit Goal</span>
              <span className="text-yellow-400 font-medium">78% achieved</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/50 rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-gray-300 text-sm">
              <span className="font-medium">Disclaimer:</span> This report is AI-generated and intended for decision support. 
              The analysis is based on provided financial data and statistical models. Please consult a 
              certified financial advisor before making critical business decisions.
            </p>
            <p className="text-gray-500 text-xs mt-2 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Report ID: FIN-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon,
  trend,
  description 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  trend?: number;
  description?: string;
}) {
  const trendColor = trend && trend > 0 ? 'text-green-400' : 'text-red-400';
  const trendIcon = trend && trend > 0 ? '+' : '';

  return (
    <div className="glass rounded-2xl border border-gray-800/50 p-5 hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-gray-900/50 rounded-lg">
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon}{trend}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{value}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
}