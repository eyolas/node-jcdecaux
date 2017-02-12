var expect = require('chai').expect,
    should = require('chai').should(),
    API,
    JCDecaux = require('../').JCDecaux,
    APIKEY = process.env.APIKEY,
    DEFAULT_TIMEOUT = require('../').DEFAULT_TIMEOUT,
    URL_API = require('../').URL_API;

describe('init', function(){
  describe('testErrors', function(){
    it('#init()', function() {
      var fn = function(){
        API = new JCDecaux();
      };

      expect(fn).to.throw(Error, 'ApiKey is mandatory');
    });

    it('#init(42)', function() {
      var fn = function(){
        API = new JCDecaux();
      };

      expect(fn).to.throw(Error, 'ApiKey is mandatory');
    });

    it('#init(apikey, {contractName: 5000})', function() {
      var fn = function(){ API = new JCDecaux(APIKEY, {contractName: 5000});};
      expect(fn).to.throw(Error, 'contractName must be a string');
    });

    it('#init(apikey, {urlApi: 5000})', function() {
      var fn = function(){ API = new JCDecaux(APIKEY, {urlApi: 5000});};
      expect(fn).to.throw(Error, 'urlApi must be a string');
    });

    it('#init(apikey, {urlApi: "google"})', function() {
      var fn = function(){ API = new JCDecaux(APIKEY, {urlApi: "google"});};
      expect(fn).to.throw(Error, 'urlApi must be a valid uri');
    });

    it('#init(apikey, {timeout: "google"})', function() {
      var fn = function(){ API = new JCDecaux(APIKEY, {timeout: "google"});};
      expect(fn).to.throw(Error, 'timeout must be a number');
    });
  });
});
