import React from 'react';
import { InvData } from '../../models/types';
import { MetricsGraph } from './MetricGraph';

interface IndicatorsGraphProps {
    data?: InvData
}

export const IndicatorsGraph : React.FC<IndicatorsGraphProps> = ({ data }) => {
    const years = data?.years||{};

    return ( <div>
        <h3 className="bg-primary p-2">Metrics</h3>
        <MetricsGraph dataKey="GrossProfitMargin" years={years} />
    </div> )
};