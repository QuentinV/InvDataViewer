import React, { useEffect, useState } from 'react';
import { Data, GlobalMetrics } from '../../../models/types';

import { Chart } from 'primereact/chart';
import { ChartAdditionalData, ChartValueDataType } from '../hooks';
import { formatFromSymbol } from '../../../utils/formatFromSymbol';

interface MetricsGraphProps {
    getData: (years: { [key: string]: Data }, globalMetrics?: GlobalMetrics) => { data: ChartValueDataType; options: object };
    years: { [key: string]: Data };
    globalMetrics?: GlobalMetrics;
}

export const MetricsGraph: React.FC<MetricsGraphProps> = ({ getData, years, globalMetrics }) => {
    const [value, setValue] = useState<{ data: ChartValueDataType; options: object, additionalData?: ChartAdditionalData[] }|null>(null);
    const [tableVisible, setTableVisible] = useState<boolean>(false);

    useEffect(() => {
        setValue(getData(years, globalMetrics));
    }, [ getData, years ]);

    if (!value) return null;

    return (<div className='w-full'>
        <div>
                <div className='flex'>
                    <div className='relative flex-auto'>
                        <Chart type="line" data={value.data} options={value.options} />
                        <div 
                            className='absolute hover:text-primary cursor-pointer' 
                            style={{ right: '15px', top: '15px'}}
                            onClick={() => setTableVisible(!tableVisible)}
                        >
                            <i className='pi pi-table' />
                        </div>
                    </div>
                    <div className='flex-none align-self-center'>
                        {!!value.additionalData && 
                            value.additionalData.map( (ad, k) => 
                                <div key={k} className='mt-4 mb-4 ml-3'>
                                    <div className='text-primary font-bold'>{ad.label}</div>
                                    <div className='text-primary'>
                                        {formatFromSymbol(ad.symbol, ad.value)}
                                    </div>
                                </div>
                            )
                        }
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
                                        {item.data.map( (v: any, i: number) => <td key={i} className='text-right p-1'>
                                            {v.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td> )}
                                    </tr> 
                                )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
    </div>);
};