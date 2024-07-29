import React, { useState } from 'react'
import { TestConfig } from '../types'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// @ts-expect-error no type
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

interface EditTestConfigProps {
    config?: TestConfig;
    onClose: () => void;
    onSave: (config: TestConfig) => void;
    onDelete: (config: TestConfig) => void;
}

export const EditTestConfig: React.FC<EditTestConfigProps> = ({ config, onClose, onSave, onDelete }) => {
    const [activeConfig, setActiveConfig] = useState<TestConfig>(config || { name: 'New Test', inputData: {}, expectedData: {}});
    return <>
        <h2 className='mt-0 flex align-items-center'>
            <div>Test config</div>
            <Button className='h-2rem ml-auto mr-8' severity='danger' onClick={() => onDelete(activeConfig)}>Remove</Button>
        </h2>
        <div className='mb-2'>
            Name <InputText className='w-5' value={activeConfig.name} onChange={event => setActiveConfig({ ...activeConfig, name: event.currentTarget.value })} />
        </div>
        <div className='mb-2 mt-3'>Input data</div>
        <div className="flex h-27rem w-full pl-5">
            <Editor
                value={activeConfig.inputData}
                onChange={(value: object) => setActiveConfig({ ...activeConfig, inputData: value })}
                mode='code'
                history={true}
                navigationBar={true}
                statusBar={true}
                allowedModes={['tree', 'view', 'form', 'code', 'text']}
                innerRef={(ref: HTMLElement) =>
                    ref?.classList?.add('flex-auto')
                }
            />
        </div>
        <div className='mb-2 mt-3'>Expected data</div>
        <div className="flex h-27rem w-full pl-5">
            <Editor
                value={activeConfig.expectedData}
                onChange={(value: object) => setActiveConfig({ ...activeConfig, expectedData: value })}
                history={true}
                navigationBar={true}
                statusBar={true}
                mode='code'
                allowedModes={['code', 'tree', 'view', 'form', 'text']}
                innerRef={(ref: HTMLElement) =>
                    ref?.classList?.add('flex-auto')
                }
            />
        </div>
        
        <div className='text-right mt-3'>
            <Button onClick={() => onClose()}>Cancel</Button><Button onClick={() => onSave(activeConfig)} className='ml-3'>Save</Button>
        </div>
    </>
}