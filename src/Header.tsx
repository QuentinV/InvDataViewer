import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Sidebar } from 'primereact/sidebar'
import { ReleaseNotes } from './components/ReleaseNotes'
import { useUnit } from 'effector-react'
import { navs } from './models/routes'

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [visibleChangelog, setVisibleChangelog] = useState<boolean>();
    const refs = useUnit(navs.$refs);

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
            label: t('menu.analysis'),
            icon: 'pi pi-check-circle',
            command: () => navigate('/analysis'),
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

    const scrollToItem = ( key: string ) => {
        refs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
      };

    return (<>
        <div className='h-2rem flex'>
            <div className='flex-1' >
                <Menubar
                    model={items}
                    className="h-2rem border-transparent flex-1"
                    style={{ background: 'none' }}
                />
            </div>
            <Routes>
                <Route 
                    path="/company/:cik" 
                    element={
                        <div className='flex flex-none h-2rem align-content-center justify-content-end flex-wrap gap-4 flex-auto ml-auto pr-6'>
                            <i className='pi pi-caret-up cursor-pointer hover:text-primary' onClick={() => scrollToItem('companyTitleRef')} />
                            <i className='pi pi-compass cursor-pointer hover:text-primary' onClick={() => scrollToItem('companyIntrinsicValueRef')} />
                            <i className='pi pi-dollar cursor-pointer hover:text-primary' onClick={() => scrollToItem('priceOverviewRef')} />
                            <i className='pi pi-chart-scatter cursor-pointer hover:text-primary' onClick={() => scrollToItem('metricsRef')}  />
                            <i className='pi pi-database cursor-pointer hover:text-primary' onClick={() => scrollToItem('fundamentalsRef')}  />
                            <i className='pi pi-briefcase cursor-pointer hover:text-primary' onClick={() => scrollToItem('businessModelRef')}  />
                            <i className='pi pi-chart-line cursor-pointer hover:text-primary' onClick={() => scrollToItem('moatRef')}  />
                            <i className='pi pi-tag cursor-pointer hover:text-primary' onClick={() => scrollToItem('companyValueRef')}  />
                        </div>
                    } />
            </Routes>
        </div>
        
        <Sidebar visible={visibleChangelog} onHide={() => setVisibleChangelog(false)} position='right' className='w-6'>
            <h2 className='mt-0 text-center'>Changelog</h2>
            <ReleaseNotes />
        </Sidebar>
    </>)
}
