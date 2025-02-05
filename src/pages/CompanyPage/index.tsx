import React, { useEffect, useRef, useState } from 'react'
import '../../models/company/scores/init';
import '../../models/company/values/init';
import { Sidebar } from 'primereact/sidebar';
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
import { ConfidenceLevels } from './ConfidenceLevels';
import { ChatAssistant } from '../../components/ChatAssistant';
import { Avatar } from '@chatscope/chat-ui-kit-react'
import { Tooltip } from 'primereact/tooltip'

export const CompanyPage: React.FC = () => {
    const { t } = useTranslation()
    const [isVisibleAssistant, setIsVisibleAssistant] = useState<boolean>(false);
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
    const yearsKeys = Object.keys(data?.years || {});

    return (
        <div className="ml-4 pr-4 pb-4 overflow-auto h-full">
            <div ref={titleRef}></div>
            <div className='flex align-items-center justify-content-center mb-2 z-5 sticky bg-white top-0'>
                <div className={`companyLogo48 ${data?.tickers?.map( t => 't-logo-' + t ).join(' ')} mr-2`}></div>
                <h1 className="text-center mt-0 mb-0">{data.name}</h1>
                <div className='ml-3'><CompanyScore /></div>
            </div>
            <ConfidenceLevels timeframe={{ startYear: parseInt(yearsKeys.slice(-11)[0]), endYear: parseInt(yearsKeys[yearsKeys.length-1]) }} overwriteTimestamp={data?.overwriteTimestamp} />
            <IntrinsicValue ticker={data?.tickers[0]?.ticker || ''} />
            <div>
                <h3 className="bg-primary p-2" ref={priceOverviewRef}><i className='pi pi-dollar mr-2' />{t('ticker.market.title')}</h3>
                <TradingViewSymbolOverview ticker={data?.tickers?.[0]?.ticker || ''} exchange={data?.tickers?.[0]?.exchange || ''} />
            </div>
            <IndicatorsGraph data={data} />
            <InvDataViewer cik={cikN} syncTimestamp={data?.timestamp} overwriteTimestamp={data?.overwriteTimestamp} />
            <BusinessModel cik={cikN} />
            <Moat cik={cikN} />
            <CompanyValue cik={cikN} metrics={data.metrics} />
            <Sidebar visible={isVisibleAssistant} position='right' className='w-10' showCloseIcon={true} onHide={() => setIsVisibleAssistant(false)}>
                <ChatAssistant companyCik={cikN} companyName={data?.name ?? ''} />
            </Sidebar>
            <Tooltip target=".assistantIcon" content="Hey, I'm Charlie :) How may I help you?" position='left' />
            <div className='fixed p-1 bg-white border-circle' style={{ zIndex: 20, bottom: '1rem', right: '1rem', border: '1px solid #ccc' }}>
                <Avatar className='cursor-pointer assistantIcon' src={`${process.env.PUBLIC_URL}/charlie_120.png`} onClick={() => setIsVisibleAssistant(true)} />
            </div>
        </div>
    )
}
