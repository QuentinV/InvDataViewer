import React from 'react'
import 'primereact/resources/themes/mira/theme.css'
import './theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { Header } from './Header'
import { ConfigPage } from './pages/ConfigPage'
import { AnalysisPage } from './pages/AnalysisPage'

function App() {
    return (
        <HashRouter>
            <div style={{ flex: '0 0 35px' }}>
                <Header />
            </div>
            <div className='flex-auto' style={{ height: 'calc(100% - 35px)' }}>
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
                        path="/company/:cik"
                        element={
                            <ProtectedRoute>
                                <CompanyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/config"
                        element={
                            <ProtectedRoute>
                                <ConfigPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/analysis"
                        element={
                            <ProtectedRoute>
                                <AnalysisPage />
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
