import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BusinessModelQuestion } from './types';
import { api } from '../../../api/invData';
import { InputTextarea } from 'primereact/inputtextarea';

interface BusinessModelProps {
    cik: number;
}

const timeouts: {[key: string]: any} = {};

export const BusinessModel: React.FC<BusinessModelProps> = ({ cik }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState<number>();
    const [questions, setQuestions] = useState<BusinessModelQuestion[]>([]);
    const [answers, setAnswers] = useState<{[key: string]: string}>({});

    useEffect(() => {
        const getData = async () => {
            const res = (await api('invData/companies/businessmodels/questions?limit=1'))?.[0]?.rules?.questions || [];
            setQuestions(res);

            const data = (await api(`invData/companies/${cik}/businessmodels/questions/answers`))
                    .reduce((prev: {[key: string]: string}, c: { questionKey: string, answer: string }) => {
                        prev[c.questionKey] = c.answer;
                        return prev;
                    }, {});
            setAnswers(data);

            const finalChoice = (await api(`invData/companies/${cik}/scores`))?.businessModel;
            setValue(finalChoice);
        }
        getData();
    }, []);

    const saveFinalChoice = async (value: number) => {
        setValue(value);
        await api(`invData/companies/${cik}/scores`, {
            method: 'PUT',
            body: JSON.stringify({
                businessModel: value
            })
        });
    }

    const save = (questionKey: string, answer: string) => {
        setAnswers({ ...answers, [questionKey]: answer });

        clearTimeout(timeouts[questionKey]);
        timeouts[questionKey] = setTimeout(() => {
            api(`invData/companies/${cik}/businessmodels/questions/answers`, {
                method: 'POST',
                body: JSON.stringify({
                    questionKey, answer
                })
            });
        }, 750 );
    }

    return (
        <div>
            <h3 className="bg-primary p-2">{t('ticker.businessmodel.title')}</h3>
            <div className='text-center'>
                <span>{t('ticker.businessmodel.select')}</span>
                <Dropdown 
                    className='ml-2'
                    value={value}
                    options={[...Array(5)].map( (_, k) => ({ value: k-2, label: t(`ticker.businessmodel.options.${k-2}`) }))} 
                    onChange={event => saveFinalChoice(event.value)}
                />
            </div>
            <div>
                {
                    questions.map( ({ key, value }) => {
                        return (
                        <div key={key} className='w-full'>
                            <h4>{value}</h4>
                            <InputTextarea 
                                autoResize 
                                name={key} 
                                className='w-full' 
                                onChange={event => save(key, event.target.value)} 
                                value={answers[key] || ''}
                            />
                        </div>
                    ) } )
                }
            </div>
        </div>
    );
}