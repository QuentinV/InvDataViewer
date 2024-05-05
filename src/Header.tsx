import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const changeLanguage = (lang: string) => {
        localStorage.setItem('lng', lang)
        i18next.changeLanguage(lang)
    }

    const items = [
        {
            label: t('menu.home'),
            icon: 'pi pi-home',
            command: () => navigate('/'),
        },
        {
            label: t('menu.config'),
            icon: 'pi pi-cog',
            command: () => navigate('/config/rules'),
        },
        {
            label: t('menu.lang'),
            icon: 'pi pi-language',
            items: [
                { label: 'English', command: () => changeLanguage('en') },
                { label: 'German', command: () => changeLanguage('de') },
            ],
        },
    ]

    return (
        <Menubar
            model={items}
            className="h-2rem border-transparent justify-content-end"
            style={{ background: 'none' }}
        />
    )
}
