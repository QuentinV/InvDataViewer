import React, { useEffect, useState } from 'react'
import { InvData } from '../../models/types'
import { InvDataViewerTable } from './InvDataViewerTable'
import { useTranslation } from 'react-i18next'
import { Config } from './types'
import { api } from '../../api/invData'
import { ProgressSpinner } from 'primereact/progressspinner'

interface InvDataViewerProps {
    data?: InvData
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({
    data
}) => {
    const { t } = useTranslation();
    const [configs, setConfigs] = useState<Config[] | undefined>()

    useEffect(() => {
        const getConfig = async () => {
            const res = await api(`invData/config/fundamentals/display`)
            setConfigs(await res.json())
        }
        getConfig()
    }, [])

    if ( !configs ) {
        return <div className='text-center'><ProgressSpinner /></div>;
    }
    
    return (
        <div>
            {configs.map((c, i) => (
                <div key={i}>
                    <h3 className="bg-primary p-2">
                        {t(`ticker.fundamentals.${c.name}.title`)}
                    </h3>
                    <InvDataViewerTable
                        dataKey={c.name}
                        structure={c.children}
                        data={data}
                    />
                </div>
            ))}
        </div>
    )
}
