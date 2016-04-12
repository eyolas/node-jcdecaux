import * as superagent from 'superagent';
import * as lang from './lang';
import {Contract, Station, JCDecauxParams, RequestParams} from './interfaces';

const URL_API = 'https://api.jcdecaux.com/vls/v1/';

const DEFAULT_OPTIONS = {
    contractName: null,
    urlApi: "https://api.jcdecaux.com/vls/v1/",
    timeout: null
};

export default class JCDecaux {
  public urlApi: string;
  public contractName: string;
  public timeout: number;

  constructor(
    public apiKey: string,
    { contractName = null, urlApi = URL_API, timeout = null }: JCDecauxParams = {}
  ) {
    if (!apiKey) throw new Error('ApiKey is mandatory');
    if (null != contractName && lang.isTringBlank(contractName)) throw new Error('contractName must be a string');
    if (lang.isTringBlank(urlApi)) throw new Error('urlApi must be a string');
    if (!lang.isValidUrl(urlApi)) throw new Error('urlApi must be a valid uri');
    if (null != timeout && !lang.isNumber(timeout)) throw new Error('timeout must be a number');

    this.urlApi = urlApi;
    this.contractName = contractName;
    this.timeout = timeout;
  }

  getContracts(): Promise<Array<Contract>> {
    return this._request('contracts', {});
  }

  getStation(stationId: number, contractName: string = this.contractName): Promise<Station> {
    if (!lang.isNumber(stationId) || lang.isBlank(stationId)) throw new Error("stationId can't be null");
    if (lang.isTringBlank(contractName)) throw new Error("contractName can't be null");

    let params = { contract: contractName };
    return this._request(`stations/${stationId}`, params);
  }

  getStations(): Promise<Array<Station>> {
    return this._request('stations', {});
  }

  getStationsByContract(contractName: string = this.contractName): Promise<Array<Station>> {
    if (lang.isTringBlank(contractName)) throw new Error("contractName can't be null");
    let params = { contract: contractName };
    return this._request(`stations`, params);
  }

  private _request(path: string = '', params: RequestParams = {}): Promise<Object> {
    params.apiKey = this.apiKey;

    return new Promise<superagent.Response>((resolve, reject) => {
      let req = superagent
        .get(`${this.urlApi}${path}`)
        .query(params)
         .end(function(err, res){
           if (err) {
             reject(err);
           } else {
             resolve(res.body);
           }
         });

        if (this.timeout) {
          req.timeout(this.timeout);
        }
    });
  }
}
