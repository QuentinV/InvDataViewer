import React from 'react'
import { useUnit } from 'effector-react'
import { companyScoresStores } from '../../../models/companyScores'
import { ScoreText } from '../../../components/ScoreText';

export const CompanyScore: React.FC = () => {
    const score = useUnit(companyScoresStores.$scores)?.score ?? undefined;
    if ( score === undefined ) return null;
    return (
        <div className='flex align-items-center justify-content-center'>
            <i className='pi pi-verified text-lg mr-2 text-500'></i>
            <div className='text-3xl'>
                <ScoreText value={score} />
            </div>            
        </div>
    );
}