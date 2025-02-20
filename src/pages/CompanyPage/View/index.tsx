import React, { useRef } from 'react'
import '../../../models/company/scores/init';
import '../../../models/company/values/init';
import { InvData } from '../../../models/types'
// import { useTranslation } from 'react-i18next'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'; 
import { BusinessModel } from '../../../components/companies/BusinessModel'
import { Moat } from '../../../components/companies/Moat'
import { CompanyScore } from '../../../components/companies/CompanyScore'
import { CompanyValue } from '../../../components/companies/CompanyValue';
import { IntrinsicValue } from '../../../components/companies/IntrinsicValue';
import { ConfidenceLevels } from '../../../components/companies/ConfidenceLevels';
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
   // const { t } = useTranslation();
    const titleRef = useRef(null);

    const yearsKeys = Object.keys(data?.years || {});

    const items = [
        {
            label: 'Ubersicht'
        },
        {
            label: 'Diagramme'
        },
        {
            label: 'Geschaftsmodell'
        },
        {
            label: 'Bewertung'
        }
    ];

    const start = (
        <div className='flex align-items-center gap-2'>
            <img alt="logo" src={`${process.env.PUBLIC_URL}/logo.png`} height="40" className="mr-2" />
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
        <>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        <div className='flex gap-4'>
            <div><CompanyScore /></div>
            <div>Last price: 111.1 USD</div>
        </div>
        <div className='flex gap-4'>
            <MetricsScoreViewer cik={cik} displayDetails={false} />
            <div>
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
        </>
        
    )
}
