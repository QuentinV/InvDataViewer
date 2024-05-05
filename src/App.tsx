import React from 'react'
import 'primereact/resources/themes/mira/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { TickerPage } from './pages/TickerPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { Header } from './Header'
import { RulesConfigPage } from './pages/RulesConfigPage'

function App() {
    return (
        <HashRouter>
            <div>
                <Header />
            </div>
            <div>
                <Routes>
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/company/:ticker"
                        element={
                            <ProtectedRoute>
                                <TickerPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/config/rules"
                        element={
                            <ProtectedRoute>
                                <RulesConfigPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App
