import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { CompanyValueConfigs } from './Config';
import { CompanyValueSummary } from './Summary';
import { GlobalMetrics } from '../../../models/types';
import { useUnit } from 'effector-react';
import { companyValuesStores } from '../../../models/company/values';
import { InfoIcon } from '../../InfoIcon';

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
            <h3 className="bg-primary p-2 flex scrollMarginTop" ref={titleRef}>
                <div>
                    <i className='pi pi-tag mr-2' />{t('ticker.value.title')}
                </div>
                <div className='ml-auto mr-2 '>
                    <InfoIcon syncTimestamp={timestamp} editTimestamp={configTimestamp} />
                </div>
            </h3>
            <h3 className='mt-5 mb-2'>{t(`ticker.value.summary`)}</h3>
            <CompanyValueSummary />
            <CompanyValueConfigs cik={cik} metrics={metrics} />
        </div>
    )
}