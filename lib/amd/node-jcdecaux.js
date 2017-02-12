define("interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("request", ["require", "exports", "request"], function (require, exports, request) {
    "use strict";
    var Request = (function () {
        function Request(apiKey, urlApi, timeout) {
            this.apiKey = apiKey;
            this.urlApi = urlApi;
            this.timeout = timeout;
        }
        Request.prototype.call = function (path, params) {
            var _this = this;
            if (path === void 0) { path = ''; }
            if (params === void 0) { params = {}; }
            params.apiKey = this.apiKey;
            var options = {
                qs: params,
                json: true
            };
            if (this.timeout) {
                options.timeout = this.timeout;
            }
            return new Promise(function (resolve, reject) {
                request
                    .get("" + _this.urlApi + path, options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(body);
                    }
                    else {
                        reject(error || new Error(body));
                    }
                });
            });
        };
        return Request;
    }());
    exports.Request = Request;
});
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
define("jcDecaux", ["require", "exports", "request", "lang"], function (require, exports, request_1, lang) {
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
            this.contractName = contractName;
            this._request = new request_1.Request(apiKey, urlApi, timeout);
        }
        JCDecaux.prototype.getContracts = function () {
            return this._request.call('contracts', {});
        };
        JCDecaux.prototype.getStation = function (stationId, contractName) {
            if (contractName === void 0) { contractName = this.contractName; }
            if (!lang.isNumber(stationId) || lang.isBlank(stationId))
                throw new Error("stationId can't be null");
            if (lang.isTringBlank(contractName))
                throw new Error("contractName can't be null");
            var params = { contract: contractName };
            return this._request.call("stations/" + stationId, params);
        };
        JCDecaux.prototype.getStations = function () {
            return this._request.call('stations', {});
        };
        JCDecaux.prototype.getStationsByContract = function (contractName) {
            if (contractName === void 0) { contractName = this.contractName; }
            if (lang.isTringBlank(contractName))
                throw new Error("contractName can't be null");
            var params = { contract: contractName };
            return this._request.call("stations", params);
        };
        return JCDecaux;
    }());
    exports.JCDecaux = JCDecaux;
});
define("index", ["require", "exports", "jcDecaux"], function (require, exports, jcDecaux_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(jcDecaux_1);
});
//# sourceMappingURL=node-jcdecaux.js.map