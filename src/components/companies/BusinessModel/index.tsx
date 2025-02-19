import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { QuestionsAnswers } from '../../QuestionsAnswers';
import { useUnit } from 'effector-react';
import { companyScoresEffects, companyScoresStores } from '../../../models/company/scores';
import { InfoIcon } from '../../InfoIcon';

interface BusinessModelProps {
    cik: number;
}

export const BusinessModel: React.FC<BusinessModelProps> = ({ cik }) => {
    const { t } = useTranslation();
    const businessModel = useUnit(companyScoresStores.$scores)?.businessModel;
    const titleRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'businessModelRef', ref: titleRef });
    }, []);

    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-briefcase mr-2' />{t('ticker.businessmodel.title')}</h3>
            <div className='text-center'>
                <span>{t('ticker.businessmodel.select')}</span>
                <Dropdown 
                    className='ml-2'
                    value={businessModel?.val}
                    options={[...Array(5)].map( (_, k) => ({ value: k-2, label: t(`ticker.businessmodel.options.${k-2}`) }))} 
                    onChange={event => companyScoresEffects.saveScoresFx({ businessModel: { val: event.value } })}
                />
                <span className='ml-2'><InfoIcon editTimestamp={businessModel?.timestamp} /></span>
            </div>
            <QuestionsAnswers 
                apiUrls={{
                    questions: 'invData/companies/businessmodels/questions',
                    answers: `invData/companies/${cik}/businessmodels/questions/answers`
                }} 
            />
        </div>
    );
}