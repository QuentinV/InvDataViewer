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
                    <ConfigEditor endpoint='companies/metrics/scores/rules' />
                </div>
            </TabPanel>
            <TabPanel header="Business model questions">
                <div className='m-0'>
                    <ConfigEditor endpoint='companies/businessmodels/questions' />
                </div>
            </TabPanel>
            <TabPanel header="Moat questions">
                <div className='m-0'>
                    <ConfigEditor endpoint='companies/moat/questions' />
                </div>
            </TabPanel>
            <TabPanel header="Company value">
                <div className='m-0'>
                    <ConfigEditor endpoint='companies/values/rules' />
                </div>
            </TabPanel>
        </TabView>
    );
};