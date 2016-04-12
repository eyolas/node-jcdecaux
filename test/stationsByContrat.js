var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').default,
    APIKEY = process.env.APIKEY;

describe('getStationsByContract', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function(done) {
        API = new JCDecaux(APIKEY);
        done();
      });

      it("#getStationsByContract('lyon')", function(done){
        API.getStationsByContract('lyon').then(function(result) {
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
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

      it('promise#getStationsByContract()', function(done){
        API.getStationsByContract().then(function(result) {
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
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

      it("#getStationsByContract()", function(){
        var fn = function() {API.getStationsByContract();};
        expect(fn).to.throw(Error, 'contractName can\'t be null');
      });
    });

    describe('withBadUrlApi', function(){
      before(function(done) {
        API = new JCDecaux(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
        done();
      });

      it("#getStationsByContract()", function(done){
        API.getStationsByContract().then(function(result) {
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

      it("#getStationsByContract('lyon')", function(done){
        API.getStationsByContract('lyon').then(function(result) {
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
