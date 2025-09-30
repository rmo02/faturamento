"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, Download, Table2 } from "lucide-react"
import { formatCurrency } from "../../utils/excelParser"
import * as XLSX from "xlsx"

export default function DataTable({ data }) {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const parseValue = (value) => {
    // Se o valor já for um número, retorne-o.
    if (typeof value === "number") {
      return value
    }
    // Se for uma string, tente converter. Caso contrário, retorne 0.
    if (typeof value === "string") {
      const numberValue = Number.parseFloat(value.replace(/[^\d,.-]/g, "").replace(",", "."))
      return isNaN(numberValue) ? 0 : numberValue
    }
    return 0
  }

  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.CLIENTES?.toLowerCase().includes(searchLower) ||
      item.EXECUTIVO?.toLowerCase().includes(searchLower) ||
      item.VEICULOS?.toLowerCase().includes(searchLower) ||
      item.SEGMENTO?.toLowerCase().includes(searchLower)
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "VALOR_PERMUTA" || sortField === "VALOR_INVESTIMENTO") {
      aValue = parseValue(aValue)
      bValue = parseValue(bValue)
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Dados")
    XLSX.writeFile(wb, `faturamento_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    )
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-xl overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Table2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Dados Detalhados</h3>
              <p className="text-sm text-muted-foreground">Visualize e exporte todos os registros</p>
            </div>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Exportar Excel
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente, executivo, veículo ou segmento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 backdrop-blur-sm">
            <tr>
              <th
                onClick={() => handleSort("CLIENTES")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Cliente <SortIcon field="CLIENTES" />
              </th>
              <th
                onClick={() => handleSort("VEICULOS")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Veículo <SortIcon field="VEICULOS" />
              </th>
              <th
                onClick={() => handleSort("EXECUTIVO")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Executivo <SortIcon field="EXECUTIVO" />
              </th>
              <th
                onClick={() => handleSort("PERIODO")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Período <SortIcon field="PERIODO" />
              </th>
              <th
                onClick={() => handleSort("ANO")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Ano <SortIcon field="ANO" />
              </th>
              <th
                onClick={() => handleSort("SEGMENTO")}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Segmento <SortIcon field="SEGMENTO" />
              </th>
              <th
                onClick={() => handleSort("VALOR_PERMUTA")}
                className="px-6 py-4 text-right text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Permuta <SortIcon field="VALOR_PERMUTA" />
              </th>
              <th
                onClick={() => handleSort("VALOR_INVESTIMENTO")}
                className="px-6 py-4 text-right text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
              >
                Investimento <SortIcon field="VALOR_INVESTIMENTO" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground font-medium">{row.CLIENTES}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.VEICULOS}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.EXECUTIVO}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.PERIODO}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.ANO}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.SEGMENTO}</td>
                <td className="px-6 py-4 text-sm text-foreground text-right font-semibold">
                  {formatCurrency(parseValue(row.VALOR_PERMUTA))}
                </td>
                <td className="px-6 py-4 text-sm text-foreground text-right font-semibold">
                  {formatCurrency(parseValue(row.VALOR_INVESTIMENTO))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-border/50 bg-gradient-to-r from-muted/30 to-muted/10 flex items-center justify-between">
        <div className="text-sm text-muted-foreground font-medium">
          Mostrando <span className="text-foreground font-semibold">{startIndex + 1}</span> a{" "}
          <span className="text-foreground font-semibold">
            {Math.min(startIndex + itemsPerPage, sortedData.length)}
          </span>{" "}
          de <span className="text-foreground font-semibold">{sortedData.length}</span> registros
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
          >
            Anterior
          </button>
          <div className="text-sm text-foreground font-semibold px-4 py-2 rounded-lg bg-primary/10">
            Página {currentPage} de {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}
