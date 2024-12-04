import React, { useEffect, useRef, useState } from 'react'
import '../../models/company/scores/init';
import '../../models/company/values/init';
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs'
import { useParams } from 'react-router'
import { InvData } from '../../models/types'
import { api } from '../../api/invData'
import { useTranslation } from 'react-i18next'
import { TradingViewSymbolOverview } from '../../components/tradingView/SymbolOverview'
import { metricsScoresEvents } from '../../models/company/metricsScores';
import { ProgressSpinner } from 'primereact/progressspinner'
import { BusinessModel } from './BusinessModel'
import { navs } from '../../models/routes'
import { Moat } from './Moat'
import { CompanyScore } from './CompanyScore'
import { companyScoresEvents } from '../../models/company/scores'
import { CompanyValue } from './CompanyValue';
import { companyValuesEvents } from '../../models/company/values';
import { IntrinsicValue } from './IntrinsicValue';

export const CompanyPage: React.FC = () => {
    const { t } = useTranslation()
    const { cik } = useParams()
    const [data, setData] = useState<InvData | undefined | null>()
    const titleRef = useRef(null);
    const priceOverviewRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'companyTitleRef', ref: titleRef });
        navs.setRef({ key: 'priceOverviewRef', ref: priceOverviewRef });
        document.title = "Wait for it ...";
    }, []);

    useEffect(() => {
        if (!cik) return;

        const getCompany = async () => {
            const data = await api(`invData/companies/${cik}`)
            setData(data)

            if ( !data ) return;

            document.title = data.name;
        
            metricsScoresEvents.setCik(Number(cik));
            companyScoresEvents.setCik(Number(cik));
            companyValuesEvents.setCik(Number(cik));
        }
        getCompany()
    }, [cik])

    if (data === undefined) {
        return (<div className='text-center'>
            <ProgressSpinner />
            <div style={{ whiteSpace: 'pre-line' }}>{t('ticker.loader')}</div>
        </div>);
    }

    if (data === null) {
        return (
            <div className="m-5 text-center">
                <h2>{cik}</h2>
                <div className="text-orange-500">Data not found</div>
            </div>
        )
    }

    const cikN = Number(cik);

    return (
        <div className="ml-4 pr-4 pb-4 overflow-auto h-full" >
            <h1 className="text-center mb-0" ref={titleRef}>{data.name}</h1>
            {!!data.timestamp && (<div className='text-sm flex align-items-center justify-content-center'><i className='pi pi-sync mr-2'></i>{new Date(data.timestamp).toLocaleString()}</div>)}
            <div className="mt-0 mb-2"><CompanyScore /></div>
            <IntrinsicValue ticker={data?.tickers[0]?.ticker || ''} />
            <div>
                <h3 className="bg-primary p-2" ref={priceOverviewRef}><i className='pi pi-dollar mr-2' />{t('ticker.market.title')}</h3>
                <TradingViewSymbolOverview ticker={data?.tickers?.[0]?.ticker || ''} exchange={data?.tickers?.[0]?.exchange || ''} />
            </div>
            <IndicatorsGraph data={data} />
            <InvDataViewer cik={cikN} />
            <BusinessModel cik={cikN} />
            <Moat cik={cikN} />
            <CompanyValue cik={cikN} />
        </div>
    )
}
