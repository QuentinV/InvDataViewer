import React from 'react'
import { useUnit } from 'effector-react'
import { companyScoresStores } from '../../../models/company/scores'
import { ScoreText } from '../../ScoreText';
import { useTranslation } from 'react-i18next';

export const CompanyScore: React.FC = () => {
    const { t } = useTranslation();
    const score = useUnit(companyScoresStores.$scores)?.score ?? undefined;
    return (
        <div className='flex align-items-center justify-content-center'>
            <i className={`pi text-lg mr-2 ${score !== undefined ? `text-500 ${score > 0 ? 'pi-thumbs-up' : 'pi-thumbs-down'}` : 'text-red-700 pi-exclamation-triangle'}`}></i>
            {
                score !== undefined ? 
                (
                    <div className='text-3xl'>
                        <ScoreText value={score} />
                    </div>
                ) : 
                (<div>{t('ticker.score.unknown')}</div>)
            }         
        </div>
    );
}