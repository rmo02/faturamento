export default function MetricCard({ title, value, icon: Icon, subtitle, color = "default" }) {
  const colorClasses = {
    default: "bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-600 shadow-blue-500/20",
    blue: "bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-600 shadow-blue-500/20",
    yellow: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 text-yellow-600 shadow-yellow-500/20",
    green: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 text-emerald-600 shadow-emerald-500/20",
    purple: "bg-gradient-to-br from-purple-500/10 to-purple-600/5 text-purple-600 shadow-purple-500/20",
    orange: "bg-gradient-to-br from-orange-500/10 to-orange-600/5 text-orange-600 shadow-orange-500/20",
    pink: "bg-gradient-to-br from-pink-500/10 to-pink-600/5 text-pink-600 shadow-pink-500/20",
    indigo: "bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 text-indigo-600 shadow-indigo-500/20",
  }

  return (
    <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="space-y-1">
            <p className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight break-words leading-tight">
              {value}
            </p>
            {subtitle && <p className="text-xs text-muted-foreground/80 mt-2">{subtitle}</p>}
          </div>
        </div>
        {Icon && (
          <div
            className={`rounded-xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0 ${colorClasses[color]}`}
          >
            <Icon className="h-7 w-7" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  )
}
