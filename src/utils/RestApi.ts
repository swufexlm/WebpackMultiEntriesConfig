import * as request from 'request';
import Alert from './Alert';
import HostUtil from './HostUtil';
import Result from '../models/Result';

export const APIS = {
    GetUserMenus: '/api/getUserMenus'
};

const headers = {
    'Content-Type': 'application/json'
};

export class FetchRes<T> {
    error: any;
    value?: T;
}

export async function fetchAPI<Req, Res>(
    api: string,
    params: Req
): Promise<FetchRes<Res>> {
    const url = HostUtil.Host + api;

    return new Promise<FetchRes<Res>>((resolve, reject) => {
        request
            .post(
                {
                    url,
                    headers,
                    method: 'POST',
                    json: params || {},
                    timeout: 30000
                },
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    const res = response.body as Result<Res>;
                    if (!res) {
                        return reject('error response body type');
                    } else if (!res.success) {
                        return reject(res.message);
                    } else {
                        const success = new FetchRes<Res>();
                        success.value = res.data;
                        resolve(success);
                    }
                }
            );
    }).catch(error => {
        Alert.error(JSON.stringify(error));
        const fail = new FetchRes<Res>();
        fail.error = error;
        return fail;
    });
}
