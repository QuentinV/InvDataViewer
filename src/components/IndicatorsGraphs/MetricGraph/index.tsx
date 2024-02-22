import React, { useEffect, useState } from 'react';
import { Data } from '../../../models/types';
import { chartData } from '../constants';

import { Chart } from 'primereact/chart';

interface MetricsGraphProps {
    dataKey: string;
    years: { [key: string]: Data };
}

export const MetricsGraph: React.FC<MetricsGraphProps> = ({ dataKey, years }) => {
    const [data, setData] = useState<{ data: object; options: object }|null>(null);

    useEffect(() => {
        setData(chartData[dataKey](years));
    }, [ dataKey, years ]);

    if (!data) return null;

    return (<div className='w-5'>
        {chartData && <Chart type="line" data={data.data} options={data.options} />}
    </div>);
};