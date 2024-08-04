import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { api } from '../../../api/invData';
import { navs } from '../../../models/routes';
import { QuestionsAnswers } from '../../../components/QuestionsAnswers';

interface BusinessModelProps {
    cik: number;
}

export const BusinessModel: React.FC<BusinessModelProps> = ({ cik }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState<number>();
    const titleRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'businessModelRef', ref: titleRef });

        const getData = async () => {
            const finalChoice = (await api(`invData/companies/${cik}/scores`))?.businessModel;
            setValue(finalChoice);
        }
        getData();
    }, []);

    const saveFinalChoice = async (value: number) => {
        setValue(value);
        await api(`invData/companies/${cik}/scores`, {
            method: 'PUT',
            body: JSON.stringify({
                businessModel: value
            })
        });
    }

    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-briefcase mr-2' />{t('ticker.businessmodel.title')}</h3>
            <div className='text-center'>
                <span>{t('ticker.businessmodel.select')}</span>
                <Dropdown 
                    className='ml-2'
                    value={value}
                    options={[...Array(5)].map( (_, k) => ({ value: k-2, label: t(`ticker.businessmodel.options.${k-2}`) }))} 
                    onChange={event => saveFinalChoice(event.value)}
                />
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