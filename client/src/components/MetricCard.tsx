export default function MetricCard({ title, value, trend, description, icon }: any) {
  const getTrendColor = () => {
    if (!trend) return "text-gray-400";
    return trend > 0 ? "text-green-400" : "text-red-400";
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? "↗" : "↘";
  };

  const formatValue = (val: any) => {
    if (typeof val === "number") {
      // Format numbers with commas
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className="glass rounded-2xl p-6 border border-gray-800/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden">
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">{title}</p>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          
          {/* Icon or trend indicator */}
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="p-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg">
                <span className="text-cyan-400">{icon}</span>
              </div>
            )}
            {trend !== undefined && (
              <div className={`flex items-center text-sm font-medium ${getTrendColor()}`}>
                <span className="mr-1">{getTrendIcon()}</span>
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Value */}
        <p className="text-3xl md:text-4xl font-bold text-white mb-2">
          {formatValue(value)}
        </p>

        {/* Progress bar (optional) */}
        {trend !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Last month</span>
              <span>This month</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  trend > 0 ? "bg-gradient-to-r from-green-500 to-cyan-500" : "bg-gradient-to-r from-red-500 to-orange-500"
                }`}
                style={{ width: `${Math.min(Math.abs(trend) * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-blue-500/0 group-hover:via-cyan-500 group-hover:to-blue-500 transition-all duration-300"></div>
      </div>
    </div>
  );
}