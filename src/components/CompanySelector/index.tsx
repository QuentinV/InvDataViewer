import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../api/invData';
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from 'primereact/button';

interface Company {
    ticker: string;
    title: string;
}

export interface CompanySelectorProps {
    onSelect: (item: string) => void
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({ onSelect }) => {
    const [tickers, setTickers] = useState<string[]>([]);
    const [value, setValue] = useState('');

    const search = async (event: AutoCompleteCompleteEvent) => {
        const res = await api(`invData/tickers?first=0&rows=5&q=${event.query}`);
        const data = (await res.json())
        setTickers(data.data.map( ( i: Company ) => i.ticker));
    }

    return <span>
        <AutoComplete 
            value={value} 
            suggestions={tickers} 
            completeMethod={search} 
            onChange={e => setValue(e.value) } 
            forceSelection={true} 
        />
        <Button 
            style={{ padding: "10px 10px"}} 
            onClick={() => onSelect(value)}>
                <i className='pi pi-check w-1rem'></i>
        </Button>
    </span>
}