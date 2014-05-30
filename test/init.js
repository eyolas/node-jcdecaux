var expect = require('chai').expect,
    should = require('chai').should(),
    API = require('../'),
    APIKEY = process.env.APIKEY,
    defaultUrl = "https://api.jcdecaux.com/vls/v1/";

describe('init', function(){
  describe('goodConfig', function() {
    it('#init(apikey)', function() {
      var fn = function(){ API.init(APIKEY);};
      expect(fn).to.not.throw(Error);

      API.should.to.have.property('apiKey')
        .that.is.an('string')
        .that.deep.equals(APIKEY);

      API.should.to.have.deep.property('contractName', null);

      API.should.to.have.property('urlApi')
        .that.is.an('string')
        .that.deep.equals(defaultUrl);

      API.should.to.have.deep.property('timeout', null);
    });

    it('#init(apikey, {contractName: "lyon"})', function() {
      var fn = function(){
        API.init(APIKEY, {contractName: "lyon"});
      };

      expect(fn).to.not.throw(Error);

      API.should.to.have.property('apiKey')
        .that.is.an('string')
        .that.deep.equals(APIKEY);

      API.should.to.have.property('contractName')
        .that.is.an('string')
        .that.deep.equals('lyon');

      API.should.to.have.property('urlApi')
        .that.is.an('string')
        .that.deep.equals(defaultUrl);

      API.should.to.have.deep.property('timeout', null);
    });

    it('#init(apikey, {contractName: "lyon", urlApi: "http://google.com/"})', function() {
      var fn = function(){
        API.init(APIKEY, {contractName: "lyon", urlApi: "http://google.com/"});
      };

      expect(fn).to.not.throw(Error);

      API.should.to.have.property('apiKey')
        .that.is.an('string')
        .that.deep.equals(APIKEY);

      API.should.to.have.property('contractName')
        .that.is.an('string')
        .that.deep.equals('lyon');

      API.should.to.have.property('urlApi')
        .that.is.an('string')
        .that.deep.equals("http://google.com/");

      API.should.to.have.deep.property('timeout', null);
    });

    it('#init(apikey, {contractName: "lyon", urlApi: "http://google.com/", timeout: 5000})', function() {
      var fn = function(){
        API.init(APIKEY, {contractName: "lyon", urlApi: "http://google.com/", timeout: 5000});
      };

      expect(fn).to.not.throw(Error);

      API.should.to.have.property('apiKey')
        .that.is.an('string')
        .that.deep.equals(APIKEY);

      API.should.to.have.property('contractName')
        .that.is.an('string')
        .that.deep.equals('lyon');

      API.should.to.have.property('urlApi')
        .that.is.an('string')
        .that.deep.equals("http://google.com/");

      API.should.to.have.deep.property('timeout')
        .that.is.an('number')
        .that.deep.equals(5000);
    });
  });

  describe('testErrors', function(){
    it('#init()', function() {
      var fn = function(){
        API.init();
      };

      expect(fn).to.throw(Error, 'ApiKey is mandatory');
    });

    it('#init(42)', function() {
      var fn = function(){
        API.init();
      };

      expect(fn).to.throw(Error, 'ApiKey is mandatory');
    });

    it('#init(apikey, {contractName: 5000})', function() {
      var fn = function(){ API.init(APIKEY, {contractName: 5000});};
      expect(fn).to.throw(Error, 'contractName must be a string');
    });

    it('#init(apikey, {urlApi: 5000})', function() {
      var fn = function(){ API.init(APIKEY, {urlApi: 5000});};
      expect(fn).to.throw(Error, 'urlApi must be a string');
    });

    it('#init(apikey, {urlApi: "google"})', function() {
      var fn = function(){ API.init(APIKEY, {urlApi: "google"});};
      expect(fn).to.throw(Error, 'urlApi must be a valid uri');
    });

    it('#init(apikey, {timeout: "google"})', function() {
      var fn = function(){ API.init(APIKEY, {timeout: "google"});};
      expect(fn).to.throw(Error, 'timeout must be a number');
    });
  });
});
