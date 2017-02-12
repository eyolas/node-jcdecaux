"use strict";
var request = require("request");
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
//# sourceMappingURL=request.js.map