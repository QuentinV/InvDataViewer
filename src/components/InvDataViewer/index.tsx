import React from 'react'
import { LabelData, dataPerYearType } from './types'
import { balanceSheetStructure, cashFlowStructure, incomeStatementStructure } from './constants';

interface InvDataViewerProps {
    dataPerYear?: dataPerYearType
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ dataPerYear }) => {
    const renderRows = ( data?: LabelData<any>[] ) => {
        if ( !data ) return null;
        return 
            {data?.map(item => 
            (<>
               <tr key={item.label}>
                    <td>{item.label}</td>
                </tr>
                {renderRows(item.children)} 
            </>) 
            )}
    }

    const displayTable = ( data: LabelData<any>[] ) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(dataPerYear||[]).map((year) => (
                            <th key={year}>{year}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderRows(data)}
                </tbody>
            </table> 
        );
    }

    return (
        <div>
            <div>
                <h3>Income Statement</h3>
                {displayTable(incomeStatementStructure)}
            </div>
            <div>
                <h3>Balance Sheet</h3>
                {displayTable(balanceSheetStructure)}
            </div>
            <div>
                <h3>Cash Flow</h3>
                {displayTable(cashFlowStructure)}
            </div>
        </div>
    )
};