export default function MetricCard({ title, value, icon: Icon, subtitle, color = "default" }) {
  const colorClasses = {
    default: "bg-blue-600/90 text-white shadow-blue-600/40",
    blue: "bg-blue-600/90 text-white shadow-blue-600/40",
    yellow: "bg-amber-600/90 text-white shadow-amber-600/40",
    green: "bg-emerald-600/90 text-white shadow-emerald-600/40",
    purple: "bg-purple-600/90 text-white shadow-purple-600/40",
    orange: "bg-orange-600/90 text-white shadow-orange-600/40",
    pink: "bg-rose-600/90 text-white shadow-rose-600/40",
    indigo: "bg-indigo-600/90 text-white shadow-indigo-600/40",
  }

  return (
    <div className="group relative rounded-xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm p-5 shadow-lg hover:shadow-xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="space-y-0.5">
            <p className="text-2xl lg:text-2xl font-bold text-slate-100 tracking-tight break-words leading-tight">
              {value}
            </p>
            {subtitle && <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>}
          </div>
        </div>
        {Icon && (
          <div
            className={`rounded-lg p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0 ${colorClasses[color]}`}
          >
            <Icon className="h-5 w-5" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  )
}
