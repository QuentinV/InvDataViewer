import React from 'react'
import { api } from '../../../../api/invData'
import { CompaniesList } from '../../../../components/CompaniesList';

const getCompanies = ({ opts, filter }: { opts: any, filter: any }) => api(`invData/companies/missingRequiredData?first=${opts.first}&rows=${opts.rows}&q=${filter.toLocaleLowerCase()}`);

export const TestsViewer: React.FC = () => {
    return (
        <div>
            <h4>Companies where one of important fundamentals are missing: </h4>
            <div><CompaniesList onLoad={getCompanies} /></div>
        </div>
    )
}
