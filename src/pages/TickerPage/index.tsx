import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs';
import { useParams } from 'react-router'
import { InvData } from '../../models/types';
import { api } from '../../api/invData';

export const TickerPage: React.FC = () => {
    const { ticker } = useParams()
    const [data, setData] = useState<InvData | undefined | null>()

    useEffect(() => {
        const getTicker = async () => {
            const res = await api(`invData/fundamentals/${ticker}`);
            if ( res.status === 404 ) {
                setData(null)
            } else {
                setData(await res.json());
            }            
        }
        getTicker();
    }, [ticker]);

    if ( data === undefined ) {
        return null;
    }

    if ( data === null ) {
        return <div className="m-5 text-center">
            <h2>{ticker}</h2>
            <div className='text-orange-500'>Data not found</div>
        </div>
    }

    return <div className="m-5">
        <h1 className="text-center">{data.name}</h1>
        <IndicatorsGraph data={data} />
        <InvDataViewer data={data} />
    </div>
}
