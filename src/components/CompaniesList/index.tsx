import React, { useEffect, useState } from 'react'
import { DataView } from 'primereact/dataview'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

interface Company {
    cik: number
    title: string
}

interface CompaniesListProps {
    onLoad: ({ opts, filter }: { opts: any, filter: any }) => Promise<{ data: any, total: number }>;
}

export const CompaniesList: React.FC<CompaniesListProps> = ({ onLoad }) => {
    const [companies, setCompanies] = useState<Company[]>([])
    const [opts, setOpts] = useState({ first: 0, rows: 25 })
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        (async () => {
            const data = await onLoad({ opts, filter });
            setCompanies(data?.data || [])
            setTotal(data?.total)
        })();
    }, [opts, filter])

    const onPageChange = async ({
        first,
        rows,
    }: {
        first: number
        rows: number
    }) => setOpts({ first, rows })

    const itemTemplate = (company: Company) => {
        if ( !company ) 
            return null;

        const { title, cik } = company;
        const name = title?.toLowerCase()
        return (
            <div
                className="w-20rem h-3rem pt-5 pb-5 pl-2 pr-2 bg-blue-50 hover:bg-blue-100 text-center cursor-pointer align-items-center justify-content-center flex"
                key={cik}
                onClick={() => navigate({ pathname: `/company/${cik}` })}
            >
                {name ? name[0].toUpperCase() + name.slice(1) : ''}
            </div>
        )
    }

    const header = () => {
        return (
            <div className="flex">
                <Paginator
                    className="w-max ml-8 bg-white border-none"
                    first={opts.first}
                    rows={opts.rows}
                    totalRecords={total}
                    rowsPerPageOptions={[25, 50, 100, 200]}
                    onPageChange={onPageChange}
                />
                <InputText
                    className="ml-auto h-2rem align-self-center"
                    placeholder={t('controls.search')}
                    type="text"
                    onChange={(event) => setFilter(event.currentTarget.value)}
                />
            </div>
        )
    }

    return (
        <div className="card pl-5 pr-5 w-full">
                <DataView
                    value={companies}
                    rows={50}
                    itemTemplate={itemTemplate}
                    pt={{
                        grid: {
                            className:
                                'gap-3 align-content-start h-30rem overflow-auto overflow-x-hidden justify-content-center',
                        },
                        header: { className: 'bg-white border-none' },
                    }}
                    header={header()}
                />
            </div>
    )
}
