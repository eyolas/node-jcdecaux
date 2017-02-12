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
declare module "request" {
    import { RequestParams } from "interfaces";
    export class Request {
        private apiKey;
        private urlApi;
        private timeout;
        constructor(apiKey: string, urlApi: string, timeout: number);
        call<T>(path?: string, params?: RequestParams): Promise<T>;
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
    export const URL_API = "https://api.jcdecaux.com/vls/v1/";
    export const DEFAULT_TIMEOUT = 3000;
    export class JCDecaux {
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
}
declare module "index" {
    export * from "interfaces";
    export * from "jcDecaux";
}
declare module "request.browser" {
    import { RequestParams } from "interfaces";
    export class Request {
        private apiKey;
        private urlApi;
        private timeout;
        constructor(apiKey: string, urlApi: string, timeout: number);
        call<T>(path?: string, params?: RequestParams): Promise<T>;
    }
}
