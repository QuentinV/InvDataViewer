import React, { useEffect, useState } from 'react';
import { Data } from '../../../models/types';
import { chartData } from '../constants';

import { Chart } from 'primereact/chart';

interface MetricsGraphProps {
    getData: (years: { [key: string]: Data }) => { data: object; options: object };
    years: { [key: string]: Data };
}

export const MetricsGraph: React.FC<MetricsGraphProps> = ({ getData, years }) => {
    const [data, setData] = useState<{ data: object; options: object }|null>(null);

    useEffect(() => {
        setData(getData(years));
    }, [ getData, years ]);

    if (!data) return null;

    return (<div className='w-full'>
        {chartData && <Chart type="line" data={data.data} options={data.options} />}
    </div>);
};