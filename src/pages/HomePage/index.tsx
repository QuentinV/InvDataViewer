import React, { useEffect, useState, useRef } from 'react'
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';

interface Company {
    ticker: string;
    title: string;
}

export const HomePage: React.FC = () => {
    const ds = useRef(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [opts, setOpts] = useState({ first: 0, rows: 25 });
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch(`http://192.168.1.85:18800/invData/tickers`, { 
            headers: [ ['x-token', localStorage.getItem('token' ) || ''] ] 
        }).then( async res => {
            const data = (await res.json()).filter( (i: Company) => i.title.toLowerCase().indexOf( filter.toLowerCase() ) !== -1 ).sort( (a: Company, b: Company) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            const value = data.slice(opts.first, opts.first + opts.rows);
            setCompanies(value);
            setTotal(data.length);
        })
    }, [opts, filter]);

    const onPageChange = async ({ first, rows }: { first: number; rows: number }) => setOpts({ first, rows });

    const itemTemplate = ({title, ticker}: Company) => {
        const name = title.toLowerCase();
        return (
            <div className="w-20rem h-3rem pt-5 pb-5 pl-2 pr-2 bg-blue-50 hover:bg-blue-100 text-center cursor-pointer align-items-center justify-content-center flex" key={ticker}>
                {name[0].toUpperCase() + name.slice(1)}
            </div>
        );
    };

    const header = () => {
        return <div className='flex'>
            <Paginator className='w-max ml-8 bg-white border-none' first={opts.first} rows={opts.rows} totalRecords={total} rowsPerPageOptions={[25, 50, 100, 200]} onPageChange={onPageChange} />
            <InputText className='ml-auto' placeholder="Search..." type="text" onChange={(event) => setFilter(event.currentTarget.value) }  />
        </div>
    }

    return (
        <div className='m-auto flex flex-column w-full'>
            <h3 className='text-center'>Companies</h3>
            <div className="card pl-5 pr-5 w-full">
                <DataView ref={ds} value={companies} rows={50} itemTemplate={itemTemplate} pt={{
                    grid: { className: 'gap-3 align-content-start h-30rem overflow-auto overflow-x-hidden justify-content-center' },
                    header: { className: 'bg-white border-none' }
                }} header={header()} />
            </div>
        </div>
    )
};