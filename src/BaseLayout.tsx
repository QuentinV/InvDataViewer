import React from 'react'
import { Header } from './Header'

interface BaseLayoutProps {
    children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
    <>
    <div style={{ flex: '0 0 35px' }}>
        <Header />
    </div>
    <div className='flex-auto' style={{ height: 'calc(100% - 35px)' }}>
        {children}
    </div>
    </>   
)