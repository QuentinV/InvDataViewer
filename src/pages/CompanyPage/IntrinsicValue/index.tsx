import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { IntrinsicValueGraph } from '../../../components/IntrinsicValueGraph';
import { useUnit } from 'effector-react';
import { companyValuesStores } from '../../../models/company/values';
import { api } from '../../../api/invData';

interface IntrinsicValueProps {
    ticker: string;
}

export const IntrinsicValue: React.FC<IntrinsicValueProps> = ({ ticker }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    const companyValues = useUnit(companyValuesStores.$values);
    const [price, setPrice] = useState<number>(0);
    const areas = companyValues?.areas?.[0];
    
    useEffect(() => {
        navs.setRef({ key: 'companyIntrinsicValueRef', ref: titleRef });
    }, []);
    
    useEffect( () => {
        const getPrice = async () => {
            const p = await api(`invData/tickers/${ticker}/prices`);
            setPrice(p.price);
        }
        getPrice();
    }, [ticker]);

    if ( !price ) return null; 

    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-compass mr-2' />{t('ticker.intrinsicValue.title')}</h3>
            <div>
                {!!areas && <IntrinsicValueGraph areas={areas.map( limit => ({ limit }))} value={price} />}
            </div>
        </div>
    )
}