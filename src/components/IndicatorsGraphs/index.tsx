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
            {chartData.map( (elem, index) => (
                <TabPanel header={categories[index]} key={index}>
                        {
                            elem
                                .map( (e, i) => 
                                    <div key={i} className='flex justify-content-around gap-2' style={{ marginBottom: '75px'}}>
                                        <MetricsGraph getData={e.data} years={years} /> 
                                    </div>
                                )
                        }
                </TabPanel>   
            ) )}
            </TabView>
        </div>
    </div> )
};