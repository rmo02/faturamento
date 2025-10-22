"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"

export default function MultiSelectFilter({ label, options, selected, onChange, color }) {
  const [isOpen, setIsOpen] = useState(false)
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

  const selectAll = () => {
    onChange(options)
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
          <div className="absolute z-[9999] mt-2 w-full rounded-lg border border-border bg-card shadow-lg max-h-64 overflow-hidden flex flex-col">
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
            <div className="overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className="w-full text-white px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors flex items-center justify-between gap-2"
                >
                  <span className="truncate">{option}</span>
                  {selected.includes(option) && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
