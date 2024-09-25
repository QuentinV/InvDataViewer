import React, { useEffect, useState } from 'react'
import { Question } from './types';
import { api } from '../../api/invData';
import { InputTextarea } from 'primereact/inputtextarea';

interface QuestionsAnswersProps {
    /**
     * API for questions config and answers per cik usually
     */
    apiUrls: { questions: string; answers: string };
}

const timeouts: {[key: string]: any} = {};

export const QuestionsAnswers: React.FC<QuestionsAnswersProps> = ({ apiUrls }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{[key: string]: string}>({});

    useEffect(() => {
        const getData = async () => {
            const res = (await api(`${apiUrls.questions}?limit=1`))?.[0]?.rules?.questions || [];
            setQuestions(res);

            const data = (await api(apiUrls.answers))
                    .reduce((prev: {[key: string]: string}, c: { questionKey: string, answer: string }) => {
                        prev[c.questionKey] = c.answer;
                        return prev;
                    }, {});
            setAnswers(data);
        }
        getData();
    }, []);
    
    const save = (questionKey: string, answer: string) => {
        setAnswers({ ...answers, [questionKey]: answer });

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
    );
}