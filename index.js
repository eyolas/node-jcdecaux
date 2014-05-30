var Q = require('q'),
    Args = require('args-js'),
    utils = require('./lib/utils');

function JCDecaux() {
}

/**
 * Init
 */
JCDecaux.prototype.init = function(apiKey, options) {
  if (!apiKey) throw new Error('ApiKey is mandatory');

  var defaultOptions = {
    contractName: null,
    urlApi: "https://api.jcdecaux.com/vls/v1/",
    timeout: null
  };

  options = utils.defaults({}, options || {}, defaultOptions);

  utils.validateOptions(options);

  this.apiKey = apiKey;
  this.urlApi = options.urlApi;
  this.contractName = options.contractName;
  this.timeout = options.timeout;
};

/**
 * Get the contract list
 */
JCDecaux.prototype.getContracts  = function(cb) {
  if (!cb) cb = function(){};

  var deferred = Q.defer(),
      url = utils.makeURL.bind(this, 'stations');

  utils.call(url(), deferred, cb);

  return deferred.promise;
};

/**
 * Get station information
 */
 JCDecaux.prototype.getStation = function(stationId, contractName, cb) {
  var args = Args([
    {stationId:    Args.INT   | Args.Required},
    {contractName: Args.STRING   | Args.Optional, _default: this.contractName},
    {cb:           Args.FUNCTION | Args.Optional, _default: function(){}}
  ], arguments);

  contractName = args.contractName;
  cb = args.cb;

  if (utils.isBlank(stationId)) throw new Error("stationId can't be null");
  if (utils.isBlank(contractName)) throw new Error("contractName can't be null");

  var deferred = Q.defer(),
      params = {contract: contractName},
      url = utils.makeURL.bind(this, 'stations/' + stationId, params);

  utils.call(url(), deferred, cb);

  return deferred.promise;
};

/**
 * Get the station list
 */
JCDecaux.prototype.getStations = function(cb) {
  if (!cb) cb = function(){};

  var deferred = Q.defer(),
      url = utils.makeURL.bind(this, 'stations');

  utils.call(url(), deferred, cb);

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

  if (utils.isBlank(contractName)) throw new Error("contractName can't be null");

  var deferred = Q.defer(),
      params = {contract: contractName},
      url = utils.makeURL.bind(this, 'stations', params);

  utils.call(url(), deferred, cb);

  return deferred.promise;
};

module.exports = exports = new JCDecaux;
