"use strict";
const request = require("request");
class Request {
    constructor(apiKey, urlApi, timeout) {
        this.apiKey = apiKey;
        this.urlApi = urlApi;
        this.timeout = timeout;
    }
    call(path = '', params = {}) {
        params.apiKey = this.apiKey;
        let options = {
            qs: params,
            json: true
        };
        if (this.timeout) {
            options.timeout = this.timeout;
        }
        return new Promise((resolve, reject) => {
            request
                .get(`${this.urlApi}${path}`, options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error || new Error(body));
                }
            });
        });
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map