"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { formatCurrency } from "../../utils/excelParser"
import { PieChartIcon } from "lucide-react"

export default function SegmentDistributionChart({ data }) {
  // Agrupa por segmento
  const segmentData = data.reduce((acc, item) => {
    const segment = item.SEGMENTO || "Não especificado"
    const permuta = typeof item.VALOR_PERMUTA === "number" ? item.VALOR_PERMUTA : 0
    const investimento = typeof item.VALOR_INVESTIMENTO === "number" ? item.VALOR_INVESTIMENTO : 0
    const total = permuta + investimento

    if (!acc[segment]) {
      acc[segment] = { name: segment, value: 0 }
    }
    acc[segment].value += total
    return acc
  }, {})

  const chartData = Object.values(segmentData).sort((a, b) => b.value - a.value)

  const COLORS = [
    "rgb(59 130 246)",
    "rgb(16 185 129)",
    "rgb(249 115 22)",
    "rgb(168 85 247)",
    "rgb(236 72 153)",
    "rgb(14 165 233)",
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, item) => sum + item.value, 0)
      const percentage = ((payload[0].value / total) * 100).toFixed(1)

      return (
        <div className="rounded-xl bg-white border border-border p-4 shadow-xl">
          <p className="font-semibold text-foreground mb-2">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)} ({percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl bg-primary/10 p-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Distribuição por Segmento</h3>
        </div>
        <p className="text-sm text-muted-foreground">Participação de cada segmento no faturamento</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
