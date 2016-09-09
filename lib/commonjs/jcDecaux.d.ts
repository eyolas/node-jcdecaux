import { Contract, Station, JCDecauxParams } from './interfaces';
export declare const URL_API: string;
export declare const DEFAULT_TIMEOUT: number;
export declare class JCDecaux {
    apiKey: string;
    /**
     * Url of JCDecaux api
     * @type {string}
     */
    urlApi: string;
    /**
     *  The default contract for all method
     * @type {string}
     */
    contractName: string;
    /**
     * The number of milliseconds to wait for a request to respond before aborting the request
     * @type {number}
     */
    timeout: number;
    constructor(apiKey: string, {contractName, urlApi, timeout}?: JCDecauxParams);
    getContracts(): Promise<Array<Contract>>;
    getStation(stationId: number, contractName?: string): Promise<Station>;
    getStations(): Promise<Array<Station>>;
    getStationsByContract(contractName?: string): Promise<Array<Station>>;
    private _request(path?, params?);
}
