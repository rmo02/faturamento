"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"

export default function MultiSelectFilter({ label, options, selected, onChange, color }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const filteredOptions = options.filter((option) => String(option).toLowerCase().includes(searchTerm.toLowerCase()))

  const selectAll = () => {
    onChange(filteredOptions)
  }

  const clearAll = () => {
    onChange([])
  }

  const displayText =
    selected.length === 0
      ? "Todos"
      : selected.length === options.length
        ? "Todos"
        : `${selected.length} selecionado${selected.length > 1 ? "s" : ""}`

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full bg-${color}-500`}></span>
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all flex items-center justify-between"
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-[9999] mt-2 w-full rounded-lg border border-border bg-card shadow-lg max-h-80 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 p-2 border-b border-border bg-muted/50">
              <button
                type="button"
                onClick={selectAll}
                className="flex-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Selecionar todos
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors"
              >
                Limpar
              </button>
            </div>
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className="w-full px-4 text-white py-2.5 text-sm text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{option}</span>
                    {selected.includes(option) && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-muted-foreground text-center">Nenhum resultado encontrado</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
