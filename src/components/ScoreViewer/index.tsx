import { Chart } from 'primereact/chart'
import React, { useEffect, useState } from 'react'
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next'
import { chartOptions } from './constants';
import { ScoreConfig } from '../../models/types';
import { api } from '../../api/invData';
import { getScoreChartData } from './effects';
import { scoresStores } from '../../models/scores';
import { ProgressSpinner } from 'primereact/progressspinner';

export const ScoreViewer: React.FC = () => {
    const { t } = useTranslation()
    const [config, setConfig] = useState<ScoreConfig>();
    const [chartData, setChartData] = useState<any>();
    const data = useUnit(scoresStores.$scores);

    useEffect(() => {
        if ( config && data )
            setChartData(getScoreChartData({ t, config, data }));
    }, [data, config, t])

    useEffect(() => {
        const getConfigs = async () => {
            const res = await api(`invData/companies/metrics/scores/rules?limit=1`)
            setConfig((await res.json())[0].rules || {})
        }
        getConfigs()
    }, [])

    if ( !data || !config || !chartData ) return <div className='text-center'><ProgressSpinner /></div>;

    const values = chartData.datasets[0].data;

    return (<div className='flex justify-content-center gap-7'>
        <Chart type='radar' data={chartData} options={chartOptions} className='w-30rem' />
        <div className='flex-none align-content-center'>
            {
                chartData.labels.map( (k: string, i: number) => (<div key={k} className='flex m-4'>
                    <div className='w-8rem'>{k}</div>
                    <div className='text-primary font-bold'>{values[i]}</div>
                </div>))
            }
        </div>
    </div>)
}