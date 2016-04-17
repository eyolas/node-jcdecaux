var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').JCDecaux,
    APIKEY = process.env.APIKEY;

describe('getStationsByContract', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function() {
        API = new JCDecaux(APIKEY);
      });

      it("#getStationsByContract('lyon')", function(){
        return API.getStationsByContract('lyon').then(function(result) {
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
        }).catch(function(err) {
          expect(err).to.be.null;
        });
      });
    });

    describe('withSetContract:lyon', function() {
      before(function() {
        API = new JCDecaux(APIKEY, {contractName: 'lyon'});
      });

      it('promise#getStationsByContract()', function(){
        return API.getStationsByContract().then(function(result) {
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
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

      it("#getStationsByContract()", function(){
        var fn = function() {API.getStationsByContract();};
        expect(fn).to.throw(Error, 'contractName can\'t be null');
      });
    });

    describe('withBadUrlApi', function(){
      before(function() {
        API = new JCDecaux(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
      });

      it("#getStationsByContract()", function(){
        API.getStationsByContract().then(function(result) {
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

      it("#getStationsByContract('lyon')", function(){
        API.getStationsByContract('lyon').then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        });
      });
    });
  });
});
