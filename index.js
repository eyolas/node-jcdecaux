var request = require('request'),
    qs = require('querystring'),
    Q = require('q'),
    Args = require('args-js');

function JCDecaux() {
}

/**
 * Init
 */
JCDecaux.prototype.init = function(apiKey, contractName, urlApi) {
  var args = Args([
    {apiKey:       Args.STRING | Args.Required},
    {contractName: Args.STRING | Args.Optional, _default: null},
    {urlApi:       Args.STRING | Args.Optional, _default: "https://api.jcdecaux.com/vls/v1/"}
  ], arguments);

  this.apiKey = args.apiKey;
  this.urlApi = args.urlApi;
  this.contractName = args.contractName;
};

/**
 * Get the contract list
 */
JCDecaux.prototype.getContracts  = function(cb) {
  if (!cb) cb = function(){};

  var deferred = Q.defer(),
      url = makeURL.bind(this, 'stations');

  call(url(), deferred, cb);

  return deferred.promise;
};

/**
 * Get station information
 */
 JCDecaux.prototype.getStation = function(stationId, contractName, cb) {
  var args = Args([
    {stationId:    Args.STRING   | Args.Required},
    {contractName: Args.STRING   | Args.Optional, _default: this.contractName},
    {cb:           Args.FUNCTION | Args.Optional, _default: function(){}}
  ], arguments);

  contractName = args.contractName;
  cb = args.cb;

  if (isBlank(stationId)) throw new Error("stationId can't be null");
  if (isBlank(contractName)) throw new Error("contractName can't be null");

  var deferred = Q.defer(),
      params = {contract: contractName},
      url = makeURL.bind(this, 'stations/' + stationId, params);

  call(url(), deferred, cb);

  return deferred.promise;
};

/**
 * Get the station list
 */
JCDecaux.prototype.getStations = function(cb) {
  if (!cb) cb = function(){};

  var deferred = Q.defer(),
      url = makeURL.bind(this, 'stations');

  call(url(), deferred, cb);

  return deferred.promise;
};

/**
 * Get the stations of a contract
 */
JCDecaux.prototype.getStationsByContract = function(contractName, cb) {
  var args = Args([
    {contractName: Args.STRING   | Args.Optional, _default: this.contractName},
    {cb:           Args.FUNCTION | Args.Optional, _default: function(){}}
  ], arguments);

  contractName = args.contractName;
  cb = args.cb;

  if (isBlank(contractName)) throw new Error("contractName can't be null");

  var deferred = Q.defer(),
      params = {contract: contractName},
      url = makeURL.bind(this, 'stations', params);

  call(url(), deferred, cb);

  return deferred.promise;
};



function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function makeURL(path, params) {
  if (!params) params = {};
  params.apiKey = this.apiKey;
  var sb = [ this.urlApi, path, '?', qs.stringify(params) ];

  return sb.join('');
}

function call(url, deferred, cb) {
  request.get(url, function(err, resp, body) {
    if (err || (200 != resp.statusCode && 404 != resp.statusCode)) {
      var error = new Error(body);
      deferred.reject(error);
      return cb(error, null);
    } else {
      deferred.resolve(body);
      return cb(null, body);
    }

  });
}


module.exports = exports = new JCDecaux;
