var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API = require('../'),
    APIKEY = process.env.APIKEY;

describe('getStationsByContract', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function(done) {
        API.init(APIKEY);
        done();
      });

      it("#getStationsByContract('lyon', cb)", function(done){
        API.getStationsByContract('lyon', function(err, result) {
          expect(err).to.be.null;
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
          done();
        });
      });

      it("promise#getStationsByContract('lyon')", function(done){
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
        API.init(APIKEY, {contractName: 'lyon'});
        done();
      });

      it('#getStationsByContract(cb)', function(done){
        API.getStationsByContract(function(err, result) {
          expect(err).to.be.null;
          result.should.to.be.an('array')
            .with.deep.property('[2]')
              .that.is.an('object');
          done();
        });
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
        API.init(APIKEY);
        done();
      });

      it("#getStationsByContract(cb)", function(){
        var fn = function() {API.getStationsByContract();};
        expect(fn).to.throw(Error, 'contractName can\'t be null');
      });
    });

    describe('withBadUrlApi', function(){
      before(function(done) {
      API.init(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
        done();
      });

      it("#getStationsByContract(cb)", function(done){
        API.getStationsByContract(function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it("promise#getStationsByContract()", function(done){
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
        API.init("LOL");
        done();
      });
      it("#getStationsByContract('lyon', cb)", function(done){
        API.getStationsByContract('lyon', function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it("promise#getStationsByContract('lyon')", function(done){
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
