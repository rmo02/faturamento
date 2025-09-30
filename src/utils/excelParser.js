import * as XLSX from "xlsx"

function parseCurrency(value) {
  if (typeof value === "number") {
    return value
  }
  if (typeof value !== "string" || !value) {
    return 0
  }

  // Remove tudo que não for dígito, vírgula ou ponto. Ex: "R$ 1.234,56" -> "1.234,56"
  let cleanedValue = value.replace(/[^\d,.-]/g, "")

  // Verifica se o último separador é uma vírgula (padrão BR)
  const lastComma = cleanedValue.lastIndexOf(",")
  const lastDot = cleanedValue.lastIndexOf(".")

  // Se a vírgula vem depois do último ponto, é um decimal brasileiro. Ex: "1.234,56"
  if (lastComma > lastDot) {
    cleanedValue = cleanedValue.replace(/\./g, "").replace(",", ".") // Remove pontos de milhar e troca vírgula por ponto
  }

  const numberValue = Number.parseFloat(cleanedValue)
  return isNaN(numberValue) ? 0 : numberValue
}

export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: "array" })

        const allData = []

        // Iterar por todas as abas (sheets) - cada aba é um executivo
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName]
          // raw: true para ler valores brutos (números em vez de texto formatado)
          const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true, defval: "" })

          const headers = [
            "CLIENTES",
            "VEICULOS",
            "EXECUTIVO",
            "PERIODO",
            "ANO",
            "SEGMENTO",
            "VALOR_PERMUTA",
            "VALOR_INVESTIMENTO",
          ]
          const jsonData = sheetData.slice(1).map((row) => {
            const rowData = {}
            headers.forEach((header, index) => {
              rowData[header] = row[index]
            })
            return rowData
          })

          // Adicionar o nome do executivo (nome da aba) a cada registro
          const dataWithExecutive = jsonData.map((row) => ({
            ...row,
            EXECUTIVO: row.EXECUTIVO || sheetName, // Usa o nome da aba se não houver coluna EXECUTIVO
          }))

          allData.push(...dataWithExecutive)
        })

        resolve(allData)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

function sortMonths(months) {
  const monthOrder = {
    JANEIRO: 1,
    FEVEREIRO: 2,
    MARÇO: 3,
    ABRIL: 4,
    MAIO: 5,
    JUNHO: 6,
    JULHO: 7,
    AGOSTO: 8,
    SETEMBRO: 9,
    OUTUBRO: 10,
    NOVEMBRO: 11,
    DEZEMBRO: 12,
  }

  return months.sort((a, b) => {
    const orderA = monthOrder[a?.toUpperCase()] || 999
    const orderB = monthOrder[b?.toUpperCase()] || 999
    return orderA - orderB
  })
}

export function getUniqueValues(data, field) {
  const values = data.map((item) => item[field]).filter(Boolean)
  const uniqueValues = [...new Set(values)]

  if (field === "PERIODO") {
    return sortMonths(uniqueValues)
  }

  return uniqueValues.sort()
}

export function filterData(data, filters) {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      // Se o filtro está vazio (array vazio), mostrar todos
      if (!value || (Array.isArray(value) && value.length === 0)) return true

      // Se for array, verificar se o valor do item está incluído no array
      if (Array.isArray(value)) {
        return value.includes(item[key])
      }

      // Fallback para compatibilidade com filtros antigos (string)
      if (value === "all") return true
      return item[key] === value
    })
  })
}

export function calculateMetrics(data) {
  const totalPermuta = data.reduce((sum, item) => {
    return sum + parseCurrency(item.VALOR_PERMUTA)
  }, 0)

  const totalInvestimento = data.reduce((sum, item) => {
    return sum + parseCurrency(item.VALOR_INVESTIMENTO)
  }, 0)

  const totalClientes = new Set(data.map((item) => item.CLIENTES)).size
  const totalExecutivos = new Set(data.map((item) => item.EXECUTIVO)).size
  const totalVeiculos = new Set(data.map((item) => item.VEICULOS)).size

  return {
    totalPermuta,
    totalInvestimento,
    totalGeral: totalPermuta + totalInvestimento,
    totalClientes,
    totalExecutivos,
    totalVeiculos,
    totalRegistros: data.length,
  }
}

export function groupByField(data, field) {
  const grouped = {}

  data.forEach((item) => {
    const key = item[field] || "Não especificado"
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
  })

  return grouped
}

export function getChartData(data, groupBy) {
  const grouped = groupByField(data, groupBy)

  return Object.entries(grouped).map(([name, items]) => {
    const metrics = calculateMetrics(items)
    return {
      name,
      permuta: metrics.totalPermuta,
      investimento: metrics.totalInvestimento,
      total: metrics.totalGeral,
    }
  })
}

export function formatCompactNumber(value) {
  if (value >= 1000000000) {
    return `R$ ${(value / 1000000000).toFixed(2)}B`
  }
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(2)}M`
  }
  return formatCurrency(value)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value || 0)
}
