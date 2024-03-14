import React, { useEffect, useState } from 'react';
import { api } from '../../api/invData';
// @ts-expect-error no type
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { Button } from 'primereact/button';

export const RulesConfigPage: React.FC = () => {
    const [rules, setRules] = useState<object>();

    useEffect(() => {
        const getConfigs = async () => {
            const res = await api(`invData/config/fundamentals/rules?limit=1`);
            const value = await res.json();
            setRules(value[0].rules);
        }
        getConfigs();
    }, []);

    if (!rules) return null;

    const save = () => {
        api(`invData/config/fundamentals/rules`, { method: 'POST', body: JSON.stringify({ rules }) } );
    };

    return <div>
        <h2 className='text-center'>Edit rules config</h2>
        <div className='flex h-27rem w-full'>
            <Editor
                value={rules}
                onChange={(value: object) => { setRules(value) }}
                history={true}
                navigationBar={true}
                statusBar={true}
                allowedModes={['tree', 'view', 'form', 'code', 'text']}
                innerRef={(ref: HTMLElement) => ref.classList.add("flex-auto")}
            />       
        </div>
        <div className='mt-2 text-center'><Button label="Save" onClick={save} /></div>
    </div>   
}