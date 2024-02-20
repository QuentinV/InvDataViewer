import React, { ReactNode } from 'react'
import { LabelData } from './types'
import {
    balanceSheetStructure,
    cashFlowStructure,
    incomeStatementStructure,
} from './constants'
import { Cell, HeaderCell, TitleCell } from './styles'
import { InvData } from '../../models/types'

interface InvDataViewerProps {
    data?: InvData
}

export const InvDataViewer: React.FC<InvDataViewerProps> = ({ data }) => {
    const { years } = data || {};

    const renderRows = ({
        data,
        level,
        category,
    }: {
        data?: LabelData<any>[]
        level: number
        category: string
    }) => {
        if (!data) return null
        return (
            <>
                {data?.map(
                    (item): ReactNode => (
                        <>
                            <tr
                                key={item.label}
                                className="hover:bg-primary-reverse"
                            >
                                <TitleCell level={level} bold={item.main}>
                                    {item.label}
                                </TitleCell>
                                {Object.keys(years || []).map((year) => (
                                    <Cell key={item.label + year}>
                                        {item
                                            .value?.(
                                                (years?.[year] as any)?.[
                                                    category
                                                ] || {}
                                            )
                                            ?.toLocaleString()}
                                    </Cell>
                                ))}
                            </tr>
                            {renderRows({
                                data: item.children,
                                level: level + 1,
                                category,
                            })}
                        </>
                    )
                )}
            </>
        )
    }

    const displayTable = (category: string, data: LabelData<any>[]) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(years || []).map((year) => (
                            <HeaderCell key={year}>{year}</HeaderCell>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderRows({ data, level: 0, category })}</tbody>
            </table>
        )
    }

    return (
        <div>
            <div>
                <h3 className="bg-primary p-2">Income Statement</h3>
                {displayTable('INCOME_STATEMENT', incomeStatementStructure)}
            </div>
            <div>
                <h3 className="bg-primary p-2">Balance Sheet</h3>
                {displayTable('BALANCE_SHEET', balanceSheetStructure)}
            </div>
            <div>
                <h3 className="bg-primary p-2">Cash Flow</h3>
                {displayTable('CASH_FLOW', cashFlowStructure)}
            </div>
        </div>
    )
}
