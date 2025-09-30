"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { formatCurrency } from "../../utils/excelParser"
import { TrendingUp } from "lucide-react"

export default function TopClientsChart({ data }) {
  // Agrupa por cliente e calcula o total
  const clientData = data.reduce((acc, item) => {
    const client = item.CLIENTES
    const permuta = typeof item.VALOR_PERMUTA === "number" ? item.VALOR_PERMUTA : 0
    const investimento = typeof item.VALOR_INVESTIMENTO === "number" ? item.VALOR_INVESTIMENTO : 0
    const total = permuta + investimento

    if (!acc[client]) {
      acc[client] = { name: client, total: 0 }
    }
    acc[client].total += total
    return acc
  }, {})

  // Converte para array e ordena pelos top 10
  const chartData = Object.values(clientData)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const colors = [
    "rgb(59 130 246)",
    "rgb(16 185 129)",
    "rgb(249 115 22)",
    "rgb(168 85 247)",
    "rgb(236 72 153)",
    "rgb(14 165 233)",
    "rgb(34 197 94)",
    "rgb(251 146 60)",
    "rgb(139 92 246)",
    "rgb(244 63 94)",
  ]

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Top 10 Clientes</h3>
          </div>
          <p className="text-sm text-muted-foreground">Maiores faturamentos por cliente</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(229 231 235)"
            opacity={0.5}
            horizontal={true}
            vertical={false}
          />
          <XAxis
            type="number"
            stroke="rgb(107 114 128)"
            tick={{ fill: "rgb(75 85 99)", fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="rgb(107 114 128)"
            tick={{ fill: "rgb(75 85 99)", fontSize: 11 }}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(255 255 255)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "12px",
              color: "rgb(17 24 39)",
              padding: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
            formatter={(value) => [formatCurrency(value), "Total"]}
            labelStyle={{ color: "rgb(75 85 99)", marginBottom: "8px", fontWeight: 600 }}
          />
          <Bar dataKey="total" radius={[0, 8, 8, 0]} maxBarSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
