import React from 'react'
import {
    balanceSheetStructure,
    cashFlowStructure,
    incomeStatementStructure,
} from './constants'
import { InvData } from '../../models/types'
import { InvDataViewerTable } from './InvDataViewerTable';

interface InvDataViewerProps {
    data?: InvData;
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ data }) => {
    return (
        <div>
            <div>
                <h3 className="bg-primary p-2">Income Statement</h3>
                <InvDataViewerTable dataKey='INCOME_STATEMENT' structure={incomeStatementStructure} data={data} />
            </div>
            <div>
                <h3 className="bg-primary p-2">Balance Sheet</h3>
                <InvDataViewerTable dataKey='BALANCE_SHEET' structure={balanceSheetStructure} data={data} />
            </div>
            <div>
                <h3 className="bg-primary p-2">Cash Flow</h3>
                <InvDataViewerTable dataKey='CASH_FLOW' structure={cashFlowStructure} data={data} />
            </div>
        </div>
    )
}