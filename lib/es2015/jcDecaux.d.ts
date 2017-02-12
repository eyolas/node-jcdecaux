import { Contract, Station, JCDecauxParams } from './interfaces';
export declare const URL_API = "https://api.jcdecaux.com/vls/v1/";
export declare const DEFAULT_TIMEOUT = 3000;
export declare class JCDecaux {
    apiKey: string;
    /**
     *  The default contract for all method
     * @type {string}
     */
    contractName: string;
    private _request;
    constructor(apiKey: string, {contractName, urlApi, timeout}?: JCDecauxParams);
    getContracts(): Promise<Contract[]>;
    getStation(stationId: number, contractName?: string): Promise<Station>;
    getStations(): Promise<Station[]>;
    getStationsByContract(contractName?: string): Promise<Station[]>;
}
