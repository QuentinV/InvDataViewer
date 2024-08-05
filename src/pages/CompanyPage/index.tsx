import React, { useEffect, useRef, useState } from 'react'
import '../../models/companyScores/init';
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs'
import { useParams } from 'react-router'
import { InvData } from '../../models/types'
import { api } from '../../api/invData'
import { useTranslation } from 'react-i18next'
import { TradingViewSymbolOverview } from '../../components/tradingView/SymbolOverview'
import { metricsScoresEvents } from '../../models/metricsScores';
import { ProgressSpinner } from 'primereact/progressspinner'
import { BusinessModel } from './BusinessModel'
import { navs } from '../../models/routes'
import { Moat } from './Moat'
import { CompanyScore } from './CompanyScore'
import { companyScoresEvents } from '../../models/companyScores'

export const CompanyPage: React.FC = () => {
    const { t } = useTranslation()
    const { cik } = useParams()
    const [data, setData] = useState<InvData | undefined | null>()
    const priceOverviewRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'priceOverviewRef', ref: priceOverviewRef });
    }, []);

    useEffect(() => {
        if (!cik) return;

        const getCompany = async () => {
            const data = await api(`invData/companies/${cik}`)
            setData(data)
        }
        getCompany()

        metricsScoresEvents.setCik(Number(cik));
        companyScoresEvents.setCik(Number(cik));
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
            <h1 className="text-center mb-0">{data.name}</h1>
            <div className="mt-0 mb-2"><CompanyScore /></div>
            <div>
                <h3 className="bg-primary p-2" ref={priceOverviewRef}><i className='pi pi-tag mr-2' />{t('ticker.market.title')}</h3>
                <TradingViewSymbolOverview ticker={data?.tickers?.[0]?.ticker || ''} exchange={data?.tickers?.[0]?.exchange || ''} />
            </div>
            <IndicatorsGraph data={data} />
            <InvDataViewer data={data} />
            <BusinessModel cik={Number(data.cik)} />
            <Moat cik={Number(data.cik)} />
        </div>
    )
}
