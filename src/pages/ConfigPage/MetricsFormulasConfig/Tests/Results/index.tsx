import React, { useState } from 'react'
import { $activeConfig } from '../state';
import { useUnit } from 'effector-react';
import { TestConfigResultCompare, TestConfigResultFormulaData } from '../types';

interface ResultsProps {
    profile: string;
}

export const Results: React.FC<ResultsProps> = ({ profile }) => {
    const testResults = useUnit($activeConfig)?.results?.[profile];
    const errors = testResults?.errors;
    const formulasWithData = testResults?.formulasWithData;
    const [selected, setSelected] = useState<string>();
    
    if ( !errors )
        return null;

    const { error, compareMetrics, compareMetricsYears } = errors;

    const computeKey = ( prefix: string, key: string ) => prefix + '.' + key;

    const metricsCompare = (prefix: string, obj: { [key: string]: TestConfigResultCompare }) => {
        return Object.keys(obj).filter(k => !selected || computeKey(prefix, k) === selected).sort().map( k => (
            <div key={k} className={`cursor-pointer mt-1 p-1 ${selected === computeKey(prefix, k) ? 'border-red-700 border-1 border-dashed bg-orange-100' : 'border-1'}`} onClick={() => setSelected(selected ? undefined : computeKey(prefix, k))}>
                <div className='font-bold text-center'>{k}</div>
                <div className='mt-1 flex justify-content-around align-items-center gap-4'>
                    <div><div className='text-sm text-center'>Calculated</div><div className='font-medium text-pink-700'>{(obj[k].calc ?? undefined) !== undefined ? JSON.stringify(obj[k].calc) : 'undefined'}</div></div>
                    <div><div className='text-sm text-center'>Expected</div><div className='font-medium text-green-700'>{(obj[k].expected ?? undefined) !== undefined ? JSON.stringify(obj[k].expected) : 'undefined'}</div></div>
                </div>
            </div>    
        ) );
    }

    const renderFormulaBlock = ({ year, formulaData}: { year?: string, formulaData: TestConfigResultFormulaData }) => {
        return (
            <div className={'mt-2'}>
                {year && <span className='font-bold'>{year} = </span>}
                <span className='font-medium text-green-700'>{formulaData.replaced}</span>
            </div>
        );
    }

    const renderSelectedFormulaWithData = () => {
        if ( !selected ) 
            return null;

        if ( formulasWithData?.years && selected?.startsWith('years.') ) {
            const s = selected.substring(6);
            const formula = formulasWithData.years?.[Object.keys(formulasWithData.years).filter( year => !!formulasWithData?.years?.[year]?.metrics[s]?.formula)[0]]?.metrics?.[s]?.formula;
            return (
                <div className='mt-4'>
                    <div className='text-grey-700'>
                        <div className='font-bold'>Formula:</div>
                        <div className='ml-3 mt-2'>{formula}</div>
                    </div>
                    <div className='mt-3'>
                    {Object.keys(formulasWithData.years)?.map( (year, i) => {
                        const formulaData = formulasWithData?.years?.[year]?.metrics?.[s];
                        if ( !formulaData ) return null;
                        return (
                            <div key={i}>
                                {renderFormulaBlock({ year, formulaData })}
                            </div>
                        );
                    })}
                    </div>
                </div>
            );
        }
        const formulaData = formulasWithData?.metrics?.[selected.substring(2)];
        if ( !formulaData ) 
            return null;
        return renderFormulaBlock({ formulaData });
    }

    return (
        <div>
            {error && (<div>
                <span>Global error: </span>
                <span>{ error }</span>
            </div>)}
            {compareMetrics && <div className='mt-2'>
                <div>Global metrics: </div>
                <div className='flex gap-4'>{metricsCompare('g', compareMetrics)}</div>
            </div>}
            {compareMetricsYears?.length && <div className='mt-2'>
                <div>Yearly metrics: </div>
                <div className='flex gap-4 overflow-x-auto pb-2'>
                    {compareMetricsYears.map( (obj, index) => (
                        <div key={index}>
                            <div>{obj.year}</div>
                            <div>{metricsCompare('years', obj.compare)}</div>
                        </div>
                    ))}
                </div>
            </div>}
            {selected && renderSelectedFormulaWithData()}
        </div>
    );
}