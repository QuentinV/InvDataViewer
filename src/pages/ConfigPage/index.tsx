import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { RulesConfig } from './RulesConfig';
import { ConfigEditor } from './ConfigEditor';
import { MetricsFormulasConfig } from './MetricsFormulasConfig';
import { ChartsMetricsConfig } from './ChartsMetricsConfig';


export const ConfigPage: React.FC = () => {
    return (
      <TabView panelContainerStyle={{ height: 'calc(100% - 50px)' }} panelContainerClassName='overflow-auto' className='h-full'>
            <TabPanel header="Fundamentals">
                <div className="m-0 flex w-full flex-column overflow-auto">
                    <RulesConfig />
                </div>
            </TabPanel>
            <TabPanel header="Metrics formulas">
                <div className="m-0">
                    <MetricsFormulasConfig />
                </div>
            </TabPanel>
            <TabPanel header="Metrics charts">
                <div className="m-0">
                    <ChartsMetricsConfig />
                </div>
            </TabPanel>
            <TabPanel header="Metrics scores">
                <div className="m-0">
                    <div className='mb-2'>&#123; [<b>metric group key</b>]: &#123; value: number (percent); details: &#123; [<b>metric chart key</b>]: &#123; value: number (percent); &#125; &#125; &#125; &#125;</div>
                    <ConfigEditor endpoint='config/voting' />
                </div>
            </TabPanel>
        </TabView>
    );
};