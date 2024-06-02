import React, { useState } from 'react'
import { SelectButton } from 'primereact/selectbutton'
import { PointData } from '../types';

interface VotingSelectorProps {
    graphKey: string;
    value?: number;
    setValue: ({ graphKey, value }: PointData) => void;
}

const items = [-2, -1, 0, 1, 2].map( k => ({ name: String(k), value: k }));

export const VotingSelector: React.FC<VotingSelectorProps> = ({ graphKey, value, setValue }) => {
    const [ownValue, setOwnValue] = useState<number | undefined>(value);

    const setVal = (v : number) => {
        setValue({ graphKey, value: v });
        setOwnValue(v);
    }

    return (
        <SelectButton 
            title={graphKey} 
            pt={{ button: { className: "pt-1 pb-1 pl-3 pr-3 text-xs border-gray-100" } }}
            value={ownValue} 
            onChange={(e) => setVal(e.value)} 
            optionLabel="name" 
            options={items} 
        />
    );
}   