import * as superagent from 'superagent';
import { RequestParams } from './interfaces';


export class Request {

    constructor(private apiKey: string, private urlApi: string, private timeout: number) {
    }

    call<T>(path: string = '', params: RequestParams = {}): Promise<T> {
        params.apiKey = this.apiKey;

        return new Promise<T>((resolve, reject) => {
            let req = superagent
                .get(`${this.urlApi}${path}`)
                .query(params);

            if (this.timeout) {
                (req as any)._timeout = this.timeout;
            }

            req.end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
        });
    }
}