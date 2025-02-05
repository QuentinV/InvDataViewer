import React, { useEffect, useState } from 'react'
import { DataView } from 'primereact/dataview'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import { useTranslation } from 'react-i18next'
import { CompanyFavorite } from '../CompanyFavorite'
import { Link } from 'react-router-dom'

interface Company {
    cik: number;
    title: string;
    timestamp?: number;
    favorite: boolean;
    tickers?: string[];
}

interface CompaniesListProps {
    onLoad: ({ opts, filter, favorites }: { opts: any, filter: any, favorites?: boolean }) => Promise<{ data: any, total: number }>;
}

export const CompaniesList: React.FC<CompaniesListProps> = ({ onLoad }) => {
    const [companies, setCompanies] = useState<Company[]>([])
    const [opts, setOpts] = useState({ first: 0, rows: 25 })
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState('')
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const { t } = useTranslation()

    useEffect(() => {
        (async () => {
            const data = await onLoad({ opts, filter, favorites: showFavorites });
            setCompanies(data?.data || [])
            setTotal(data?.total)
        })();
    }, [opts, filter, showFavorites])

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

        const { title, cik, timestamp, favorite, tickers } = company;
        const name = title?.toLowerCase()
        return (
            <div
                className="relative w-20rem h-4rem pt-1 pb-1 pl-2 pr-4 bg-blue-50 hover:bg-blue-100 text-gray-600 justify-content-center flex flex-column"
                key={cik}
            >
                <Link 
                    style={{ textDecoration: 'none' }}
                    className='text-gray-600 absolute bottom-0 right-0 pr-1 pt-1 hover:text-primary'
                    to={`/company/${cik}`}
                    rel="noopener noreferrer"
                    target='_blank'
                >
                    <i className='pi pi-external-link'></i>
                </Link>
                <div className='absolute top-0 right-0 pr-1 pt-1 hover:text-primary'><CompanyFavorite cik={cik} favorite={favorite} /></div>
                <Link
                    style={{ textDecoration: 'none' }}
                    className='text-gray-600 hover:text-primary inline-block w-full'
                    to={`/company/${cik}`}
                >
                    <div className='flex align-items-center'>
                        <div className={`companyLogo48 ${tickers?.map( t => 't-logo-' + t ).join(' ')}`}></div>
                        <div className='flex-1 text-center'>{name ? name[0].toUpperCase() + name.slice(1) : ''}</div>
                    </div>                    
                </Link>
                {!!timestamp && (<div className='text-sm flex align-items-center mt-2'><i className='pi pi-sync mr-2'></i>{new Date(timestamp).toLocaleString()}</div>)}
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
                <div className='ml-auto h-2rem align-self-center'>
                    <i className={`cursor-pointer pi pi-bookmark${showFavorites ? '-fill' : ''} mr-3`} onClick={() => setShowFavorites(!showFavorites)}></i>
                    <InputText
                        placeholder={t('controls.search')}
                        type="text"
                        onChange={(event) => setFilter(event.currentTarget.value)}
                    />
                </div>
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
