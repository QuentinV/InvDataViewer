import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column, ColumnBodyOptions, ColumnEditorOptions, ColumnEvent } from 'primereact/column'
import { formatLargeNumber } from '../../../utils/formatLargeNumber'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { LabelData } from '../types'
import { useTranslation } from 'react-i18next'
import { api } from '../../../api/invData'
import { InputText } from 'primereact/inputtext'
import { ProgressSpinner } from 'primereact/progressspinner'
import { parseNumber } from '../../../utils/parseNumber'

interface InvDataViewerTableProps {
    cik: number;
    dataKey: string
    structure: LabelData[];
}

type yearsType = { [year: string]: {[dataKey: string]: { [key: string]: { value: number|null|undefined, isValid?: boolean } } } };

export const InvDataViewerTable: React.FC<InvDataViewerTableProps> = ({
    cik,
    dataKey,
    structure
}) => {
    const { t } = useTranslation();
    const [years, setYears] = useState<yearsType>();
    const yearsKeys = Object.keys(years || {}).slice(-10)
    const dt: any = useRef(null);
    const [numberFormatIndex, setNumberFormatIndex] = useState<number>(2);

    useEffect(() => {
        (async () => {
            const v = await api(`invData/companies/${cik}/fundamentals/${dataKey}`)
            setYears(v);
        })();
    }, [cik, dataKey]);

    if ( !years ) {
        return (<div className='text-center'>
            <ProgressSpinner />
            <div style={{ whiteSpace: 'pre-line' }}>{t('ticker.loader')}</div>
        </div>);
    }

    const updateValue = async (value: { [year: string]: {[dataKey: string]: { [key: string]: number|null|undefined } } }) => 
        api(
            `invData/companies/${cik}/fundamentals/${dataKey}`, 
            {
                method: 'PUT',
                body: JSON.stringify(value)
            }
        )

    const d = structure.map((ld) => {
        return {
            ...ld,
            label: t(`ticker.fundamentals.${dataKey}.${ld.name}`),
            ...yearsKeys.reduce((prev: any, current) => {
                const c: any = years?.[current]
                const fundData = c?.[dataKey]
                const v = fundData ? fundData?.[ld.name]?.value : undefined
                prev[current] = ld.avoidFormat
                    ? v
                    : formatLargeNumber(v, numberFormatIndex)
                return prev
            }, {})
        }
    });

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

    const exportCSV = () =>  {
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
    
    const body = (options: ColumnBodyOptions, row: any) => {
        const config = (years[options.field] as any)?.[dataKey]?.[structure[options.rowIndex]?.name];
        if ( (config?.value ?? null) === null ) {
            return null;
        }
        return (
            <div 
                className='w-full h-full'
                style={{ 
                    borderBottom: config?.isValid ? `thin solid green` : (config?.isValid === false) ? 'thin solid orange' : 'none'
                }}>
                    {row?.[options.field]}
            </div>
        );
    }

    const cellEditor = (options: ColumnEditorOptions) => {
        return (
            <div>
                <span className='pi pi-check mr-1' onClick={() => {
                    dt.current.validated = { rowIndex: options.rowIndex, year: options.field };
                    dt.current.getTable().click();
                }}></span>
                <InputText 
                    className='w-7rem p-0 text-right'
                    type="string" 
                    value={options.value} 
                    onChange={(e: any) => options?.editorCallback?.(e.target.value)} 
                    onKeyDown={(e) => e.stopPropagation()} 
                />
            </div>
        );
    };

    const onCellEditComplete = async (e: ColumnEvent) => {
        if ( dt.current?.validated?.rowIndex !== e.rowIndex || dt.current?.validated?.year !== e.field ) {
            dt.current.validated = undefined;
            return; 
        }
        const config = structure[e.rowIndex];
        const key = config?.name;
        const ref = years[e.field]?.[dataKey];
        let newValue = parseNumber(e.newValue);
        if (!config.avoidFormat) {
            newValue = newValue * Math.pow(10, numberFormatIndex * 3)
        }
        d[e.rowIndex][e.field] = e.newValue;
        ref[key] = { value: newValue, isValid: true };
        await updateValue({
            [e.field]: {
                [dataKey]: {
                    [key]: newValue
                }
            }
        })
    };

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
                editMode="cell"
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
                        body={(row, options) => body(options, row)}
                        headerStyle={{ border: 0, padding: '10px 10px' }}
                        alignHeader={'right'}
                        align={'right'}
                        editor={(options) => cellEditor(options)} 
                        onCellEditComplete={onCellEditComplete}
                    ></Column>
                ))}
            </DataTable>
        </div>
    )
}
