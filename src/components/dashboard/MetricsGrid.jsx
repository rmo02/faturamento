import { DollarSign, TrendingUp, Users, Briefcase, FileText, Repeat, Tv } from "lucide-react"
import MetricCard from "./MetricCard"
import { formatCurrency, formatNumber } from "../../utils/excelParser"

export default function MetricsGrid({ metrics }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MetricCard
        title="Faturamento Total"
        value={formatCurrency(metrics.totalGeral)}
        icon={DollarSign}
        subtitle="Permuta + Investimento"
        trend={metrics.totalGeral > 0 ? "up" : "neutral"}
        color="green"
      />
      <MetricCard
        title="Valor Permuta"
        value={formatCurrency(metrics.totalPermuta)}
        icon={Repeat}
        subtitle={`${((metrics.totalPermuta / metrics.totalGeral) * 100 || 0).toFixed(1)}% do total`}
        trend="neutral"
        color="blue"
      />
      <MetricCard
        title="Valor Investimento"
        value={formatCurrency(metrics.totalInvestimento)}
        icon={TrendingUp}
        subtitle={`${((metrics.totalInvestimento / metrics.totalGeral) * 100 || 0).toFixed(1)}% do total`}
        trend="neutral"
        color="orange"
      />
      <MetricCard
        title="Total de Clientes"
        value={formatNumber(metrics.totalClientes)}
        icon={Users}
        subtitle="Clientes únicos"
        color="purple"
      />
      <MetricCard
        title="Total de Veículos"
        value={formatNumber(metrics.totalVeiculos)}
        icon={Tv}
        subtitle="Veículos únicos"
        color="pink"
      />
      <MetricCard
        title="Executivos Ativos"
        value={formatNumber(metrics.totalExecutivos)}
        icon={Briefcase}
        subtitle="Equipe de vendas"
        color="indigo"
      />
      <MetricCard
        title="Total de Registros"
        value={formatNumber(metrics.totalRegistros)}
        icon={FileText}
        subtitle="Transações"
        color="yellow"
      />
    </div>
  )
}
