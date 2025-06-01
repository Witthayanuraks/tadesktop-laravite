import axios from "axios";

export function api() {
    return axios.create({
        baseURL : 'http://localhost:8000/api',
    })
}
export function apiAuth(token) {
    return axios.create({
        baseURL : 'http://localhost:8000/api',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}