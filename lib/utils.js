//Modules dependencies
var request = require('request'),
    qs = require('querystring'),
    validUrl = require('valid-url');

//Create quick reference variables for speed access to core prototypes.
var slice = Array.prototype.slice,
    toString = Object.prototype.toString;


exports.isBlank = function isBlank(str) {
    return (!str || /^\s*$/.test(str));
};

exports.makeURL = function makeURL(path, params) {
  if (!params) params = {};
  params.apiKey = this.apiKey;
  var sb = [ this.urlApi, path, '?', qs.stringify(params) ];

  return sb.join('');
};

exports.call = function call(url, deferred, cb) {
  var options = {url: url, json:true};
  if (this.timeout) {
    options.timeout = this.timeout;
  }

  request.get(options, function(err, resp, body) {
    if (err || (200 != resp.statusCode && 404 != resp.statusCode)) {
      var error = new Error(body);
      deferred.reject(error);
      return cb(error, null);
    } else {
      deferred.resolve(body);
      return cb(null, body);
    }

  });
};

/**
 * Fill in a given object with default properties.
 * see http://underscorejs.org/docs/underscore.html#section-87
 */
exports.defaults = function defaults(obj) {
  slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

exports.isString = function isString(obj) {
  return toString.call(obj) == '[object String]';
};

exports.isNumber = function isNumber(obj) {
  return toString.call(obj) == '[object Number]';
};

exports.validateOptions = function validateOptions(options) {
  if (null != options.contractName && !exports.isString(options.contractName)) throw new Error('contractName must be a string');
  if (!exports.isString(options.urlApi)) throw new Error('urlApi must be a string');
  if (!validUrl.isUri(options.urlApi)) throw new Error('urlApi must be a valid uri');
  if (null != options.timeout && !exports.isNumber(options.timeout)) throw new Error('timeout must be a number');
};
