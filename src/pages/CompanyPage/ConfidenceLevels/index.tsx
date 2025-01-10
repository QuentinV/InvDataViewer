import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { api } from '../../../api/invData'
import { useTranslation } from 'react-i18next'
import { ProgressSpinner } from 'primereact/progressspinner'
import { navs } from '../../../models/routes';

interface Data {
    data: { cat: string; key: string; main: number; sure: number; unsure: number; }[];
    global: { main: number; sure: number; unsure: number; }
}

interface Timeframe {
    startYear: number;
    endYear: number;
}

interface ConfidenceLevelsProps {
    timeframe: Timeframe;
}

export const ConfidenceLevels: React.FC<ConfidenceLevelsProps> = ({ timeframe: parentTimeframe }) => {
    const { t, i18n: { language } } = useTranslation();
    const { cik } = useParams()
    const [data, setData] = useState<Data | null>();
    const [displayDetails, setDisplayDetails] = useState<string | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>(parentTimeframe);
    const titleRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'confidenceTitleRef', ref: titleRef });
    }, []);

    useEffect(() => {
        if (!cik) return;
        (async () => {
            const data = await api(`invData/companies/${cik}/fundamentals/confidences?startYear=${timeframe.startYear}&endYear=${timeframe.endYear}`);
            const result = data.data.reduce((p: any, entry: any) => {
                p.main += entry.main;
                p.sure += entry.sure;
                p.unsure += entry.unsure;
                return p;
            }, { main: 0, sure: 0, unsure: 0 });
            data.global = { main: result.main / data.total, sure: result.sure / data.total, unsure: result.unsure / data.total };
            setData(data);
        })();
    }, [cik, timeframe.startYear, timeframe.endYear])

    return (
        <div>
            <h3 className="bg-primary p-2 flex align-items-center" ref={titleRef}>
                <div><i className='pi pi-check-circle mr-2' />{t('ticker.confidence.title')}</div>
                <div className='ml-2 flex gap-1'>
                    <input className='w-4rem text-center' type='number' value={timeframe.startYear} onChange={e => setTimeframe({ ...timeframe, startYear: parseInt(e.currentTarget.value as any || 0) }) } />
                    <div>/</div>
                    <input className='w-4rem text-center' type='number' value={timeframe.endYear} onChange={e => setTimeframe({ ...timeframe, endYear: parseInt(e.currentTarget.value as any || 0)})} />
                </div>
            </h3>
            {!data && (
                <div className='text-center'>
                    <ProgressSpinner />
                </div>
            )}
            {!!data?.global && (
                <div>
                    <div className='flex gap-4 justify-content-center'>
                        {Object.keys(data.global).map( key => (
                            <div 
                                key={key} 
                                className={'cursor-pointer select-none ' + (key === 'sure' ? 'text-green-500' : key === 'unsure' ? 'text-yellow-500' : '') + (key === displayDetails ? ' font-bold' : '')}
                                onClick={() => setDisplayDetails(displayDetails === key ? null : key)}
                            >
                                {t(`ticker.confidence.${key}`)}: {(data.global as any)[key].toLocaleString( language, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )}% 
                                <i className='pi pi-angle-down'></i>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!!displayDetails && !!data && (
                <div className='flex gap-4 flex-wrap ml-4 mr-4 mt-3'>
                    {data.data.map( d => (<div key={d.key} className='text-center bg-blue-50 pt-2 pb-2 pr-4 pl-4'>
                        <div>{t(`ticker.fundamentals.${d.cat}.${d.key}`)}</div>
                        <div className='font-bold'>{(d as any)[displayDetails].toLocaleString( language, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )}%</div>
                    </div>))}
                </div>
            )}
        </div>
    )
}
