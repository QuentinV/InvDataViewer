import React, { useRef } from 'react'
import { LabelData } from './types'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
    balanceSheetStructure,
    cashFlowStructure,
    incomeStatementStructure,
} from './constants'
import { InvData } from '../../models/types'
import { formatLargeNumber } from '../../utils/formatLargeNumber'
import { Button } from 'primereact/button';

interface InvDataViewerProps {
    data?: InvData
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ data }) => {
    const { years } = data || {};
    const yearsKeys = Object.keys(years || []).slice(-10);
    const dtIncStat = useRef(null);
    const dtBalSheet = useRef(null);
    const dtCashFlow = useRef(null);

    const displayTable = (category: string, data: LabelData<any>[], dt: any) => {
        const d = data.map( s => {
            return {
                ...s,
                ...yearsKeys.reduce( (prev: any, current) => {
                    const c: any = years?.[current];
                    const val = c?.[category];
                    prev[current] = formatLargeNumber(val ? s?.value?.( val ) : undefined);
                    return prev;
                }, {})
            }
        });

        const renderLabel = (data: any) => {
            return <span style={{ fontWeight: data.main ? 'bolder' : 'normal', padding: `3px 3px 3px ${(data.level || 0) * 40 + 3}px` }}>
                {data.label}
            </span>
        }

        const exportCSV = () => {
            console.log(dt.current)
            dt.current?.exportCSV?.({ selectionOnly: false });
        };

        const header = (
            <div className="flex align-items-center justify-content-end gap-2">
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV()} data-pr-tooltip="CSV" />
            </div>
        );

        return (
            <div>
                <DataTable 
                    ref={dt} 
                    value={d} 
                    selectionMode="single" 
                    header={header} 
                    pt={{ header: { style: { background: 'none', border: 'none' }}}}>
                    <Column field="label" header="" body={renderLabel} bodyStyle={{ border: 0 }} headerStyle={{ border: 0 }}></Column>
                    {yearsKeys.map((year) => (
                        <Column 
                            key={year} 
                            field={year} 
                            header={year}
                            bodyStyle={{ border: 0 }}
                            headerStyle={{ border: 0 }}
                            alignHeader={'right'}
                            align={'right'}>
                        </Column>
                    ))}
                </DataTable>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h3 className="bg-primary p-2">Income Statement</h3>
                {displayTable('INCOME_STATEMENT', incomeStatementStructure, dtIncStat)}
            </div>
            <div>
                <h3 className="bg-primary p-2">Balance Sheet</h3>
                {displayTable('BALANCE_SHEET', balanceSheetStructure, dtBalSheet)}
            </div>
            <div>
                <h3 className="bg-primary p-2">Cash Flow</h3>
                {displayTable('CASH_FLOW', cashFlowStructure, dtCashFlow)}
            </div>
        </div>
    )
}