import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { CompanyValueConfigs } from './Config';
import { CompanyValueDisplay } from './Display';

interface CompanyValueProps {
    cik: number;
}

export const CompanyValue: React.FC<CompanyValueProps> = ({ cik }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    
    useEffect(() => {
        navs.setRef({ key: 'companyValueRef', ref: titleRef });
    }, []);
    
    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-tag mr-2' />{t('ticker.value.title')}</h3>
            <CompanyValueDisplay />
            <CompanyValueConfigs cik={cik} />
        </div>
    )
}