import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Sidebar } from 'primereact/sidebar'
import { ReleaseNotes } from './components/ReleaseNotes'

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [visibleChangelog, setVisibleChangelog] = useState<boolean>();

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
            command: () => navigate('/config'),
        },
        {
            label: t('menu.changelog'),
            icon: 'pi pi-clock',
            command: () => setVisibleChangelog(true),
        },
        {
            label: t('menu.lang'),
            icon: 'pi pi-language',
            items: [
                { label: 'English', command: () => changeLanguage('en') },
                { label: 'German', command: () => changeLanguage('de') },
            ],
        }
    ]

    return (<>
        <Menubar
            model={items}
            className="h-2rem border-transparent justify-content-end"
            style={{ background: 'none' }}
        />
        <Sidebar visible={visibleChangelog} onHide={() => setVisibleChangelog(false)} position='right' className='w-6'>
            <h2 className='mt-0 text-center'>Changelog</h2>
            <ReleaseNotes />
        </Sidebar>
    </>)
}
