import React from 'react';
import { InvData } from '../../models/types';
import { MetricsGraph } from './MetricGraph';
import { categories, chartData } from './constants';
import { TabPanel, TabView } from 'primereact/tabview';

interface IndicatorsGraphProps {
    data?: InvData
}

export const IndicatorsGraph : React.FC<IndicatorsGraphProps> = ({ data }) => {
    const years = data?.years||{};

    return ( <div>
        <h3 className="bg-primary p-2">Metrics</h3>
        <div>
            <TabView>
            {categories.map( (elem, index) => (
                <TabPanel header={elem} key={index}>
                    <div className='flex flex-wrap justify-content-around gap-4'>
                        {Object.keys(chartData).filter( chartKey => chartData[chartKey].category == index ).map( chartKey => <MetricsGraph key={chartKey} dataKey={chartKey} years={years} />)}
                    </div>
                </TabPanel>   
            ) )}
            </TabView>
        </div>
    </div> )
};