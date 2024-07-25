import React, { useEffect, useState } from 'react'
import { api } from '../../../../api/invData'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { TestConfig } from './types';
import { EditTestConfig } from './EditTestConfig';

interface TestsProps {
    profile: string;
}

export const Tests: React.FC<TestsProps> = ({ profile }) => {
    const [displaySidebarTestConfig, setDisplaySidebarTestConfig] = useState<boolean>(false);
    const [list, setList] = useState<TestConfig[]>([]);
    const [activeConfig, setActiveConfig] = useState<TestConfig | undefined>();

    const getConfigs = async () => {
        const res = await api(`invData/companies/metrics/formulas`)
        setList(await res.json())
    }

    const save = async ( config: TestConfig ) => {
        await api(`invData/companies/metrics/formulas`, {
            method: 'POST',
            body: JSON.stringify(config),
        });
        setDisplaySidebarTestConfig(false);
        getConfigs();
    }

    const execute = async( config: TestConfig ) => {
        await api(`invData/companies/metrics/formulas/testruns`, {
            method: 'POST',
            body: JSON.stringify({ id : config._id, profile }),
        });
        getConfigs();
    }

    const remove = async( config: TestConfig ) => {
        await api(`invData/companies/metrics/formulas/tests`, {
            method: 'DELETE',
            body: JSON.stringify({ id : config._id }),
        });
        setDisplaySidebarTestConfig(false);
        getConfigs();
    }

    useEffect(() => {   
        getConfigs()
    }, []);

    const itemTemplate = ( item: TestConfig, index: number ) => {
        const result = item.results?.[profile];
        return (
            <div className='mt-3' key={index}>
                <div className='flex gap-4 align-items-center'>
                    <div>{item.name}</div>
                    <div className='ml-auto'>
                        <Button className='mr-2' severity='help' onClick={() => { setActiveConfig(item); setDisplaySidebarTestConfig(true);}}>
                            <i className='pi pi-pencil'></i>
                        </Button>
                        <Button severity={result?.pass === true ? 'success' : result?.pass === false ? 'danger' : 'secondary'} onClick={() => execute(item)}>
                            <i className='pi pi-play'></i>
                        </Button>
                    </div>
                </div>            
                {typeof result?.errorMessage === "string" && <div className='text-orange-500 mt-2'>{result?.errorMessage.split('\n').map(k => <div key={k}>{k}</div>)}</div>}
            </div>
        )
    }

    const listTemplate = (items: TestConfig[]) => items.map( (item, index) => itemTemplate(item, index))

    return (
        <>
            <h2 className='mt-0 flex align-items-center'>
                <div>Tests</div> 
                <Button className='ml-3 h-2rem' onClick={() => { setActiveConfig(undefined); setDisplaySidebarTestConfig(true); } }>Add</Button>
            </h2>
            
            <DataView value={list} listTemplate={listTemplate}  />
        
            <Sidebar 
                visible={displaySidebarTestConfig} 
                position="right" 
                className='w-11'
                onHide={() => setDisplaySidebarTestConfig(false)}>
                <EditTestConfig 
                    config={activeConfig} 
                    onClose={() => {
                        setDisplaySidebarTestConfig(false); 
                        getConfigs();
                    }}
                    onSave={config => save(config)}
                    onDelete={config => remove(config)}
                />
            </Sidebar>
        </>
    );
}