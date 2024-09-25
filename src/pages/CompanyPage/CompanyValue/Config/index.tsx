import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { api } from '../../../../api/invData';
import { CompanyValueConfig } from '../types';
import { InputText } from 'primereact/inputtext';
import { companyValuesEvents } from '../../../../models/company/values';

interface CompanyValueConfigsProps {
    cik: number;
}

let timeout: any = null;

export const CompanyValueConfigs: React.FC<CompanyValueConfigsProps> = ({ cik }) => {
    const { t } = useTranslation();
    const [config, setConfig] = useState<CompanyValueConfig|null>(null);
    
    useEffect(() => {
        const getConfig = async () => {
            const result = await api(`invData/companies/${cik}/values/configs`);
            setConfig(result);
        }
        getConfig();
    }, [cik]);

    const save = async (cat: string, key: string, index: number, value: number) => {
        const newConfig = { ...config };
        newConfig[cat][key][index] = value;
        setConfig(newConfig);

        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            await api(`invData/companies/${cik}/values/configs`, {
                method: 'POST',
                body: JSON.stringify(newConfig)
            })
            companyValuesEvents.refresh();
        }, 750);
    }
    
    return (
        <div>
            <h3 className='mt-5 mb-2'>{t(`ticker.value.config.title`)}</h3>
            <div className='ml-5'>
            {config && (
                Object.keys(config).map( cat => (
                    <div key={cat}>
                        <h4 className='mt-5 mb-2'>{t(`ticker.value.categories.${cat}.title`)}</h4>
                        <table className='ml-5'>
                            <thead>
                                <tr>
                                    <th></th>
                                    {config[cat][Object.keys(config[cat])[0]].map( (_v, i) => <th key={i}>{t(`ticker.value.levels.${i}`)}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(config[cat]).map( k => {
                                return <tr key={k}>
                                    <td className='w-15rem'>{t(`ticker.value.categories.${cat}.${k}`)}</td>
                                    {config[cat][k].map( (v, i) => (
                                        <td key={`${cat}_${k}_${i}`} className='w-10rem text-center'>
                                            <InputText className='w-5rem text-center' type='number' value={v.toString()} onChange={event => save(cat, k, i, Number(event.target.value)) } />
                                        </td>
                                    ))}
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
            </div>
        </div>
    )
}