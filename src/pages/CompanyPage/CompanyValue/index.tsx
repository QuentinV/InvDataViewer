import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { CompanyValueConfigs } from './Config';
import { CompanyValueSummary } from './Summary';
import { GlobalMetrics } from '../../../models/types';

interface CompanyValueProps {
    cik: number;
    metrics: GlobalMetrics;
}

export const CompanyValue: React.FC<CompanyValueProps> = ({ cik, metrics }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    
    useEffect(() => {
        navs.setRef({ key: 'companyValueRef', ref: titleRef });
    }, []);
    
    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-tag mr-2' />{t('ticker.value.title')}</h3>
            <CompanyValueSummary />
            <CompanyValueConfigs cik={cik} metrics={metrics} />
        </div>
    )
}