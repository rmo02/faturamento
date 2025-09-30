"use client"

import { useData } from "../../context/DataContext"
import UploadSection from "./UploadSection"
import MetricsGrid from "./MetricsGrid"
import FilterBar from "./FilterBar"
import RevenueByExecutiveChart from "../charts/RevenueByExecutiveChart"
import RevenueByPeriodChart from "../charts/RevenueByPeriodChart"
import RevenueBySegmentChart from "../charts/RevenueBySegmentChart"
import TopClientsChart from "../charts/TopClientsChart"
import DataTable from "../table/DataTable"
import { Upload, Table } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const { rawData, filteredData, metrics, handleFileUpload } = useData()
  const [showTable, setShowTable] = useState(false)

  const handleNewUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".xlsx,.xls"
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      {!rawData || rawData.length === 0 ? (
        <UploadSection />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard de Faturamento</h2>
              <p className="text-muted-foreground mt-1">Visualização e análise de dados</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTable(!showTable)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Table className="h-4 w-4" />
                {showTable ? "Ocultar Tabela" : "Ver Tabela"}
              </button>
              <button
                onClick={handleNewUpload}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Novo Upload
              </button>
            </div>
          </div>

          <FilterBar />
          <MetricsGrid metrics={metrics} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueByExecutiveChart data={filteredData} />
            <RevenueByPeriodChart data={filteredData} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueBySegmentChart data={filteredData} />
            <TopClientsChart data={filteredData} />
          </div>

          {showTable && (
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Dados Detalhados</h3>
              <DataTable data={filteredData} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
