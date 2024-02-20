import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { IndicatorsGraph } from '../../components/IndicatorsGraphs';
import { useParams } from 'react-router'
import { InvData } from '../../models/types';

export const TickerPage: React.FC = () => {
    const { ticker } = useParams()
    const [data, setData] = useState<InvData | undefined>()

    useEffect(() => {
        fetch(`http://192.168.1.85:18800/invData/fundamentals/${ticker}`).then(
            async (res) => setData(await res.json())
        )
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
