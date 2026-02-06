"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
    TrendingUp,
    LineChart,
    Calendar,
    Target,
    RefreshCw,
    AlertTriangle,
    Loader2,
    ArrowUpRight,
    DollarSign,
    BarChart3,
    Clock,
} from "lucide-react";

export default function ForecastPage() {
    const [forecastData, setForecastData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchForecast();
    }, []);

    const fetchForecast = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/forecast");
            setForecastData(res.data);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to load forecast data");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Generating revenue forecast...</p>
                </div>
            </div>
        );
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-8 h-8 text-purple-400" />
                        <h1 className="text-3xl font-bold text-white">Revenue Forecast</h1>
                    </div>
                    <p className="text-gray-400">AI-powered revenue predictions based on historical data</p>
                </div>

                {error ? (
                    <div className="glass p-6 rounded-xl border border-red-500/30">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                            <h2 className="text-xl font-semibold text-white">Error</h2>
                        </div>
                        <p className="text-red-400 mb-4">{error}</p>
                        {error.includes("Not enough data") && (
                            <div className="mb-4 p-4 bg-yellow-500/10 rounded-lg">
                                <p className="text-yellow-400">
                                    <strong>Tip:</strong> Upload at least 3 months of financial data to generate accurate forecasts.
                                </p>
                            </div>
                        )}
                        <button
                            onClick={fetchForecast}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                ) : forecastData?.forecast ? (
                    <div className="space-y-6">
                        {/* Forecast Overview */}
                        <div className="glass rounded-2xl p-6 border border-gray-800/50">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">6-Month Revenue Forecast</h2>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>Based on historical trends</span>
                                </div>
                            </div>

                            {/* Forecast Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                                {Object.entries(forecastData.forecast).map(([month, value]) => (
                                    <div
                                        key={month}
                                        className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-xl p-4 text-center hover:border-purple-500/40 hover:scale-105 transition-all duration-300 group"
                                    >
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/20 transition-colors">
                                            <DollarSign className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <p className="text-gray-400 text-sm mb-1">{month.replace('_', ' ')}</p>
                                        <p className="text-white font-bold text-lg">{formatCurrency(value as number)}</p>
                                        <div className="flex items-center justify-center mt-2">
                                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                                            <span className="text-green-400 text-sm ml-1">+2%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Visualization */}
                            <div className="bg-gray-900/50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                                        <LineChart className="w-5 h-5 text-cyan-400" />
                                        Trend Visualization
                                    </h3>
                                    <span className="text-sm text-gray-400">Monthly projections</span>
                                </div>
                                <div className="h-48 flex items-end space-x-2">
                                    {Object.entries(forecastData.forecast).map(([key, value], index) => {
                                        const values = Object.values(forecastData.forecast) as number[];
                                        const maxValue = Math.max(...values);
                                        const height = (value as number / maxValue) * 100;

                                        return (
                                            <div key={key} className="flex-1 flex flex-col items-center">
                                                <div
                                                    className="w-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-lg transition-all duration-500"
                                                    style={{ height: `${height}%` }}
                                                />
                                                <span className="text-gray-400 text-xs mt-2">M{index + 1}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass rounded-2xl p-6 border border-gray-800/50">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-green-400" />
                                    Key Insights
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Steady revenue growth projected over next 6 months</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Average monthly growth rate: 2%</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Consider seasonal adjustments for more accurate predictions</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass rounded-2xl p-6 border border-gray-800/50">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    Recommendations
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Use forecasts for budgeting and resource planning</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Update data regularly for improved accuracy</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                                        <span className="text-gray-300">Consider market trends and external factors</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Report Info */}
                        {forecastData.report_id && (
                            <div className="glass rounded-xl p-4 border border-gray-800/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-400 text-sm">Report ID: {forecastData.report_id}</span>
                                    </div>
                                    <button
                                        onClick={fetchForecast}
                                        className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="glass rounded-2xl p-8 text-center">
                        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">Insufficient Data</h2>
                        <p className="text-gray-400 mb-4">
                            Upload at least 3 months of financial data to generate accurate revenue forecasts.
                        </p>
                        <div className="space-y-3 max-w-md mx-auto">
                            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                                <Calendar className="w-5 h-5 text-cyan-400" />
                                <div className="text-left">
                                    <p className="text-white font-medium">Minimum 3 months data required</p>
                                    <p className="text-gray-400 text-sm">Monthly revenue records needed</p>
                                </div>
                            </div>
                            <a
                                href="/upload"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                            >
                                Upload More Data
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}