import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/')},
        { label: 'Config', icon: 'pi pi-cog', command: () => navigate('/config/rules') }
    ];

    return <Menubar model={items} className='h-2rem border-transparent justify-content-end' /> ;
}