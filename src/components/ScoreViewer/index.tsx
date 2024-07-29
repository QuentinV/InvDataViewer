import { Chart } from 'primereact/chart'
import React, { useEffect } from 'react'
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next'
import { chartOptions, metricsGlobalScoreSettings } from './constants';
import { api } from '../../api/invData';
import { getScoreChartData } from './effects';
import { scoresStores, scoresEvents } from '../../models/scores';
import { ProgressSpinner } from 'primereact/progressspinner';
import { $chartData, setChartData, $globalScore, setGlobalScore } from './stores';
import { MetricsScores } from '../../models/types';

interface ScoreViewerProps {
    cik: number;
}

export const ScoreViewer: React.FC<ScoreViewerProps> = ({ cik }) => {
    const { t } = useTranslation()
    const reloadGlobalScore = useUnit(scoresStores.$reloadGlobalScore);
    const chartData = useUnit($chartData);
    const globalScore = useUnit($globalScore);

    useEffect(() => {
        if ( !reloadGlobalScore ) return;

        const exec = async () => {
            const config = (await api(`invData/companies/metrics/scores/rules?limit=1`))[0].rules;
            const data: MetricsScores = await api(`invData/companies/${cik}/metrics/globalScores`);
            
            setChartData(getScoreChartData({ t, config, data }));
            setGlobalScore(data.value);

            scoresEvents.setReloadGlobalScore(false);
        }
        exec()        
    }, [reloadGlobalScore])

    if ( !chartData ) return <div className='text-center'><ProgressSpinner /></div>;

    const values = chartData.datasets[0].data;
    const globalScoreSettings = metricsGlobalScoreSettings[globalScore+2];

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
        <div className='flex-none align-content-center text-3xl'>
            <span style={{ color: `${globalScoreSettings.color}`}}>{globalScoreSettings.symbol}</span>
        </div>
    </div>)
}