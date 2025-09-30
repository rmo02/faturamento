"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getChartData, formatCurrency } from "../../utils/excelParser"

export default function RevenueByPeriodChart({ data }) {
  const chartData = getChartData(data, "PERIODO")

  const monthOrder = [
    "JAN",
    "FEV",
    "FEB",
    "MAR",
    "ABR",
    "APR",
    "MAI",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "AUG",
    "SET",
    "SEP",
    "OUT",
    "OCT",
    "NOV",
    "DEZ",
    "DEC",
  ]
  const sortedData = chartData.sort((a, b) => {
    const aIndex = monthOrder.findIndex((m) => a.name.toUpperCase().includes(m))
    const bIndex = monthOrder.findIndex((m) => b.name.toUpperCase().includes(m))
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Evolução do Faturamento</h3>
        <p className="text-sm text-muted-foreground mt-1">Tendência mensal de receitas</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Line
            type="monotone"
            dataKey="total"
            stroke="rgb(59 130 246)"
            strokeWidth={3}
            name="Total"
            dot={{ fill: "rgb(59 130 246)", r: 5, strokeWidth: 2, stroke: "rgb(255 255 255)" }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="permuta"
            stroke="rgb(249 115 22)"
            strokeWidth={2}
            name="Permuta"
            dot={{ fill: "rgb(249 115 22)", r: 4 }}
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="investimento"
            stroke="rgb(16 185 129)"
            strokeWidth={2}
            name="Investimento"
            dot={{ fill: "rgb(16 185 129)", r: 4 }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
