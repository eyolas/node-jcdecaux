"use strict";
const superagent = require('superagent');
const lang = require('./lang');
exports.URL_API = 'https://api.jcdecaux.com/vls/v1/';
exports.DEFAULT_TIMEOUT = 3000;
class JCDecaux {
    constructor(apiKey, { contractName = null, urlApi = exports.URL_API, timeout = exports.DEFAULT_TIMEOUT } = {}) {
        this.apiKey = apiKey;
        if (!apiKey)
            throw new Error('ApiKey is mandatory');
        if (null != contractName && lang.isTringBlank(contractName))
            throw new Error('contractName must be a string');
        if (lang.isTringBlank(urlApi))
            throw new Error('urlApi must be a string');
        if (!lang.isValidUrl(urlApi))
            throw new Error('urlApi must be a valid uri');
        if (null != timeout && !lang.isNumber(timeout))
            throw new Error('timeout must be a number');
        if (urlApi[urlApi.length - 1] !== '/') {
            urlApi += '/';
        }
        this.urlApi = urlApi;
        this.contractName = contractName;
        this.timeout = timeout;
    }
    getContracts() {
        return this._request('contracts', {});
    }
    getStation(stationId, contractName = this.contractName) {
        if (!lang.isNumber(stationId) || lang.isBlank(stationId))
            throw new Error("stationId can't be null");
        if (lang.isTringBlank(contractName))
            throw new Error("contractName can't be null");
        let params = { contract: contractName };
        return this._request(`stations/${stationId}`, params);
    }
    getStations() {
        return this._request('stations', {});
    }
    getStationsByContract(contractName = this.contractName) {
        if (lang.isTringBlank(contractName))
            throw new Error("contractName can't be null");
        let params = { contract: contractName };
        return this._request(`stations`, params);
    }
    _request(path = '', params = {}) {
        params.apiKey = this.apiKey;
        return new Promise((resolve, reject) => {
            let req = superagent
                .get(`${this.urlApi}${path}`)
                .query(params);
            if (this.timeout) {
                req._timeout = this.timeout;
            }
            req.end(function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.body);
                }
            });
        });
    }
}
exports.JCDecaux = JCDecaux;
