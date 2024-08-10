import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { IntrinsicValueGraph } from '../../../components/IntrinsicValueGraph';
import { useUnit } from 'effector-react';
import { companyValuesStores } from '../../../models/company/values';
import { api } from '../../../api/invData';
import { SelectButton } from 'primereact/selectbutton';

interface IntrinsicValueProps {
    ticker: string;
}

export const IntrinsicValue: React.FC<IntrinsicValueProps> = ({ ticker }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    const companyValues = useUnit(companyValuesStores.$values);
    const [price, setPrice] = useState<number>(0);
    const [level, setLevel] = useState<number>(2);
    
    useEffect(() => {
        navs.setRef({ key: 'companyIntrinsicValueRef', ref: titleRef });
    }, []);
    
    
    const areas = companyValues?.areas?.[level];
    useEffect( () => {
        if ( !areas || price ) return;
        const getPrice = async () => {
            const p = await api(`invData/tickers/${ticker}/prices`);
            setPrice(p.price);
        }
        getPrice();
    }, [ticker, areas]);
    
    const items = companyValues?.areas?.map( (_, i) => ({ name: t(`ticker.value.levels.${i}`), value: i }));

    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-compass mr-2' />{t('ticker.intrinsicValue.title')}</h3>
            {!!items && 
                (<div className='mb-3'>
                    <SelectButton 
                        pt={{ button: { className: "pt-1 pb-1 pl-4 pr-4 border-gray-100 text-sm font-bold" } }}
                        value={level} 
                        onChange={(e) => e.value !== null && setLevel(e.value)} 
                        optionLabel="name" 
                        options={items} 
                    />
                </div>)
            }
            <div>
                {<IntrinsicValueGraph areas={areas} value={price} />}
            </div>
        </div>
    )
}