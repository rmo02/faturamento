"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getChartData, formatCurrency } from "../../utils/excelParser"

export default function RevenueByExecutiveChart({ data }) {
  const chartData = getChartData(data, "EXECUTIVO")

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Faturamento por Executivo</h3>
        <p className="text-sm text-muted-foreground mt-1">Comparativo de permuta vs investimento</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPermuta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity={1} />
              <stop offset="100%" stopColor="rgb(96 165 250)" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="colorInvestimento" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity={1} />
              <stop offset="100%" stopColor="rgb(52 211 153)" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 231 235)" opacity={0.8} />
          <XAxis
            dataKey="name"
            stroke="rgb(107 114 128)"
            tick={{ fill: "rgb(75 85 99)", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="rgb(107 114 128)"
            tick={{ fill: "rgb(75 85 99)", fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
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
            formatter={(value) => [formatCurrency(value), ""]}
            labelStyle={{ color: "rgb(75 85 99)", marginBottom: "8px", fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ color: "rgb(75 85 99)", paddingTop: "20px" }} iconType="circle" />
          <Bar dataKey="permuta" fill="url(#colorPermuta)" name="Permuta" radius={[8, 8, 0, 0]} maxBarSize={60} />
          <Bar
            dataKey="investimento"
            fill="url(#colorInvestimento)"
            name="Investimento"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
