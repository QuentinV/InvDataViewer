import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs'
import { useParams } from 'react-router'
import { InvData } from '../../models/types'
import { api } from '../../api/invData'
import { Config } from '../../components/InvDataViewer/types'
import { useTranslation } from 'react-i18next'
import { TradingViewSymbolOverview } from '../../components/tradingView/SymbolOverview'

export const TickerPage: React.FC = () => {
    const { t } = useTranslation()
    const { ticker } = useParams()
    const [data, setData] = useState<InvData | undefined | null>()
    const [configs, setConfigs] = useState<Config[] | undefined>()

    useEffect(() => {
        const getTicker = async () => {
            const res = await api(`invData/fundamentals/${ticker}`)
            if (res.status === 404) {
                setData(null)
            } else {
                setData(await res.json())
            }
        }
        getTicker()
        const getConfig = async () => {
            const res = await api(`invData/config/fundamentals/display`)
            setConfigs(await res.json())
        }
        getConfig()
    }, [ticker])

    if (data === undefined || configs === undefined) {
        return null
    }

    if (data === null) {
        return (
            <div className="m-5 text-center">
                <h2>{ticker}</h2>
                <div className="text-orange-500">Data not found</div>
            </div>
        )
    }

    const setPoints = ({ graphKey, value }: { graphKey: string; value: number }) => 
        api(`invData/points`, {
            method: 'POST',
            body: JSON.stringify({ ticker, graphKey, value }),
        })

    return (
        <div className="ml-4 pr-4 pb-4 overflow-auto h-full">
            <h1 className="text-center">{data.name}</h1>
            <div>
                <h3 className="bg-primary p-2">{t('ticker.market.title')}</h3>
                <TradingViewSymbolOverview ticker={ticker || ''} />
            </div>
            <IndicatorsGraph data={data} setPoints={setPoints} />
            <InvDataViewer data={data} configs={configs} />
        </div>
    )
}
