import React from 'react'
import { Data } from './types'

interface DataViewerProps {
    dataPerYears: { [key: string]: Data }
}

export const DataViewer: React.FC<DataViewerProps> = ({ dataPerYears }) => {
    return (
        <div>
            <div>
                <h3>Income Statement</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {Object.keys(dataPerYears).map((year) => (
                                <th>{year}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div>
                <h3>Balance Sheet</h3>
            </div>
            <div>
                <h3>Cash Flow</h3>
            </div>
        </div>
    )
};