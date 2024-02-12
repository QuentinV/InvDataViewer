import React, { useEffect, useState } from 'react'
import { InvDataViewer } from '../../components/InvDataViewer'
import { InvData } from '../../components/InvDataViewer/types'
import { useParams } from 'react-router'

export const TickerPage: React.FC = () => {
    const { ticker } = useParams()
    const [data, setData] = useState<InvData | undefined>()

    useEffect(() => {
        fetch(`http://192.168.1.85:18800/invData/fundamentals/${ticker}`).then(
            async (res) => setData(await res.json())
        )
    }, [ticker])

    return <InvDataViewer data={data} />
}
