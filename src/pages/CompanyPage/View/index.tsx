import React, { useRef } from 'react'
import '../../../models/company/scores/init';
import '../../../models/company/values/init';
import { InvData } from '../../../models/types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'; 
import { BusinessModel } from '../../../components/companies/BusinessModel'
import { CompanyScore } from '../../../components/companies/CompanyScore'
import { CompanyValueSummary } from '../../../components/companies/CompanyValue/Summary';
import { InvDataViewer } from '../../../components/InvDataViewer'
import { IndicatorsGraph } from '../../../components/IndicatorsGraphs'
import { Image } from 'primereact/image';
import { MetricsScoreViewer } from '../../../components/MetricsScoreViewer';

interface CompanyPageEditProps {
    cik: number;
    name: string;
    data: InvData;
}

export const CompanyPageView: React.FC<CompanyPageEditProps> = ({ cik, name, data }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const items = [
        {
            label: t('ticker.overview')
        },
        {
            label: t('ticker.metrics.title')
        },
        {
            label: t('ticker.businessmodel.title')
        },
        {
            label: t('ticker.value.title')
        },
        {
            label: t('ticker.fundamentals.title')
        }
    ];

    const start = (
        <div className='flex align-items-center gap-2 mr-2'>
            <img alt="logo" src={`${process.env.PUBLIC_URL}/logo.png`} height="40" className="mr-2 cursor-pointer" onClick={() => navigate({ pathname: '/' })} />
            <div className='text-primary font-bold'>{name}</div>
        </div>
    );
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
    <div className='overflow-auto h-full'>
        <div className="card z-5 sticky top-0">
            <Menubar model={items} start={start} end={end} />
        </div>
        <div className='flex gap-4'>
            <div className='flex-1'><CompanyScore /></div>
            <div className=''>Last price: 111.1 USD</div>
        </div>
        <div className='flex flex-wrap col-12'>
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
        <div>
            <IndicatorsGraph data={data} view='endless' readonly />
        </div>
        <div>
            <BusinessModel cik={cik} readonly />
        </div>
        <div>
            <CompanyValueSummary />
        </div>
        <div>
            <InvDataViewer cik={cik} readonly />
        </div>
    </div> 
    )
}
