import React from 'react'
import { InvData } from '../../models/types'
import { MetricsGraph } from './MetricGraph'
import { categories } from './constants'
import { TabPanel, TabView } from 'primereact/tabview'
import { useTranslation } from 'react-i18next'
import { useChartData } from './hooks'
import { PointData, PointsData } from '../../models/types'
import { ScoreViewer } from '../ScoreViewer'

interface IndicatorsGraphProps {
    data?: InvData;
    savePoints: ({ graphKey, value }: PointData) => void;
    points?: PointsData;
}

export const IndicatorsGraph: React.FC<IndicatorsGraphProps> = ({ data, savePoints, points }) => {
    const { t } = useTranslation()
    const years = data?.years || {}
    const chartData = useChartData(t)

    return (
        <div>
            <h3 className="bg-primary p-2">{t('ticker.metrics.title')}</h3>
            <div>
                <TabView>
                    <TabPanel header="Score">
                        <ScoreViewer data={points} />
                    </TabPanel>
                    {chartData.map((elem, index) => (
                        <TabPanel
                            header={t(
                                `ticker.metrics.categories.${categories[index]}`
                            )}
                            key={index}
                        >
                            {elem.map((e, i) => (
                                <div
                                    key={i}
                                    className="flex justify-content-around gap-2"
                                    style={{ marginBottom: '75px' }}
                                >
                                    <MetricsGraph
                                        graphKey={e.key}
                                        getData={e.data}
                                        years={years}
                                        globalMetrics={data?.metrics}
                                        savePoints={savePoints}
                                        pointValue={points?.[e.key]?.value}
                                    />
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        </div>
    )
}
