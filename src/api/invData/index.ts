//export const HOST = 'http://localhost:3005';
export const HOST = 'https://mymovies.freeboxos.fr:3005';

export const api = (url: string, init?: RequestInit): Promise<Response> => {
    return fetch(`${HOST}/${url}`, {
        ...init,
        headers: [['x-token', localStorage.getItem('token') || ''], ['Content-Type', 'application/json']],
    })
}
