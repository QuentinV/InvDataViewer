import React from 'react'
import { Route, Routes } from 'react-router';
import { TickerPage } from './pages/TickerPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/:ticker' element={<TickerPage />} />
            </Routes>
        </div>
    )
}

export default App
