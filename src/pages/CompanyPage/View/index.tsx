import React, { useRef } from 'react'
import '../../../models/company/scores/init';
import '../../../models/company/values/init';
import { InvData } from '../../../models/types'
// import { useTranslation } from 'react-i18next'
import { BusinessModel } from '../../../components/companies/BusinessModel'
import { Moat } from '../../../components/companies/Moat'
import { CompanyScore } from '../../../components/companies/CompanyScore'
import { CompanyValue } from '../../../components/companies/CompanyValue';
import { IntrinsicValue } from '../../../components/companies/IntrinsicValue';
import { ConfidenceLevels } from '../../../components/companies/ConfidenceLevels';
import { InvDataViewer } from '../../../components/InvDataViewer'
import { IndicatorsGraph } from '../../../components/IndicatorsGraphs'

interface CompanyPageEditProps {
    cik: number;
    name: string;
    data: InvData;
}

export const CompanyPageView: React.FC<CompanyPageEditProps> = ({ cik, name, data }) => {
   // const { t } = useTranslation();
    const titleRef = useRef(null);

    const yearsKeys = Object.keys(data?.years || {});

    return (
        <>
        <div className="ml-4 pr-4 pb-4 overflow-auto h-full">
            <div ref={titleRef}></div>
            <div className='flex align-items-center justify-content-center mb-2 z-5 sticky bg-white top-0'>
                <div className={`companyLogo48 ${data?.tickers?.map( t => 't-logo-' + t.ticker ).join(' ')} mr-2`}></div>
                <h1 className="text-center mt-0 mb-0">{name}</h1>
                <div className='ml-3'><CompanyScore /></div>
            </div>
            <ConfidenceLevels timeframe={{ startYear: parseInt(yearsKeys.slice(-11)[0]), endYear: parseInt(yearsKeys[yearsKeys.length-1]) }} overwriteTimestamp={data?.overwriteTimestamp} />
            <IntrinsicValue ticker={data?.tickers[0]?.ticker || ''} />
            <IndicatorsGraph data={data} />
            <InvDataViewer cik={cik} syncTimestamp={data?.timestamp} overwriteTimestamp={data?.overwriteTimestamp} />
            <BusinessModel cik={cik} />
            <Moat cik={cik} />
            <CompanyValue cik={cik} metrics={data.metrics} />
        </div>
        </>
    )
}
