  import * as request from 'request';
  import { RequestParams } from './interfaces';


export class Request {

    constructor(private apiKey: string, private urlApi: string, private timeout: number) {
    }

  call<T>(path: string = '', params: RequestParams = {}): Promise < T > {
    params.apiKey = this.apiKey;
    let options: request.CoreOptions = {
        qs: params,
        json: true
    };

    if(this.timeout) {
        options.timeout = this.timeout;
    }
    
    return new Promise<Object>((resolve, reject) => {
        request
            .get(`${this.urlApi}${path}`, options, (error: any, response: request.RequestResponse, body: any) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error || new Error(body));
                }
            });
    });
}
}