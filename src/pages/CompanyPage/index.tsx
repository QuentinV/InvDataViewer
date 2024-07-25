import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs'
import { useParams } from 'react-router'
import { InvData } from '../../models/types'
import { api } from '../../api/invData'
import { useTranslation } from 'react-i18next'
import { TradingViewSymbolOverview } from '../../components/tradingView/SymbolOverview'
import { scoresEvents } from '../../models/scores';
import { ProgressSpinner } from 'primereact/progressspinner'

export const CompanyPage: React.FC = () => {
    const { t } = useTranslation()
    const { cik } = useParams()
    const [data, setData] = useState<InvData | undefined | null>()

    useEffect(() => {
        if (!cik) return;

        const getCompany = async () => {
            const res = await api(`invData/companies/${cik}`)
            if (res.status === 404) {
                setData(null)
            } else {
                setData(await res.json())
            }
        }
        getCompany()

        scoresEvents.setCik(Number(cik));
    }, [cik])

    if (data === undefined) {
        return <div className='text-center'><ProgressSpinner /></div>;
    }

    if (data === null) {
        return (
            <div className="m-5 text-center">
                <h2>{cik}</h2>
                <div className="text-orange-500">Data not found</div>
            </div>
        )
    }

    return (
        <div className="ml-4 pr-4 pb-4 overflow-auto h-full">
            <h1 className="text-center">{data.name}</h1>
            <div>
                <h3 className="bg-primary p-2">{t('ticker.market.title')}</h3>
                <TradingViewSymbolOverview ticker={data?.tickers?.[0]?.ticker || ''} exchange={data?.tickers?.[0]?.exchange || ''} />
            </div>
            <IndicatorsGraph data={data} />
            <InvDataViewer data={data} />
        </div>
    )
}
