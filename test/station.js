var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').JCDecaux,
    APIKEY = process.env.APIKEY;

describe('getStation', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function() {
        API = new JCDecaux(APIKEY);
      });

      it("#getStation(2010, 'lyon')", function(){
        return API.getStation(2010, 'lyon').then(function(result) {
          result.should.to.be.an('object');
        }).catch(function(err) {
          expect(err).to.be.null;
        });
      });
    });

    describe('withSetContract:lyon', function() {
      before(function() {
        API = new JCDecaux(APIKEY, {contractName: 'lyon'});
      });

      it('#getStation(2010)', function(){
        return API.getStation(2010).then(function(result) {
          result.should.to.be.an('object');
        }).catch(function(err) {
          expect(err).to.be.null;
        });
      });
    });
  });

  describe('testErrors', function() {
    describe('withoutSetContract', function() {
      before(function() {
        API = new JCDecaux(APIKEY);
      });

      it("#getStation('lyon')", function(){
        var fn = function() {API.getStation('lyon');};
        expect(fn).to.throw(Error, 'stationId can\'t be null');
      });

      it("#getStation(2010)", function(){
        var fn = function() {API.getStation(2010);};
        expect(fn).to.throw(Error, 'contractName can\'t be null');
      });
    });

    describe('withSetContract:lyon', function() {
      before(function() {
        API = new JCDecaux(APIKEY, {contractName: 'lyon'});
      });
    });

    describe('withBadUrlApi', function(){
      before(function() {
        API = new JCDecaux(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
      });

      it("#getStation(2010, 'lyon')", function(){
        return API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        });
      });
    });

    describe('withBadApiKey', function(){
      before(function() {
        API = new JCDecaux('BadApiKey');
      });

      it("#getStation(2010, 'lyon')", function(){
        return API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        });
      });
    });
  });
});
