import React, { useEffect, useState } from 'react';
import { Data } from '../../../models/types';

import { Chart } from 'primereact/chart';
import { ChartValueDataType } from '../hooks';

interface MetricsGraphProps {
    getData: (years: { [key: string]: Data }) => { data: ChartValueDataType; options: object };
    years: { [key: string]: Data };
}

export const MetricsGraph: React.FC<MetricsGraphProps> = ({ getData, years }) => {
    const [value, setValue] = useState<{ data: ChartValueDataType; options: object }|null>(null);
    const [tableVisible, setTableVisible] = useState<boolean>(false);

    useEffect(() => {
        setValue(getData(years));
    }, [ getData, years ]);

    if (!value) return null;

    return (<div className='w-full'>
        <div>
                <div className='relative'>
                    <Chart type="line" data={value.data} options={value.options} />
                    <div 
                        className='absolute hover:text-primary cursor-pointer' 
                        style={{ right: '15px', top: '15px'}}
                        onClick={() => setTableVisible(!tableVisible)}
                    >
                        <i className='pi pi-table' />
                    </div>
                </div>
                {
                    tableVisible && <div>
                        <table className='w-full m-3 mb-0' border={1}>
                            <thead>
                                <tr>
                                    <th className='p-1'>Label</th>
                                    {value.data.labels.map( k => <th key={k} className='text-right p-1'>{k}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {value.data.datasets.map( (item: any, k) => 
                                    <tr key={k}>
                                        <td className='p-1'>{item.label}</td>
                                        {item.data.map( (v: any, i: number) => <td key={i} className='text-right p-1'>{v}</td> )}
                                    </tr> 
                                )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
    </div>);
};