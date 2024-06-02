import React from 'react'
import { SelectButton } from 'primereact/selectbutton'
import { useStoreMap } from 'effector-react';
import { scoresEffects, scoresStores } from '../../../models/scores';

interface VotingSelectorProps {
    graphKey: string;
}

const items = [-2, -1, 0, 1, 2].map( k => ({ name: String(k), value: k }));

export const VotingSelector: React.FC<VotingSelectorProps> = ({ graphKey }) => {
    const value = useStoreMap(scoresStores.$scores, state => state?.[graphKey]?.value)

    const setVal = (v : number) => scoresEffects.saveScoreFx({ graphKey, value: v });

    return (
        <SelectButton 
            title={graphKey} 
            pt={{ button: { className: "pt-1 pb-1 pl-3 pr-3 text-xs border-gray-100" } }}
            value={value} 
            onChange={(e) => setVal(e.value)} 
            optionLabel="name" 
            options={items} 
        />
    );
}   