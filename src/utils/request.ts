import axios, { Method } from 'axios';
import { getConfig } from './get-config';
import { async } from 'rxjs';

const request = async ({ url, option = {} }) => {
    try {
        return axios.request({
            url,
            ...option
        })
    } catch (error) {
        throw error
    }
}

interface IMethodVersion {
    url: string;
    method: Method;
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
}

export interface IRequest {
    data: any;
    code: number;
}

const methodVersion = async ({ url, method, headers, params, query }: IMethodVersion): Promise<IRequest> => {
    let sendUrl = ''
    if (/^(http:\/\/|https:\/\/)/.test(url)) {
        sendUrl = url
    } else {
        sendUrl = `${getConfig().API_URL}${url}`
    }

    try {
        return new Promise((resolve, reject) => {
            axios({
                url: sendUrl,
                method,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    ...headers
                },
                params: query,
                data: {
                    ...params
                }
            }).then(({ data, status }) => {
                resolve({
                    data,
                    code: status
                })
            }).catch(error => {
                reject(error)
            })
        })
    } catch (error) {
        throw error
    }
}

export {
    request,
    methodVersion
}