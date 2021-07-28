import axios from 'axios';
import Cookies from 'js-cookie';
const endpoint = "http://localhost:8080/api";


export function get(url) {
    return axios.get(endpoint + url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export function post(url, body) {
    return axios.post(endpoint + url, body, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export function postAuth(url, body) {
    const token = Cookies.get('token');
    return axios.post(endpoint + url, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}

export function putAuth(url, body) {
    const token = Cookies.get('token');
    return axios.put(endpoint + url, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}

export function deleteAuth(url) {
    const token = Cookies.get('token');
    return axios.delete(endpoint + url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}
