export const HOST = 'http://mymovies.freeboxos.fr:18800';

export const api = (url: string, init?: RequestInit): Promise<Response> => {
    return fetch(`${HOST}/${url}`, { ...init,  headers: [ ['x-token', localStorage.getItem('token' ) || ''] ] })
}