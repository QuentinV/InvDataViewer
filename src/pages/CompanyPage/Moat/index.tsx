import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { MoatScores } from './types';
import { api } from '../../../api/invData';
import { SelectButton } from 'primereact/selectbutton';
import { moatItems, trendItems } from './constants';
import { QuestionsAnswers } from '../../../components/QuestionsAnswers';

interface MoatProps {
    cik: number;
}

export const Moat: React.FC<MoatProps> = ({ cik }) => {
    const { t } = useTranslation();
    const [scores, setScores] = useState<MoatScores>({});
    const titleRef = useRef(null);
    
    useEffect(() => {
        navs.setRef({ key: 'moatRef', ref: titleRef });

        const getData = async () => {
            const scores = (await api(`invData/companies/${cik}/scores`)).moat;
            setScores({
                moat: scores?.moat,
                trend: scores?.trend,
                result: scores?.result
            });
        }
        getData();
    }, []);

    const save = async ({ moat, trend }: MoatScores) => {
        const s = { ...scores };
        if ( moat !== undefined ) s.moat = moat;
        if ( trend !== undefined ) s.trend = trend;
        setScores(s);

        const res = await api(`invData/companies/${cik}/scores`, {
            method: 'PUT',
            body: JSON.stringify({
                moat: { moat, trend }
            })
        });

        setScores(res);
    }

    const iconTemplate = (option: { icon: string}) => {
        return <i className={option.icon}></i>;
    }


    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-chart-line mr-2' />{t('ticker.moat.title')}</h3>
            <div className='flex gap-5 justify-content-end'>
                <div>
                    <div className='text-center'>{t('ticker.moat.moat')}</div>
                    <SelectButton 
                        pt={{ button: { className: "pt-1 pb-1 pl-4 pr-4 border-gray-100 text-sm font-bold" } }}
                        value={scores.moat} 
                        onChange={(e) => save({ moat: e.value })} 
                        optionLabel="name" 
                        options={moatItems} 
                    />
                </div>
                <div>
                <div className='text-center'>{t('ticker.moat.trend')}</div>
                    <SelectButton 
                        pt={{ button: { className: "pt-1 pb-1 pl-4 pr-4 text-sm border-gray-100" } }}
                        value={scores.moat} 
                        onChange={(e) => save({ trend: e.value })} 
                        itemTemplate={iconTemplate}
                        options={trendItems} 
                    />
                </div>
                <div className='flex flex-column'>
                    <div className='text-center flex-none'>{t('ticker.moat.result')}</div>
                    <div className='text-center align-content-center flex-auto font-bold'>{scores.result !== undefined ? scores.result === 1 ? '+' : scores.result === -1 ? '-' : 'O' : 'none'}</div>
                </div>
            </div>
            <QuestionsAnswers 
                apiUrls={{
                    questions: 'invData/companies/moat/questions',
                    answers: `invData/companies/${cik}/moat/questions/answers`
                }} 
            />
        </div>
    )
}