"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const lang = require("./lang");
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
        this.contractName = contractName;
        this._request = new request_1.Request(apiKey, urlApi, timeout);
    }
    getContracts() {
        return this._request.call('contracts', {});
    }
    getStation(stationId, contractName = this.contractName) {
        if (!lang.isNumber(stationId) || lang.isBlank(stationId))
            throw new Error("stationId can't be null");
        if (lang.isTringBlank(contractName))
            throw new Error("contractName can't be null");
        let params = { contract: contractName };
        return this._request.call(`stations/${stationId}`, params);
    }
    getStations() {
        return this._request.call('stations', {});
    }
    getStationsByContract(contractName = this.contractName) {
        if (lang.isTringBlank(contractName))
            throw new Error("contractName can't be null");
        let params = { contract: contractName };
        return this._request.call(`stations`, params);
    }
}
exports.JCDecaux = JCDecaux;
//# sourceMappingURL=jcDecaux.js.map