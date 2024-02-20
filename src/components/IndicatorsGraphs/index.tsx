import React from 'react';
import { InvData } from '../../models/types';

interface IndicatorsGraphProps {
    data?: InvData
}

export const IndicatorsGraph : React.FC<IndicatorsGraphProps> = () => <div>
    <h3 className="bg-primary p-2">Metrics</h3>
</div>