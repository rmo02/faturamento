"use client"

import { Upload, AlertCircle, FileSpreadsheet } from "lucide-react"
import { useData } from "../../context/DataContext"

export default function UploadSection() {
  const { handleFileUpload, loading, error } = useData()

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border-2 border-dashed border-border/50 bg-gradient-to-br from-card via-card to-muted/20 p-16 text-center hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"></div>
              <div className="relative rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 shadow-xl">
                <Upload className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-3 max-w-xl">
              <h3 className="text-3xl font-bold text-foreground">Faça upload do arquivo Excel</h3>
              <p className="text-lg text-muted-foreground">
                Arraste e solte ou clique para selecionar o arquivo de faturamento
              </p>

              <div className="mt-6 rounded-xl bg-muted/50 p-4 border border-border/50">
                <div className="flex items-start gap-3 text-left">
                  <FileSpreadsheet className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Colunas necessárias:</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      CLIENTES, VEICULOS, EXECUTIVO, PERIODO, ANO, SEGMENTO, VALOR_PERMUTA, VALOR_INVESTIMENTO
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-destructive/10 border border-destructive/20 px-6 py-4 text-sm text-destructive shadow-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <label className="cursor-pointer group">
              <input type="file" accept=".xlsx,.xls" onChange={onFileChange} className="hidden" disabled={loading} />
              <div className="rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Processando...
                  </span>
                ) : (
                  "Selecionar Arquivo"
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
