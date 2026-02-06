"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CompliancePage() {
  const [complianceData, setComplianceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompliance();
  }, []);

  const fetchCompliance = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/compliance");
      setComplianceData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load compliance data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "compliant":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "partially compliant":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "non-compliant":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Checking compliance status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Compliance Status</h1>
          </div>
          <p className="text-gray-400">GST and tax compliance assessment</p>
        </div>

        {error ? (
          <div className="glass p-6 rounded-xl border border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-semibold text-white">Error</h2>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchCompliance}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : complianceData ? (
          <div className="space-y-6">
            {/* Main Compliance Card */}
            <div className="glass rounded-2xl p-6 border border-gray-800/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">GST Filing Status</h2>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStatusColor(complianceData.gst_filing_status)}`}>
                    {complianceData.gst_filing_status || "Unknown"}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Report ID</p>
                  <p className="text-cyan-400 font-mono">{complianceData.report_id}</p>
                </div>
              </div>

              {/* Risk Level */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Compliance Risk</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  complianceData.compliance_risk === "High"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : complianceData.compliance_risk === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}>
                  {complianceData.compliance_risk} Risk
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Assessment Notes
                </h3>
                <p className="text-gray-300">{complianceData.notes}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-2xl p-6 border border-gray-800/50">
              <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Regular Filing</h3>
                    <p className="text-gray-400 text-sm">
                      Ensure timely filing of GST returns to avoid penalties and interest charges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Accurate Reporting</h3>
                    <p className="text-gray-400 text-sm">
                      Maintain accurate records and reconcile regularly with bank statements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Professional Consultation</h3>
                    <p className="text-gray-400 text-sm">
                      Consider consulting with a tax professional for complex compliance matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Compliance Data</h2>
            <p className="text-gray-400 mb-6">
              Upload financial data to generate compliance assessment.
            </p>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Upload Data
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}