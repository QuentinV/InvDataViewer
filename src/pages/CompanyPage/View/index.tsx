import React, { useRef } from 'react'
import '../../../models/company/scores/init';
import '../../../models/company/values/init';
import { InvData } from '../../../models/types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Avatar } from 'primereact/avatar'; 
import { BusinessModel } from '../../../components/companies/BusinessModel'
import { CompanyScore } from '../../../components/companies/CompanyScore'
import { CompanyValueSummary } from '../../../components/companies/CompanyValue/Summary';
import { InvDataViewer } from '../../../components/InvDataViewer'
import { IndicatorsGraph } from '../../../components/IndicatorsGraphs'
import { MetricsScoreViewer } from '../../../components/MetricsScoreViewer';
import { Price } from '../../../components/companies/Price';

interface CompanyPageEditProps {
    cik: number;
    name: string;
    data: InvData;
}

export const CompanyPageView: React.FC<CompanyPageEditProps> = ({ cik, name, data }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const refs: {[key: string]: React.MutableRefObject<null>} = {
        overview: useRef(null),
        diagrams: useRef(null),
        businessModel: useRef(null),
        value: useRef(null),
        data: useRef(null),
    };

    const items = [
        { label: t('ticker.overview'), command: () => scrollToItem('overview') },
        { label: t('ticker.metrics.title'), command: () => scrollToItem('diagrams') },
        { label: t('ticker.businessmodel.title'), command: () => scrollToItem('businessModel') },
        { label: t('ticker.value.title'), command: () => scrollToItem('value') },
        { label: t('ticker.fundamentals.title'), command: () => scrollToItem('data') }
    ];

    const scrollToItem = ( key: string ) => {
        (refs[key]?.current as any)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const start = (
        <div className='flex align-items-center gap-2 mr-2'>
            <img alt="logo" src={`${process.env.PUBLIC_URL}/logo.png`} height="40" className="mr-2 cursor-pointer" onClick={() => navigate({ pathname: '/' })} />
            <div className='text-primary font-bold'>{name}</div>
        </div>
    );

    /*const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );*/

    return (
    <div className='overflow-auto h-full'>
        <div className="card z-5 sticky top-0">
            <Menubar model={items} start={start} />
        </div>
        <div className='flex flex-wrap align-items-center' >
            <h1 className='col-7 text-center text-primary scrollMarginTop' ref={refs.overview}>{name}</h1>
            <div className='col-2'><CompanyScore /></div>
            <div className='col-3'><Price ticker={data?.tickers?.[0]?.ticker} /></div>
        </div>
        <div className='flex flex-wrap col-12' >
            <div className='lg:col-9 md:col-12'>
                <MetricsScoreViewer cik={cik} displayDetails={false} />
            </div>
            <div className='lg:col-3 md:col-12'>
                <h3>Firmenprofil</h3>
                <div>
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                    Bla bbla bla bla<br />
                </div>
            </div>
        </div>
        <div>
            <h3>Aktuelle Einschatzung</h3>
            <div>
                Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla <br />
                Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla Bla bbla bla bla
            </div>
        </div>
        <div ref={refs.diagrams} className='scrollMarginTop'>
            <IndicatorsGraph data={data} view='endless' readonly />
        </div>
        <div ref={refs.businessModel} className='scrollMarginTop'>
            <BusinessModel cik={cik} readonly />
        </div>
        <div ref={refs.value} className='scrollMarginTop'>
            <CompanyValueSummary />
        </div>
        <div ref={refs.data} className='scrollMarginTop'>
            <InvDataViewer cik={cik} readonly />
        </div>
    </div> 
    )
}
