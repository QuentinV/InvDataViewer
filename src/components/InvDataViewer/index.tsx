import React from 'react'
import { InvData } from '../../models/types'
import { InvDataViewerTable } from './InvDataViewerTable'
import { useTranslation } from 'react-i18next'
import { Config } from './types'

interface InvDataViewerProps {
    data?: InvData
    configs: Config[]
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({
    data,
    configs,
}) => {
    const { t } = useTranslation()
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
