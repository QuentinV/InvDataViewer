import React, { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { InvData } from '../../models/types'
import { MetricsGraph } from './MetricGraph'
import { TabPanel, TabView } from 'primereact/tabview'
import { useTranslation } from 'react-i18next'
import { MetricsScoreViewer } from '../MetricsScoreViewer'
import { api } from '../../api/invData'
import { ChartsConfig } from './types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { navs } from '../../models/routes'
import { InfoIcon } from '../InfoIcon'
import { metricsScoresStores } from '../../models/company/metricsScores';

interface IndicatorsGraphProps {
    data?: InvData;
    view?: 'endless' | 'tabs';
    includeScore?: boolean;
    withTitle?: boolean;
    readonly?: boolean;
}

export const IndicatorsGraph: React.FC<IndicatorsGraphProps> = ({ data, view = 'tabs', includeScore, withTitle, readonly }) => {
    const { t } = useTranslation();
    const [ config, setConfig ] = useState<ChartsConfig | null>(null);
    const titleRef = useRef(null);    
    const timestampLastEdit = useUnit(metricsScoresStores.$timestampLastEdit) ?? undefined;

    useEffect(() => {
        navs.setRef({ key: 'metricsRef', ref: titleRef });
        const getData = async () => {
            const data = await api(`invData/companies/metrics/charts/rules?limit=1`)
            setConfig(data?.[0]?.rules);
        }
        getData()
    }, []);
    
    const template = (key: string) => {
        if ( !config || !data ) return null;
        return config[key].map((e, i) => (
            <div
                key={i}
                className="flex justify-content-around gap-2"
                style={{ marginBottom: '75px' }}
            >
                <MetricsGraph
                    config={e}
                    data={data}
                    readonly={readonly}
                />
            </div>
        ))
    }

    return (
        <div>
            {withTitle && (<h3 className="bg-primary p-2 flex scrollMarginTop" ref={titleRef}>
                <div>
                    <i className='pi pi-chart-scatter mr-2' />{t('ticker.metrics.title')}
                </div>
                <div className='ml-auto mr-2 '>
                    <InfoIcon syncTimestamp={data?.metricsTimestamp} editTimestamp={timestampLastEdit} />
                </div>
            </h3>)}
            {
                !data || !config 
                ? (<div><ProgressSpinner /></div>)
                : (<div>
                    {view === 'tabs' ? (
                    <TabView>
                        {includeScore && (<TabPanel header={t('ticker.metrics.categories.score')}>
                            <MetricsScoreViewer cik={Number(data.cik)} />
                        </TabPanel>)}
                        {!!data && Object.keys(config).map( key => (
                            <TabPanel
                                header={t(
                                    `ticker.metrics.categories.${key}`
                                )}
                                key={key}
                            >
                                {template(key)}
                            </TabPanel>
                        ))}
                    </TabView>
                    ) : (
                    <>
                        {includeScore && (<MetricsScoreViewer cik={Number(data.cik)} />)}
                        {!!data && Object.keys(config).map( key => (
                            <div key={key}>
                                <h4>{t(`ticker.metrics.categories.${key}`)}</h4>
                                {template(key)}
                            </div>
                        ))}
                    </>
                )}
                </div>)
            }
        </div>
    )
}
