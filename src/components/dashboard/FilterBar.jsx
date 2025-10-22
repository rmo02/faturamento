"use client"

import { Filter, X } from "lucide-react"
import { useData } from "../../context/DataContext"
import MultiSelectFilter from "./MultiSelectFilter"

export default function FilterBar() {
  const { filters, uniqueValues, updateFilters, resetFilters } = useData()

  const hasActiveFilters = Object.values(filters).some((value) => Array.isArray(value) && value.length > 0)

  return (
    <div className="relative z-10 rounded-xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-600 p-2.5 shadow-lg shadow-blue-600/30">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100">Filtros Avançados</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-lg bg-red-600/20 border border-red-600/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30 transition-all duration-200"
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <MultiSelectFilter
          label="Cliente"
          options={uniqueValues.clientes}
          selected={filters.CLIENTES}
          onChange={(selected) => updateFilters({ CLIENTES: selected })}
          color="cyan"
        />

        <MultiSelectFilter
          label="Executivo"
          options={uniqueValues.executivos}
          selected={filters.EXECUTIVO}
          onChange={(selected) => updateFilters({ EXECUTIVO: selected })}
          color="blue"
        />

        <MultiSelectFilter
          label="Período"
          options={uniqueValues.periodos}
          selected={filters.PERIODO}
          onChange={(selected) => updateFilters({ PERIODO: selected })}
          color="emerald"
        />

        <MultiSelectFilter
          label="Ano"
          options={uniqueValues.anos}
          selected={filters.ANO}
          onChange={(selected) => updateFilters({ ANO: selected })}
          color="amber"
        />

        <MultiSelectFilter
          label="Segmento"
          options={uniqueValues.segmentos}
          selected={filters.SEGMENTO}
          onChange={(selected) => updateFilters({ SEGMENTO: selected })}
          color="purple"
        />

        <MultiSelectFilter
          label="Veículo"
          options={uniqueValues.veiculos}
          selected={filters.VEICULOS}
          onChange={(selected) => updateFilters({ VEICULOS: selected })}
          color="rose"
        />
      </div>
    </div>
  )
}
