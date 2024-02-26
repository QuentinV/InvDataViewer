import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs';
import { useParams } from 'react-router'
import { InvData } from '../../models/types';
import { api } from '../../api/invData';

export const TickerPage: React.FC = () => {
    const { ticker } = useParams()
    const [data, setData] = useState<InvData | undefined>()

    useEffect(() => {
        const getTicker = async () => {
            const res = await api(`invData/fundamentals/${ticker}`);
            setData(await res.json());
        }
        getTicker();
    }, [ticker]);

    if ( !data ) {
        return null;
    }

    return <div className="m-5">
        <h1 className="text-center">{data.name}</h1>
        <IndicatorsGraph data={data} />
        <InvDataViewer data={data} />
    </div>
}
