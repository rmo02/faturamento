import Header from "./components/layout/Header"
import Dashboard from "./components/dashboard/Dashboard"
import { DataProvider } from "./context/DataContext"

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </DataProvider>
  )
}

export default App
