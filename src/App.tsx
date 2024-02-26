import React from 'react'
import 'primereact/resources/themes/nova-alt/theme.css'
import 'primeflex/primeflex.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { TickerPage } from './pages/TickerPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/routes/ProtectedRoute'

function App() {
    return (
        <React.StrictMode>
            <HashRouter>
                <div>
                    <Routes>
                        <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/company/:ticker" element={<ProtectedRoute><TickerPage /></ProtectedRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </HashRouter>
        </React.StrictMode>
    )
}

export default App
