import logo from "@/assets/logo_branco.png"


export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <img
                src={logo}
                alt="Grupo Mirante"
                className="relative h-12 w-auto drop-shadow-lg"
              />
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            <div>
              <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Dashboard de Faturamento
              </h1>
              <p className="text-xs text-muted-foreground">Análise em tempo real</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
