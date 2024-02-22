import React from 'react';
import { InvData } from '../../models/types';
import { MetricsGraph } from './MetricGraph';
import { chartData } from './constants';

interface IndicatorsGraphProps {
    data?: InvData
}

export const IndicatorsGraph : React.FC<IndicatorsGraphProps> = ({ data }) => {
    const years = data?.years||{};

    return ( <div>
        <h3 className="bg-primary p-2">Metrics</h3>
        <div className='flex flex-wrap justify-content-around gap-4'>
            {Object.keys(chartData).map( chartKey => <MetricsGraph key={chartKey} dataKey={chartKey} years={years} />)}
        </div>
    </div> )
};