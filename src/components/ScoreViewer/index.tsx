import { Chart } from 'primereact/chart'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { chartOptions } from './constants';
import { PointsData, ScoreConfig } from '../../models/types';
import { api } from '../../api/invData';
import { getScoreChartData } from './effects';

interface ScoreViewerProps {
    data?: PointsData
}

export const ScoreViewer: React.FC<ScoreViewerProps> = ({ data }) => {
    const { t } = useTranslation()
    const [config, setConfig] = useState<ScoreConfig>();
    const [chartData, setChartData] = useState<any>();

    useEffect(() => {
        if ( config && data )
            setChartData(getScoreChartData({ t, config, data }));
    }, [data, config, t])

    useEffect(() => {
        const getConfigs = async () => {
            const res = await api(`invData/config/voting?limit=1`)
            setConfig((await res.json())[0].rules || {})
        }
        getConfigs()
    }, [])

    if ( !data || !config || !chartData ) return null;

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