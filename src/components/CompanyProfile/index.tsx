import React from 'react';
import { useEffect, useState } from 'react';
import { api } from '../../api/invData';
import { useTranslation } from 'react-i18next';

interface CompanyProfileProps {
    cik: number;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ cik }) => {
    const [profile, setProfile] = useState<string>('');
    const { i18n: { language } } = useTranslation();

    useEffect(() => {
        (async () => {
            const data = await api(`invData/companies/${cik}/profiles?language=${language}`);
            setProfile(data.profile);
        })();
    }, [cik, language])

    return (
        <div>{profile}</div>
    )
}