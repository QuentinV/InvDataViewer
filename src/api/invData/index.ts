export const HOST = process.env.REACT_APP_API_HOST;

export const api = (url: string, init?: RequestInit): Promise<Response> => {
    return fetch(`${HOST}/${url}`, {
        ...init,
        headers: [['x-token', localStorage.getItem('token') || ''], ['Content-Type', 'application/json']],
    })
}
