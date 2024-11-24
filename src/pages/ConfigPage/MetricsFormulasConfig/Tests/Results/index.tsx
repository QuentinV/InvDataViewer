import React, { useState } from 'react'
import { $activeConfig } from '../state';
import { useUnit } from 'effector-react';
import { TestConfigResultCompare } from '../types';

interface ResultsProps {
    profile: string;
}

export const Results: React.FC<ResultsProps> = ({ profile }) => {
    const errors = useUnit($activeConfig)?.results?.[profile]?.errors;
    const [selected, setSelected] = useState<string>();

    if ( !errors )
        return null;

    const { error, compareMetrics, compareMetricsYears } = errors;

    const metricsCompare = (obj: { [key: string]: TestConfigResultCompare }) => {
        return Object.keys(obj).sort().map( k => (
            <div key={k} className={`cursor-pointer mt-1 p-1 ${selected === k ? 'border-red-700 border-1 border-dashed bg-orange-100' : 'border-1'}`} onClick={() => setSelected(k)}>
                <div className='font-bold text-center'>{k}</div>
                <div className='mt-1 flex justify-content-around align-items-center gap-4'>
                    <div><div className='text-sm text-center'>Calculated</div><div className='font-medium text-pink-700'>{(obj[k].calc ?? undefined) !== undefined ? JSON.stringify(obj[k].calc) : 'undefined'}</div></div>
                    <div><div className='text-sm text-center'>Expected</div><div className='font-medium text-green-700'>{(obj[k].expected ?? undefined) !== undefined ? JSON.stringify(obj[k].expected) : 'undefined'}</div></div>
                </div>
            </div>    
        ) );
    }

    return (
        <div>
            {error && (<div>
                <span>Global error: </span>
                <span>{ error }</span>
            </div>)}
            {compareMetrics && <div className='mt-2'>
                <div>Global metrics: </div>
                <div className='flex gap-4'>{metricsCompare(compareMetrics)}</div>
            </div>}
            {compareMetricsYears?.length && <div className='mt-2'>
                <div>Yearly metrics: </div>
                <div className='flex gap-4 overflow-x-auto'>
                    {compareMetricsYears.map( (obj, index) => (
                        <div key={index}>
                            <div>{obj.year}</div>
                            <div>{metricsCompare(obj.compare)}</div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
}

// text-orange-500