import React from 'react'
import 'primereact/resources/themes/mira/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './styles.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { Header } from './Header'
import { ConfigPage } from './pages/ConfigPage'

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
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App
