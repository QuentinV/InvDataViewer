import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { RulesConfig } from './RulesConfig';
import { ConfigEditor } from './ConfigEditor';
import { MetricsFormulasConfig } from './MetricsFormulasConfig';


export const ConfigPage: React.FC = () => {
    return (
      <TabView panelContainerStyle={{ height: 'calc(100% - 50px)' }} panelContainerClassName='overflow-auto' className='h-full'>
            <TabPanel header="Data mapping rules">
                <div className="m-0 flex w-full flex-column overflow-auto">
                    <RulesConfig />
                </div>
            </TabPanel>
            <TabPanel header="Metrics formulas">
                <div className="m-0">
                    <MetricsFormulasConfig />
                </div>
            </TabPanel>
            <TabPanel header="Scores mapping rules">
                <div className="m-0">
                    <ConfigEditor endpoint='config/voting' />
                </div>
            </TabPanel>
        </TabView>
    );
};