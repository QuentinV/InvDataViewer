import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InvData } from '../../../models/types'
import { formatLargeNumber } from '../../../utils/formatLargeNumber'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { LabelData } from '../types'
import { useTranslation } from 'react-i18next'

interface InvDataViewerTableProps {
    dataKey: string
    structure: LabelData[]
    data?: InvData
}

export const InvDataViewerTable: React.FC<InvDataViewerTableProps> = ({
    dataKey,
    structure,
    data,
}) => {
    const { t } = useTranslation()
    const { years } = data || {}
    const yearsKeys = Object.keys(years || []).slice(-10)
    const dt: any = useRef(null)
    const [numberFormatIndex, setNumberFormatIndex] = useState<number>(2)

    const d = structure.map((ld) => {
        return {
            ...ld,
            label: t(`ticker.fundamentals.${dataKey}.${ld.name}`),
            ...yearsKeys.reduce((prev: any, current) => {
                const c: any = years?.[current]
                const fundData = c?.[dataKey]
                const v = fundData ? fundData?.[ld.name] : undefined
                prev[current] = ld.avoidFormat
                    ? v
                    : formatLargeNumber(v, numberFormatIndex)
                return prev
            }, {}),
        }
    })

    const renderLabel = (data: any) => {
        return (
            <span
                style={{
                    fontWeight: data.main ? 'bolder' : 'normal',
                    padding: `0 0 0 ${(data.level || 0) * 40 + 3}px`,
                }}
            >
                {data.label}
            </span>
        )
    }

    const exportCSV = () => {
        dt.current?.exportCSV?.({ selectionOnly: false })
    }

    const header = (
        <div className="flex align-items-center gap-2">
            <div className="card flex justify-content-center">
                <SelectButton
                    value={numberFormatIndex}
                    onChange={(e) => setNumberFormatIndex(e.value)}
                    optionLabel="name"
                    options={[
                        { name: 'Auto', value: -1 },
                        { name: 'K', value: 1 },
                        { name: 'M', value: 2 },
                        { name: 'B', value: 3 },
                        { name: 'T', value: 4 },
                    ]}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="button"
                    icon="pi pi-file"
                    rounded
                    onClick={() => exportCSV()}
                    data-pr-tooltip="CSV"
                />
            </div>
        </div>
    )

    return (
        <div>
            <DataTable
                ref={dt}
                value={d}
                scrollable={true}
                scrollHeight="500px"
                selectionMode="single"
                header={header}
                stripedRows={true}
                pt={{
                    header: { style: { background: 'none', border: 'none' } },
                }}
            >
                <Column
                    field="label"
                    header=""
                    body={renderLabel}
                    bodyStyle={{ border: 0, padding: '3px' }}
                    headerStyle={{ border: 0 }}
                ></Column>
                {yearsKeys.map((year) => (
                    <Column
                        key={year}
                        field={year}
                        header={year}
                        bodyStyle={{
                            borderLeft: 0,
                            borderRight: 0,
                            borderTop: 0,
                            padding: '4px 10px',
                        }}
                        headerStyle={{ border: 0, padding: '10px 10px' }}
                        alignHeader={'right'}
                        align={'right'}
                    ></Column>
                ))}
            </DataTable>
        </div>
    )
}
