import React, { useState } from 'react'
import { api } from '../../../../api/invData'
import { CompanySelector } from '../../../../components/CompanySelector'
import { Chips } from 'primereact/chips'
import { Button } from 'primereact/button'
import { InvData } from '../../../../models/types'

export const TestsViewer: React.FC = () => {
    const [value, setValue] = useState<string[]>([])
    const [results, setResults] = useState<InvData[]>([])
    const [pending, setPending] = useState<boolean>(false)

    const runTests = async () => {
        const res = []
        setPending(true)
        for (const ticker of value) {
            const resp = await api(
                `invData/companies/${ticker}/fundamentals/rules/tests`
            )
            const data = resp as InvData
            res.push(data)
        }
        setResults(res)
        setPending(false)
    }

    const showResults = () => {
        if (pending) {
            return (
                <div className="ml-5">
                    <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '2rem' }}
                    ></i>
                </div>
            )
        }
        return results.map((c) => {
            const years = c.years || {}

            return (
                <div key={c.name}>
                    <h5>{c.name}</h5>
                    <div className="overflow-auto w-full">
                        {Object.keys(years)
                            .slice(-5)
                            .map((year) => {
                                const yearData: any = years[year] || {}
                                return (
                                    <div key={year} className="flex m-2">
                                        <div className="flex-none p-3">
                                            {year}
                                        </div>
                                        <div>
                                            {Object.keys(yearData).map((c) => (
                                                <div
                                                    className="text-xs flex align-items-center"
                                                    key={c}
                                                >
                                                    <div className="flex-none w-10rem">
                                                        {c}
                                                    </div>
                                                    <div className="flex-auto p-2 flex-wrap">
                                                        {Object.keys(
                                                            yearData[c]
                                                        )
                                                            .filter(
                                                                (k) =>
                                                                    yearData[c][
                                                                        k
                                                                    ] === null
                                                            )
                                                            .map((v, i) => (
                                                                <span
                                                                    className={`${i % 2 == 0 ? 'text-purple-500' : 'text-bluegray-500'}`}
                                                                    key={v}
                                                                >
                                                                    {v};
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }, {} as any)}
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="text-center p-2 mt-2 flex align-items-center border-dotted w-max border-100">
                <div className="flex-none p-3">Test my config</div>
                <div className="flex-none p-3">
                    <CompanySelector
                        onSelect={(v: string) => setValue([...value, v])}
                    />
                </div>
                <div className="flex-none p-3">
                    <Chips
                        value={value}
                        allowDuplicate={false}
                        removable={true}
                        onRemove={(e) => {
                            const r = e.value[0]
                            setValue(value.filter((i) => i !== r))
                        }}
                    />
                </div>
                <div className="flex-none p-3">
                    <Button onClick={() => runTests()}>Run</Button>
                </div>
            </div>
            <div>
                <h4>
                    Results of tests: Names of fields where value is missing per
                    year per company
                </h4>
                <div>{showResults()}</div>
            </div>
        </div>
    )
}
