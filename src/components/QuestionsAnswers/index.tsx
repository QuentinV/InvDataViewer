import React, { useEffect, useState } from 'react'
import { Question } from './types';
import { api } from '../../api/invData';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tooltip } from 'primereact/tooltip';

interface QuestionsAnswersProps {
    /**
     * API for questions config and answers per cik usually
     */
    apiUrls: { questions: string; answers: string };
}

const timeouts: {[key: string]: any} = {};

export const QuestionsAnswers: React.FC<QuestionsAnswersProps> = ({ apiUrls }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{[key: string]: { answer: string; timestamp?: number; }}>({});

    useEffect(() => {
        const getData = async () => {
            const res = (await api(`${apiUrls.questions}?limit=1`))?.[0]?.rules?.questions || [];
            setQuestions(res);

            const data = (await api(apiUrls.answers))
                    .reduce((prev: {[key: string]: { answer: string; timestamp?: number; }}, c: { questionKey: string, answer: string, timestamp?: number; }) => {
                        prev[c.questionKey] = { answer: c.answer, timestamp: c.timestamp };
                        return prev;
                    }, {});
            setAnswers(data);
        }
        getData();
    }, []);
    
    const save = (questionKey: string, answer: string) => {
        setAnswers({ ...answers, [questionKey]: { answer, timestamp: Date.now() } });

        clearTimeout(timeouts[questionKey]);
        timeouts[questionKey] = setTimeout(() => {
            api(apiUrls.answers, {
                method: 'POST',
                body: JSON.stringify({
                    questionKey, answer
                })
            });
        }, 750 );
    }

    return (
        <div>
            {
                questions.map( ({ key, value }) => {
                    const timestamp = answers[key]?.timestamp;
                    return (
                    <div key={key} className='w-full'>
                        <Tooltip target={`.info-${key}`} className='w-12rem'>
                            {timestamp && (<div className='text-sm flex align-items-center mb-1'><i className='pi pi-pencil mr-2'></i>{new Date(timestamp).toLocaleString()}</div>)}
                        </Tooltip>
                        <h4 className="p-2 flex">
                            <div>{value}</div>
                            <div className='ml-auto mr-2 '>
                                <i className={`pi pi-info-circle info-${key}`} />
                            </div>
                        </h4>
                        <InputTextarea 
                            autoResize 
                            name={key} 
                            className='w-full' 
                            onChange={event => save(key, event.target.value)} 
                            value={answers[key]?.answer || ''}
                        />
                    </div>
                ) } )
            }
        </div>
    );
}