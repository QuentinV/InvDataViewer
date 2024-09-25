import React, { useEffect, useRef, useState } from 'react'
import { InvData } from '../../models/types'
import { MetricsGraph } from './MetricGraph'
import { TabPanel, TabView } from 'primereact/tabview'
import { useTranslation } from 'react-i18next'
import { MetricsScoreViewer } from '../MetricsScoreViewer'
import { api } from '../../api/invData'
import { ChartsConfig } from './types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { navs } from '../../models/routes'

interface IndicatorsGraphProps {
    data?: InvData;
}

export const IndicatorsGraph: React.FC<IndicatorsGraphProps> = ({ data }) => {
    const { t } = useTranslation();
    const [ config, setConfig ] = useState<ChartsConfig | null>(null);
    const titleRef = useRef(null);

    useEffect(() => {
        navs.setRef({ key: 'metricsRef', ref: titleRef });
        const getData = async () => {
            const data = await api(`invData/companies/metrics/charts/rules?limit=1`)
            setConfig(data?.[0]?.rules);
        }
        getData()
    }, []);

    return (
        <div>
            <h3 className="bg-primary p-2" ref={titleRef}><i className='pi pi-chart-scatter mr-2' />{t('ticker.metrics.title')}</h3>
            {
                !data || !config 
                ? (<div><ProgressSpinner /></div>)
                : (<div>
                    <TabView>
                        <TabPanel header={t('ticker.metrics.categories.score')}>
                            <MetricsScoreViewer cik={Number(data.cik)} />
                        </TabPanel>
                        {!!data && Object.keys(config).map( key => (
                            <TabPanel
                                header={t(
                                    `ticker.metrics.categories.${key}`
                                )}
                                key={key}
                            >
                                {config[key].map((e, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-content-around gap-2"
                                        style={{ marginBottom: '75px' }}
                                    >
                                        <MetricsGraph
                                            config={e}
                                            data={data}
                                        />
                                    </div>
                                ))}
                            </TabPanel>
                        ))}
                    </TabView>
                </div>)
            }
        </div>
    )
}
