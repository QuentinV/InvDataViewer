import React, { useEffect, useRef, useState } from 'react'
import { InvDataViewerTable } from './InvDataViewerTable'
import { useTranslation } from 'react-i18next'
import { Config } from './types'
import { api } from '../../api/invData'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Tooltip } from 'primereact/tooltip'
import { navs } from '../../models/routes'

interface InvDataViewerProps {
    cik: number;
    syncTimestamp?: number;
    overwriteTimestamp?: number;
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ cik, syncTimestamp, overwriteTimestamp }) => {
    const { t } = useTranslation();
    const [configs, setConfigs] = useState<Config[] | undefined>()
    const titleRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'fundamentalsRef', ref: titleRef });
        const getConfig = async () => {
            const data = await api(`invData/companies/fundamentals/rules/display`)
            setConfigs(data)
        }
        getConfig()
    }, [])

    if ( !configs ) {
        return <div className='text-center'><ProgressSpinner /></div>;
    }
    
    return (
        <div>
            <Tooltip target=".infoFundamentals" className='w-12rem'>
                {syncTimestamp && (<div className='text-sm flex align-items-center mb-1'><i className='pi pi-sync mr-2'></i>{new Date(syncTimestamp).toLocaleString()}</div>)}
                {overwriteTimestamp && (<div className='text-sm flex align-items-center'><i className='pi pi-pencil mr-2'></i>{new Date(overwriteTimestamp).toLocaleString()}</div>)}
            </Tooltip>
            <h3 className="bg-primary p-2 flex" ref={titleRef}>
                <div>
                    <i className='pi pi-database mr-2' />{t('ticker.fundamentals.title')}
                </div>
                <div className='ml-auto mr-2 '>
                    <i className='pi pi-info-circle infoFundamentals' />
                </div>
            </h3>
            <Accordion multiple>
            {configs.map((c, i) => (
                <AccordionTab key={i} header={t(`ticker.fundamentals.${c.name}.title`)}>
                    <InvDataViewerTable
                        cik={cik}
                        dataKey={c.name}
                        structure={c.children}
                    />
                </AccordionTab>
            ))}
            </Accordion>
        </div>
    )
}
