import React, { useEffect, useRef, useState } from 'react'
import { InvDataViewerTable } from './InvDataViewerTable'
import { useTranslation } from 'react-i18next'
import { Config } from './types'
import { api } from '../../api/invData'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { navs } from '../../models/routes'
import { InfoIcon } from '../InfoIcon'

interface InvDataViewerProps {
    cik: number;
    syncTimestamp?: number;
    overwriteTimestamp?: number;
    readonly?: boolean;
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ cik, syncTimestamp, overwriteTimestamp, readonly }) => {
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
            <h3 className={`${!readonly && 'bg-primary'} p-2 flex`} ref={titleRef}>
                <div>
                    <i className='pi pi-database mr-2' />{t('ticker.fundamentals.title')}
                </div>
                {(syncTimestamp || overwriteTimestamp) && (<div className='ml-auto mr-2 '>
                    <InfoIcon syncTimestamp={syncTimestamp} editTimestamp={overwriteTimestamp} />
                </div>)}
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
