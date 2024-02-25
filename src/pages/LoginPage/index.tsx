import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Navigate } from 'react-router'

type Inputs = {
    login: string
    password: string
}

export const LoginPage: React.FC = () => {
    const [hasToken, setHasToken] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const res = await fetch('http://192.168.1.85:18800/login', { method: 'POST', body: JSON.stringify(data) })
        const json = await res.json();
        if ( json?.token ) {
            localStorage.setItem("token", json.token);
            setHasToken(true);
        }
    };

    if ( hasToken ) {
        return <Navigate to='/' />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("login", { required: true })} />
            <input {...register("password", { required: true })} type='password' />
            {(errors.login || errors.password) && <span>Missing required fields</span>}

            <input type="submit" />
        </form>
    );
};