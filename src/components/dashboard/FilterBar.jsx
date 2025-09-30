"use client"

import { Filter, X } from "lucide-react"
import { useData } from "../../context/DataContext"
import MultiSelectFilter from "./MultiSelectFilter"

export default function FilterBar() {
  const { filters, uniqueValues, updateFilters, resetFilters } = useData()

  const hasActiveFilters = Object.values(filters).some((value) => Array.isArray(value) && value.length > 0)

  return (
    <div className="relative z-10 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Filter className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Filtros Avançados</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-all duration-200"
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
