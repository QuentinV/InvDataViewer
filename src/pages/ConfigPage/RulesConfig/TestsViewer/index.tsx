import React, { useState } from 'react'
import { api } from '../../../../api/invData'
import { CompaniesList } from '../../../../components/CompaniesList';

const getCompanies = ({ opts, filter }: { opts: any, filter: any }) => api(`invData/companies/missingRequiredData?first=${opts.first}&rows=${opts.rows}&q=${filter.toLocaleLowerCase()}`);

export const TestsViewer: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div>
            <h4>Companies where one of important fundamentals are missing: { !visible && <button onClick={() => setVisible(true)}>Click here</button>}</h4>
            <div>
                { visible && <CompaniesList onLoad={getCompanies} />}
            </div>
        </div>
    )
}
