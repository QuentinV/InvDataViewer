import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { RulesConfigPage } from './RulesConfigPage';


export const ConfigPage: React.FC = () => {

    return (
      <TabView panelContainerStyle={{ height: 'calc(100% - 50px)' }} panelContainerClassName='overflow-auto' className='h-full'>
            <TabPanel header="Data mapping rules">
                <p className="m-0 flex w-full flex-column overflow-auto">
                    <RulesConfigPage />
                </p>
            </TabPanel>
            <TabPanel header="Points rules">
                <p className="m-0">
                    
                </p>
            </TabPanel>
        </TabView>
    );
};