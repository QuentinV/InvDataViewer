import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { navs } from '../../../models/routes';
import { IntrinsicValueGraph } from '../../../components/IntrinsicValueGraph';
import { useUnit } from 'effector-react';
import { companyValuesStores } from '../../../models/company/values';
import { api } from '../../../api/invData';
import { SelectButton } from 'primereact/selectbutton';
import { downloadSvg, downloadSvgAsPng } from './utils';
import { Tooltip } from 'primereact/tooltip';

interface IntrinsicValueProps {
    ticker: string;
}

export const IntrinsicValue: React.FC<IntrinsicValueProps> = ({ ticker }) => {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    const svgRef = useRef<any>(null);
    const companyValues = useUnit(companyValuesStores.$values);
    const { timestamp } = useUnit(companyValuesStores.$timestamps);
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
            <Tooltip target=".infoIntrinsicValue" className='w-12rem'>
                {timestamp && (<div className='text-sm flex align-items-center mb-1'><i className='pi pi-sync mr-2'></i>{new Date(timestamp).toLocaleString()}</div>)}
            </Tooltip>
            <h3 className="bg-primary p-2 flex" ref={titleRef}>
                <div>
                    <i className='pi pi-compass mr-2' />{t('ticker.intrinsicValue.title')}
                </div>
                <div className='ml-auto mr-2 '>
                    <i className='pi pi-info-circle infoIntrinsicValue' />
                </div>
            </h3>
            <div className='flex mb-3'>
            {!!items && 
                (<div>
                    <SelectButton 
                        pt={{ button: { className: "pt-1 pb-1 pl-4 pr-4 border-gray-100 text-sm font-bold" } }}
                        value={level} 
                        onChange={(e) => e.value !== null && setLevel(e.value)} 
                        optionLabel="name" 
                        options={items} 
                    />
                </div>)
            }
                <div className='ml-auto align-items-center flex mr-3'>
                    <i className='pi pi-download cursor-pointer' onClick={() => downloadSvg(svgRef.current, `${ticker}.intrinsicValue-level${level}.svg`)}></i>
                    <i className='ml-3 pi pi-file-import cursor-pointer' onClick={() => downloadSvgAsPng(svgRef.current, `${ticker}.intrinsicValue-level${level}.png`)}></i>
                </div>
            </div>
            
            <div>
                {<IntrinsicValueGraph areas={areas} value={price} ref={svgRef} />}
            </div>
        </div>
    )
}