declare module "interfaces" {
    export interface JCDecauxParams {
        contractName?: string;
        urlApi?: string;
        timeout?: number;
    }
    export interface RequestParams {
        apiKey?: string;
        contract?: string;
    }
    export interface Position {
        lat: number;
        lng: number;
    }
    export interface Contract {
        name: string;
        commercial_name: string;
        country_code: string;
        cities: Array<string>;
    }
    export interface Station {
        number: number;
        name: string;
        address: string;
        position: Position;
        banking: boolean;
        bonus: boolean;
        status: string;
        contract_name: string;
        bike_stands: number;
        available_bike_stands: number;
        available_bikes: number;
        last_update: number;
    }
}
declare module "lang" {
    /**
     * Checks if value is classified as a String primitive or object.
     * @param  {any}     obj [description]
     * @return {boolean}     [description]
     */
    export function isString(obj: any): boolean;
    export function isTringBlank(obj: any): boolean;
    export function isBlank(obj: any): boolean;
    export function isNumber(obj: any): boolean;
    export function isValidUrl(obj: any): boolean;
}
declare module "jcDecaux" {
    import { Contract, Station, JCDecauxParams } from "interfaces";
    export const URL_API: string;
    export const DEFAULT_TIMEOUT: number;
    export class JCDecaux {
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
}
declare module "index" {
    export * from "interfaces";
    export * from "jcDecaux";
}
