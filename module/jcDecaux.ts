import { Request } from './request';
import * as lang from './lang';
import { Contract, Station, JCDecauxParams } from './interfaces';

export const URL_API = 'https://api.jcdecaux.com/vls/v1/';
export const DEFAULT_TIMEOUT = 3000;

export class JCDecaux {
  /**
   *  The default contract for all method
   * @type {string}
   */
  public contractName: string;

  private _request: Request;


  constructor(
    public apiKey: string,
    { contractName = null, urlApi = URL_API, timeout = DEFAULT_TIMEOUT }: JCDecauxParams = {}
  ) {
    if (!apiKey) throw new Error('ApiKey is mandatory');
    if (null != contractName && lang.isTringBlank(contractName)) throw new Error('contractName must be a string');
    if (lang.isTringBlank(urlApi)) throw new Error('urlApi must be a string');
    if (!lang.isValidUrl(urlApi)) throw new Error('urlApi must be a valid uri');
    if (null != timeout && !lang.isNumber(timeout)) throw new Error('timeout must be a number');

    if (urlApi[urlApi.length - 1] !== '/') {
      urlApi += '/';
    }

    this.contractName = contractName;
    this._request = new Request(apiKey, urlApi, timeout);
  }

  getContracts(): Promise<Contract[]> {
    return this._request.call<Contract[]>('contracts', {});
  }

  getStation(stationId: number, contractName: string = this.contractName): Promise<Station> {
    if (!lang.isNumber(stationId) || lang.isBlank(stationId)) throw new Error("stationId can't be null");
    if (lang.isTringBlank(contractName)) throw new Error("contractName can't be null");

    let params = { contract: contractName };
    return this._request.call<Station>(`stations/${stationId}`, params);
  }

  getStations(): Promise<Station[]> {
    return this._request.call<Station[]>('stations', {});
  }

  getStationsByContract(contractName: string = this.contractName): Promise<Station[]> {
    if (lang.isTringBlank(contractName)) throw new Error("contractName can't be null");
    let params = { contract: contractName };
    return this._request.call<Station[]>(`stations`, params);
  }
}
