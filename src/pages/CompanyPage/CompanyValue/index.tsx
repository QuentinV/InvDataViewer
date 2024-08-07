import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes'
import { api } from '../../../api/invData';
import { CompanyValueConfig } from './types';
import { InputText } from 'primereact/inputtext';

interface CompanyValueProps {
    cik: number;
}

export const CompanyValue: React.FC<CompanyValueProps> = ({ cik }) => {
    const { t } = useTranslation();
    const [config, setConfig] = useState<CompanyValueConfig|null>(null);
    const titleRef = useRef(null);
    
    useEffect(() => {
        navs.setRef({ key: 'companyValueRef', ref: titleRef });
    }, []);

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
        await api(`invData/companies/${cik}/values/configs`, {
            method: 'POST',
            body: JSON.stringify(newConfig)
        })
    }
    
    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-tag mr-2' />{t('ticker.value.title')}</h3>
            <div>
                {config && (
                    Object.keys(config).map( cat => (
                        <div key={cat}>
                            <h3 className='mt-5 mb-2'>{t(`ticker.value.categories.${cat}.title`)}</h3>
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