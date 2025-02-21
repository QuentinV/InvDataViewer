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
        return (
            <div
                className="relative w-20rem h-6rem pt-1 pb-1 pl-2 pr-4 bg-blue-50 hover:bg-blue-100 text-gray-600 justify-content-center flex flex-column"
                key={cik}
            >
                <div className='flex align-items-center h-full'>
                    <div className={`companyLogo48 ${tickers?.map( t => 't-logo-' + t ).join(' ')}`}></div>
                    <div className='flex flex-column flex-1 h-full'>
                        <div className='flex-1 mt-1 text-center text-primary align-content-center'>{title ?? ''}</div>
                        <div className='flex justify-content-center gap-3 mt-auto'>
                            <Link style={{ textDecoration: 'none' }} className='text-gray-400 hover:text-primary' to={`/company/${cik}`}><i className='pi pi-eye mr-1' />View</Link>
                            <Link 
                                style={{ textDecoration: 'none' }}
                                className='text-gray-400 hover:text-primary'
                                to={`/company/${cik}/edit`}
                                rel="noopener noreferrer"
                                target='_blank'
                            >
                                <i className='pi pi-pencil mr-1' />Edit
                            </Link>
                            <Link 
                                style={{ textDecoration: 'none' }}
                                className='text-gray-400 hover:text-primary'
                                to={`/company/${cik}`}
                                rel="noopener noreferrer"
                                target='_blank'
                            >
                                <i className='pi pi-external-link mr-1' />Tab
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='absolute top-0 right-0 pr-1 pt-1 hover:text-primary'><CompanyFavorite cik={cik} favorite={favorite} /></div>
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
                                'gap-3 align-content-start h-31 rem overflow-auto overflow-x-hidden justify-content-center',
                        },
                        header: { className: 'bg-white border-none' },
                    }}
                    header={header()}
                />
            </div>
    )
}
