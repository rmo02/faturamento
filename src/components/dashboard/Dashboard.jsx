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
import { Upload, Table, TrendingUp } from "lucide-react"
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
    <div className="space-y-8">
      {!rawData || rawData.length === 0 ? (
        <UploadSection />
      ) : (
        <>
          <div className="flex items-center justify-between bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-600 p-3 shadow-lg shadow-blue-600/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Dashboard de Faturamento</h2>
                <p className="text-sm text-slate-400 mt-0.5">Visualização e análise de dados em tempo real</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTable(!showTable)}
                className="group flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
              >
                <Table className="h-4 w-4" />
                {showTable ? "Ocultar Tabela" : "Ver Tabela"}
              </button>
              <button
                onClick={handleNewUpload}
                className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200"
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
            <div className="space-y-4 bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-1 w-1 rounded-full bg-blue-500" />
                <h3 className="text-xl font-semibold text-slate-100">Dados Detalhados</h3>
              </div>
              <DataTable data={filteredData} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
