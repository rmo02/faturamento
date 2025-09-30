"use client"

import { useData } from "../context/DataContext"
import MetricsGrid from "../components/dashboard/MetricsGrid"
import FilterBar from "../components/dashboard/FilterBar"
import UploadSection from "../components/dashboard/UploadSection"
import RevenueByExecutiveChart from "../components/charts/RevenueByExecutiveChart"
import RevenueByPeriodChart from "../components/charts/RevenueByPeriodChart"
import TopClientsChart from "../components/charts/TopClientsChart"
import SegmentDistributionChart from "../components/charts/SegmentDistributionChart"
import DataTable from "../components/table/DataTable"

export default function Home() {
  const { filteredData, metrics } = useData()

  if (filteredData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <UploadSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Dashboard de Faturamento</h1>
          <p className="text-lg text-muted-foreground">Análise completa de receitas e performance</p>
        </div>

        <FilterBar />
        <MetricsGrid metrics={metrics} />

        <div className="grid gap-8 lg:grid-cols-2">
          <RevenueByExecutiveChart data={filteredData} />
          <RevenueByPeriodChart data={filteredData} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <TopClientsChart data={filteredData} />
          <SegmentDistributionChart data={filteredData} />
        </div>

        <DataTable data={filteredData} />
      </div>
    </div>
  )
}
