import React from 'react'
import { ConfigEditor } from '../ConfigEditor'

export const ChartsMetricsConfig: React.FC = () => {
    return (
        <ConfigEditor endpoint='config/metrics/charts' />
    )
}