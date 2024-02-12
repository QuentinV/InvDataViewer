import React from 'react'
import 'primereact/resources/themes/nova-alt/theme.css'
import 'primeflex/primeflex.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TickerPage } from './pages/TickerPage'
import { HomePage } from './pages/HomePage'

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/:ticker" element={<TickerPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default App
