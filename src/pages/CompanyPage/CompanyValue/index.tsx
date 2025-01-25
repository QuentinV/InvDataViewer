import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { CompanyValueConfigs } from './Config';
import { CompanyValueSummary } from './Summary';
import { GlobalMetrics } from '../../../models/types';
import { Tooltip } from 'primereact/tooltip';
import { useUnit } from 'effector-react';
import { companyValuesStores } from '../../../models/company/values';

interface CompanyValueProps {
    cik: number;
    metrics: GlobalMetrics;
}

export const CompanyValue: React.FC<CompanyValueProps> = ({ cik, metrics }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    const { timestamp, configTimestamp } = useUnit(companyValuesStores.$timestamps);

    useEffect(() => {
        navs.setRef({ key: 'companyValueRef', ref: titleRef });
    }, []);
    
    return (
        <div>
            <Tooltip target=".infoCompanyValue" className='w-12rem'>
                {timestamp && (<div className='text-sm flex align-items-center mb-1'><i className='pi pi-sync mr-2'></i>{new Date(timestamp).toLocaleString()}</div>)}
                {configTimestamp && (<div className='text-sm flex align-items-center'><i className='pi pi-pencil mr-2'></i>{new Date(configTimestamp).toLocaleString()}</div>)}
            </Tooltip>
            <h3 className="bg-primary p-2 flex" ref={titleRef}>
                <div>
                    <i className='pi pi-tag mr-2' />{t('ticker.value.title')}
                </div>
                <div className='ml-auto mr-2 '>
                    <i className='pi pi-info-circle infoCompanyValue' />
                </div>
            </h3>
            <CompanyValueSummary />
            <CompanyValueConfigs cik={cik} metrics={metrics} />
        </div>
    )
}