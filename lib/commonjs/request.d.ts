import { RequestParams } from './interfaces';
export declare class Request {
    private apiKey;
    private urlApi;
    private timeout;
    constructor(apiKey: string, urlApi: string, timeout: number);
    call<T>(path?: string, params?: RequestParams): Promise<T>;
}
