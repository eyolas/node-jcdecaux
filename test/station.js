var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').default,
    APIKEY = process.env.APIKEY;

describe('getStation', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function(done) {
        API = new JCDecaux(APIKEY);
        done();
      });

      it("#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          result.should.to.be.an('object');
          done();
        }).catch(function(err) {
          expect(err).to.be.null;
          done();
        });
      });
    });

    describe('withSetContract:lyon', function() {
      before(function(done) {
        API = new JCDecaux(APIKEY, {contractName: 'lyon'});
        done();
      });

      it('#getStation(2010)', function(done){
        API.getStation(2010).then(function(result) {
          result.should.to.be.an('object');
          done();
        }).catch(function(err) {
          expect(err).to.be.null;
          done();
        });
      });
    });
  });

  describe('testErrors', function() {
    describe('withoutSetContract', function() {
      before(function(done) {
        API = new JCDecaux(APIKEY);
        done();
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
      before(function(done) {
        API = new JCDecaux(APIKEY, {contractName: 'lyon'});
        done();
      });
    });

    describe('withBadUrlApi', function(){
      before(function(done) {
        API = new JCDecaux(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
        done();
      });

      it("#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
          done();
        }).catch(function(err) {
          err.should.to.be.an('object');
          done();
        });
      });
    });

    describe('withBadApiKey', function(){
      before(function(done) {
        API = new JCDecaux('BadApiKey');
        done();
      });

      it("#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
          done();
        }).catch(function(err) {
          err.should.to.be.an('object');
          done();
        });
      });
    });
  });
});
