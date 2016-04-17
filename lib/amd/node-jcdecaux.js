define("lang", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * REGEX for validation url
     * @see https://github.com/jquense/yup/blob/master/lib/string.js#L12
     * @type {RegExp}
     */
    var REGEX_URL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    /**
     * Checks if value is classified as a String primitive or object.
     * @param  {any}     obj [description]
     * @return {boolean}     [description]
     */
    function isString(obj) {
        return typeof obj === "string";
    }
    exports.isString = isString;
    function isTringBlank(obj) {
        if (!isString(obj)) {
            return true;
        }
        return (!obj || /^\s*$/.test(obj));
    }
    exports.isTringBlank = isTringBlank;
    ;
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    exports.isBlank = isBlank;
    function isNumber(obj) {
        return typeof obj === 'number';
    }
    exports.isNumber = isNumber;
    function isValidUrl(obj) {
        if (isTringBlank(obj)) {
            return false;
        }
        return REGEX_URL.test(obj);
    }
    exports.isValidUrl = isValidUrl;
});
define("interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("index", ["require", "exports", 'superagent', "lang"], function (require, exports, superagent, lang) {
    "use strict";
    exports.URL_API = 'https://api.jcdecaux.com/vls/v1/';
    exports.DEFAULT_TIMEOUT = 3000;
    var JCDecaux = (function () {
        function JCDecaux(apiKey, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.contractName, contractName = _c === void 0 ? null : _c, _d = _b.urlApi, urlApi = _d === void 0 ? exports.URL_API : _d, _e = _b.timeout, timeout = _e === void 0 ? exports.DEFAULT_TIMEOUT : _e;
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
        JCDecaux.prototype.getContracts = function () {
            return this._request('contracts', {});
        };
        JCDecaux.prototype.getStation = function (stationId, contractName) {
            if (contractName === void 0) { contractName = this.contractName; }
            if (!lang.isNumber(stationId) || lang.isBlank(stationId))
                throw new Error("stationId can't be null");
            if (lang.isTringBlank(contractName))
                throw new Error("contractName can't be null");
            var params = { contract: contractName };
            return this._request("stations/" + stationId, params);
        };
        JCDecaux.prototype.getStations = function () {
            return this._request('stations', {});
        };
        JCDecaux.prototype.getStationsByContract = function (contractName) {
            if (contractName === void 0) { contractName = this.contractName; }
            if (lang.isTringBlank(contractName))
                throw new Error("contractName can't be null");
            var params = { contract: contractName };
            return this._request("stations", params);
        };
        JCDecaux.prototype._request = function (path, params) {
            var _this = this;
            if (path === void 0) { path = ''; }
            if (params === void 0) { params = {}; }
            params.apiKey = this.apiKey;
            return new Promise(function (resolve, reject) {
                var req = superagent
                    .get("" + _this.urlApi + path)
                    .query(params);
                if (_this.timeout) {
                    req._timeout = _this.timeout;
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
        };
        return JCDecaux;
    }());
    exports.JCDecaux = JCDecaux;
});
