import React from 'react'
import { ConfigEditor } from '../ConfigEditor'


export const MetricsFormulasConfig: React.FC = () => {
    return (
        <ConfigEditor endpoint='config/metrics/formulas' />
    )
}