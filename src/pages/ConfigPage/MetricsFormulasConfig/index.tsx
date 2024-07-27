import React, { useState } from 'react'
import { ConfigEditor } from '../ConfigEditor'
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Tests } from './Tests';
import { Dropdown } from 'primereact/dropdown';

const profiles = [{ name: 'dev'}, { name: 'prod'}];

export const MetricsFormulasConfig: React.FC = () => {
    const [displayDoc, setDisplayDoc] = useState<boolean>(false);
    const [displaySidebarTests, setDisplaySidebarTests] = useState<boolean>(false);
    const [profile, setProfile] = useState<{ name: string}>({ name: 'dev' });
    return (
        <>
            <div className='flex mb-3 gap-3'>
                <Button onClick={() => setDisplayDoc(!displayDoc)}>Toggle documentation</Button>
                <Button onClick={() => setDisplaySidebarTests(true)}>Tests</Button>
                <div>Profile <Dropdown options={profiles} optionLabel='name' value={profile} onChange={e => setProfile(e.value)} /></div>
            </div>
            { displayDoc && 
            <div className='ml-1 mb-1'>
                <div className='mb-3'><b>Data will be calculated for the last 10 years maximum</b>. Available formula at <a href="https://formulajs.info/functions/" rel='noreferrer' target='_blank'>https://formulajs.info/functions/</a>.</div>
                <div className='flex'>
                    <div className='w-6'>
                        <div>Global metrics (metrics)</div>
                        <ul className='mt-1'>
                            <li><b className='text-primary'>f</b>: access any formula. Ex: <b>f.ROUND( 2.25, 1 )</b></li>
                            <li><b className='text-primary'>metrics</b>: Read any previously calculated gobal metrics</li>
                            <li><b className='text-primary'>firstYear</b> and <b className='text-primary'>lastYear</b>: Get year as number</li>
                            <li><b className='text-primary'>fy</b> and <b className='text-primary'>ly</b>: Access data of first or last year. Ex: <b>fy.metrics</b></li>
                            <li><b className='text-primary'>years</b>: array of all years - [ 2014, 2015, 2016, .., 2024 ]</li>
                            <li><b className='text-primary'>row</b>: function to return array of data for a field or metric useful for <b>f.SUM</b><br /><span className='ml-5'>Ex: <b>f.SUM(row(&apos;metrics.investmentMargin&apos;))</b></span></li>
                        </ul>
                    </div>
                    <div className='w-6'>
                        <div>Metrics per year (year.metrics)</div>
                        <ul className='mt-1'>
                            <li><b className='text-primary'>f</b>: access any formula. Ex: <b>f.ROUND( 2.25, 1 )</b></li>
                            <li><b className='text-primary'>INCOME_STATEMENT</b>, ... : Data from fundamentals</li>
                            <li><b className='text-primary'>metrics</b>: Read any previously calculated metrics for the same year</li>
                            <li><b className='text-primary'>firstYear</b> and <b className='text-primary'>lastYear</b>: Get year as number</li>
                            <li><b className='text-primary'>py</b>: Get values of previous year. <br /><span className='ml-4'>Ex: <b>py.INCOME_STATEMENT</b>, ...</span></li>
                        </ul>
                    </div>
                </div>
            </div>}
            <ConfigEditor endpoint='companies/metrics/formulas' profile={profile.name} />
            <Sidebar visible={displaySidebarTests} position="right" onHide={() => setDisplaySidebarTests(false)}>
                <Tests profile={profile.name} />
            </Sidebar>
        </>
    )
}