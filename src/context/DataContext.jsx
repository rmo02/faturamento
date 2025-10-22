"use client"

import { createContext, useContext, useState } from "react"
import { parseExcelFile, filterData, calculateMetrics, getUniqueValues } from "../utils/excelParser"

const DataContext = createContext()

export function DataProvider({ children }) {
  const [rawData, setRawData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    CLIENTES: [],
    EXECUTIVO: [],
    PERIODO: [],
    ANO: [],
    SEGMENTO: [],
    VEICULOS: [],
  })

  const handleFileUpload = async (file) => {
    setLoading(true)
    setError(null)

    try {
      const parsedData = await parseExcelFile(file)
      setRawData(parsedData)
      setFilteredData(parsedData)
      console.log("Dados carregados:", parsedData.length, "registros")
    } catch (err) {
      setError("Erro ao processar o arquivo. Verifique se o formato está correto.")
      console.error("Erro ao processar Excel:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    const filtered = filterData(rawData, updatedFilters)
    setFilteredData(filtered)
  }

  const resetFilters = () => {
    const defaultFilters = {
      CLIENTES: [],
      EXECUTIVO: [],
      PERIODO: [],
      ANO: [],
      SEGMENTO: [],
      VEICULOS: [],
    }
    setFilters(defaultFilters)
    setFilteredData(rawData)
  }

  const metrics = calculateMetrics(filteredData)

  const uniqueValues = {
    clientes: getUniqueValues(rawData, "CLIENTES"),
    executivos: getUniqueValues(rawData, "EXECUTIVO"),
    periodos: getUniqueValues(rawData, "PERIODO"),
    anos: getUniqueValues(rawData, "ANO"),
    segmentos: getUniqueValues(rawData, "SEGMENTO"),
    veiculos: getUniqueValues(rawData, "VEICULOS"),
  }

  return (
    <DataContext.Provider
      value={{
        rawData,
        filteredData,
        loading,
        error,
        filters,
        metrics,
        uniqueValues,
        handleFileUpload,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}
