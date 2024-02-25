import React, { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [token, setToken] = useState<string|null>();
    useEffect(() => {
        setToken(localStorage.getItem('token') || '');
    }, []);

    if (token === '') return <Navigate to='/login' />;

    return <>{children}</>
};