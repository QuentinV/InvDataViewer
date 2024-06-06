import React, { useState } from 'react'
import { ConfigEditor } from '../ConfigEditor'
import { Button } from 'primereact/button';

export const MetricsFormulasConfig: React.FC = () => {
    const [displayDoc, setDisplayDoc] = useState<boolean>(false);
    return (
        <>
            <Button className='mb-3' onClick={() => setDisplayDoc(!displayDoc)}>Toggle documentation</Button>
            { displayDoc && 
            <div className='ml-1 mb-1'>
                <div className='mb-3'><b>Data will be calculated for the last 10 years maximum</b>. Available formula at <a href="https://formulajs.info/functions/" rel='noreferrer' target='_blank'>https://formulajs.info/functions/</a>.</div>
                <div className='flex'>
                    <div className='w-6'>
                        <div>Global metrics (metrics)</div>
                        <ul className='mt-1'>
                            <li><b>f</b>: access any formula. Ex: <b>f.ROUND( 2.25, 1 )</b></li>
                            <li><b>metrics</b>: Read any previously calculated gobal metrics</li>
                            <li><b>firstYear</b> and <b>lastYear</b>: Get year as number</li>
                            <li><b>fy</b> and <b>ly</b>: Access data of first or last year. Ex: <b>fy.metrics</b></li>
                            <li><b>years</b>: array of all years - [ 2014, 2015, 2016, .., 2024 ]</li>
                            <li><b>row</b>: function to return array of data for a field or metric useful for <b>f.SUM</b><br /><span className='ml-5'>Ex: <b>f.SUM(row(&apos;metrics.investmentMargin&apos;))</b></span></li>
                        </ul>
                    </div>
                    <div className='w-6'>
                        <div>Metrics per year (year.metrics)</div>
                        <ul className='mt-1'>
                            <li><b>f</b>: access any formula. Ex: <b>f.ROUND( 2.25, 1 )</b></li>
                            <li><b>INCOME_STATEMENT</b>, ... : Data from fundamentals</li>
                            <li><b>metrics</b>: Read any previously calculated metrics for the same year</li>
                            <li><b>firstYear</b> and <b>lastYear</b>: Get year as number</li>
                            <li><b>py</b>: Get values of previous year. <br /><span className='ml-4'>Ex: <b>py.INCOME_STATEMENT</b>, ...</span></li>
                        </ul>
                    </div>
                </div>
            </div>}
            <ConfigEditor endpoint='config/metrics/formulas' />
        </>
    )
}