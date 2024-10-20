import React, { useEffect } from 'react'
import { api } from '../../api/invData'
import { CompaniesList } from '../../components/CompaniesList'
import { useTranslation } from 'react-i18next';

const getCompanies = ({ opts, filter }: { opts: any, filter: any }) => api(`invData/companies?first=${opts.first}&rows=${opts.rows}&q=${filter.toLocaleLowerCase()}`);

export const HomePage: React.FC = () => {
    const { t } = useTranslation()
    
    useEffect(() => {
        document.title = "Map of wonders";
    }, []);

    return (
        <div className="m-auto flex flex-column w-full overflow-auto">
            <h3 className="text-center">{t('home.title')}</h3>
            <CompaniesList onLoad={getCompanies} />
        </div>

    );
}
