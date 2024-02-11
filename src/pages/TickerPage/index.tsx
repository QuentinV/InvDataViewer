import React, { useEffect, useState } from 'react';
import { InvDataViewer } from '../../components/InvDataViewer';
import { dataPerYearType } from '../../components/InvDataViewer/types';
import { useParams } from 'react-router';

export const TickerPage: React.FC = () => {
    const { ticker } = useParams();
    const [ dataPerYear, setDataPerYear ] = useState<dataPerYearType|undefined>();

    useEffect( () => {
        fetch( `http://192.168.1.85:18800/invData/fundamentals/${ticker}` )
            .then( async res => setDataPerYear(await res.json()) )
    }, [ticker]);
    
    return <InvDataViewer dataPerYear={dataPerYear} />
};

