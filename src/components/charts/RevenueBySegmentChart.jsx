"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { getChartData, formatCurrency } from "../../utils/excelParser"

const COLORS = [
  "rgb(99 102 241)", // indigo
  "rgb(168 85 247)", // purple
  "rgb(236 72 153)", // pink
  "rgb(59 130 246)", // blue
  "rgb(16 185 129)", // emerald
  "rgb(20 184 166)", // teal
  "rgb(249 115 22)", // orange
  "rgb(234 179 8)", // yellow
  "rgb(239 68 68)", // red
  "rgb(244 63 94)", // rose
]

export default function RevenueBySegmentChart({ data }) {
  const chartData = getChartData(data, "SEGMENTO")
  const sortedData = chartData.sort((a, b) => b.total - a.total).slice(0, 10)

  return (
    <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Top 10 Segmentos</h3>
        <p className="text-sm text-muted-foreground mt-1">Maiores segmentos por faturamento</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 231 235)" opacity={0.3} />
          <XAxis
            type="number"
            stroke="rgb(148 163 184)"
            tick={{ fill: "rgb(100 116 139)", fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="rgb(148 163 184)"
            tick={{ fill: "rgb(100 116 139)", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(255 255 255)",
              border: "1px solid rgb(226 232 240)",
              borderRadius: "16px",
              color: "rgb(15 23 42)",
              padding: "16px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
            formatter={(value) => [formatCurrency(value), "Total"]}
            labelStyle={{ color: "rgb(71 85 105)", marginBottom: "8px", fontWeight: 700 }}
          />
          <Legend wrapperStyle={{ color: "rgb(100 116 139)", paddingTop: "20px", fontWeight: 600 }} iconType="circle" />
          <Bar dataKey="total" name="Total" radius={[0, 10, 10, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
