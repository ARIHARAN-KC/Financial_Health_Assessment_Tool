"use client";

import { useEffect, useState } from "react";
import {
  Download,
  FileText,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Shield,
  Clock,
  RefreshCw,
  Share2,
  Printer,
  FileSpreadsheet,
  Filter,
  DollarSign,
  TrendingDown,
  PieChart,
  Scale,
  LineChart,
  Target,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";

const API_URL = "http://localhost:8000/reports";

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch report");

      const data = await res.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading financial report...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Financial Health Report
            </h1>
            <p className="text-gray-400 text-sm">
              AI-generated insights based on your data
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={fetchReport} className="btn-secondary">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="btn-secondary">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary */}
      <section className="glass p-6 rounded-2xl border border-gray-800/50">
        <div className="flex justify-between">
          <div>
            <h2 className="text-white font-semibold">Report Summary</h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Generated: {report.summary.generated_at}
            </p>
          </div>
          <div className="flex gap-2">
            <Share2 />
            <Printer />
            <FileSpreadsheet />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${report.metrics.revenue.toLocaleString()}`}
          icon={<DollarSign className="text-green-400" />}
          trend={report.metrics.revenue_growth}
        />
        <MetricCard
          title="Total Expenses"
          value={`$${report.metrics.expenses.toLocaleString()}`}
          icon={<TrendingDown className="text-red-400" />}
          trend={report.metrics.expense_change}
        />
        <MetricCard
          title="Profit Margin"
          value={`${report.metrics.profit_margin}%`}
          icon={<PieChart className="text-blue-400" />}
          trend={report.metrics.profit_trend}
        />
        <MetricCard
          title="Debt-to-Revenue"
          value={report.metrics.debt_to_revenue}
          icon={<Scale className="text-yellow-400" />}
          trend={report.metrics.debt_change}
        />
      </div>

      {/* Health */}
      <section className="glass p-6 rounded-2xl border border-gray-800/50">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-green-400" />
          <h2 className="text-white font-semibold">
            Overall Financial Health
          </h2>
        </div>
        <p className="text-gray-300">
          Status:
          <span className="ml-2 text-green-400 font-medium">
            {report.summary.status}
          </span>
        </p>
        <p className="text-gray-400 mt-2">
          {report.summary.description}
        </p>
      </section>

      {/* Risks */}
      <section className="glass p-6 rounded-2xl border border-gray-800/50">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-yellow-400" />
          <h2 className="text-white font-semibold">Key Risks</h2>
        </div>

        <ul className="space-y-3">
          {report.risks.map((risk: any, idx: number) => (
            <li key={idx} className="text-gray-300">
              <AlertCircle className="inline w-4 h-4 text-yellow-400 mr-2" />
              <strong>{risk.title}:</strong>{" "}
              <span className="text-gray-400">{risk.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommendations */}
      <section className="glass p-6 rounded-2xl border border-gray-800/50">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-blue-400" />
          <h2 className="text-white font-semibold">AI Recommendations</h2>
        </div>

        <div className="space-y-4">
          {report.recommendations.map((rec: any) => (
            <div key={rec.priority} className="flex gap-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                {rec.priority}
              </div>
              <div>
                <p className="text-gray-300 font-medium">{rec.title}</p>
                <p className="text-gray-400 text-sm">
                  Impact: {rec.impact} • Timeline: {rec.timeline}
                </p>
              </div>
              <ArrowRight className="text-gray-500 ml-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="p-4 text-gray-400 text-sm border border-gray-800/50 rounded-xl">
        <Shield className="inline w-4 h-4 mr-2" />
        AI-generated report. Consult a financial advisor before decisions.
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
          <Zap className="w-3 h-3" />
          Report ID: {report.summary.report_id}
        </div>
      </div>
    </div>
  );
}

/* ===================== */

function MetricCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
}) {
  const color = trend && trend > 0 ? "text-green-400" : "text-red-400";
  const sign = trend && trend > 0 ? "+" : "";

  return (
    <div className="glass p-5 rounded-2xl border border-gray-800/50">
      <div className="flex justify-between mb-3">
        {icon}
        {trend !== undefined && (
          <span className={`text-sm ${color}`}>
            {sign}{trend}%
          </span>
        )}
      </div>
      <p className="text-gray-400 text-xs">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
}
