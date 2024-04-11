import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import i18next from "i18next";

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const changeLanguage = ( lang: string ) => {
        i18next.changeLanguage(lang);
    }

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/')},
        { label: 'Config', icon: 'pi pi-cog', command: () => navigate('/config/rules') },
        {
            label: 'Language',
            icon: 'pi pi-language',
            items: [
                { label: 'English', command: () => changeLanguage('en') },
                { label: 'German', command: () => changeLanguage('de') }
            ]
        }
    ];

    return <Menubar model={items} className='h-2rem border-transparent justify-content-end' style={{ background: 'none' }} /> ;
}