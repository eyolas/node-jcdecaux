var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').JCDecaux,
    APIKEY = process.env.APIKEY;

describe('getStations', function() {
  describe('goodConfig', function() {
    before(function() {
      API = new JCDecaux(APIKEY);
    });

    it('#getStations()', function(){
      this.timeout(3000);
      return API.getStations().then(function(result) {
         result.should.to.be.an('array')
          .with.deep.property('[2]')
            .that.is.an('object');
      }).catch(function(err) {
        expect(err).to.be.null;
      });
    });
  });

  describe('testErrors', function(){

    describe('withBadUrlApi', function(){
      before(function() {
        API = new JCDecaux(APIKEY, {urlApi: 'http://google.com'});
      });

      it('#getContracts()', function(){
        return API.getStations().then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        })
      });
    });

    describe('timeout', function(){
      before(function() {
        API = new JCDecaux(APIKEY, {urlApi: "http://blackhole.webpagetest.org", timeout: 1000});
      });

      it('#getContracts()', function(){
        return API.getStations().then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        })
      });
    });

    describe('withBadApiKey', function(){
      before(function() {
        API = new JCDecaux('BadApiKey');
      });

      it('#getStations()', function(){
        return API.getStations().then(function(result) {
          expect(result).to.be.null;
        }).catch(function(err) {
          err.should.to.be.an('error');
        })
      });
    });
  });
});
