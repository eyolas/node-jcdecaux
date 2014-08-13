var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API = require('../'),
    APIKEY = process.env.APIKEY;

describe('getStation', function() {
  describe('goodconfig', function() {
    describe('withoutSetContract', function() {
      before(function(done) {
        API.init(APIKEY);
        done();
      });

      it("#getStation(2010, 'lyon', cb)", function(done){
        API.getStation(2010, 'lyon', function(err, result) {
          expect(err).to.be.null;
          result.should.to.be.an('object');
          done();
        });
      });

      it("promise#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          result.should.to.be.an('object');
          done();
        }).fail(function(err) {
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

      it('#getStation(2010, cb)', function(done){
        API.getStation(2010, function(err, result) {
          expect(err).to.be.null;
          result.should.to.be.an('object');
          done();
        });
      });

      it('promise#getStation(2010)', function(done){
        API.getStation(2010).then(function(result) {
          result.should.to.be.an('object');
          done();
        }).fail(function(err) {
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

      it("#getStation('lyon')", function(){
        var fn = function() {API.getStation('lyon');};
        expect(fn).to.throw(Error, 'Argument 0 (stationId) should be type Int, but it was type string with value lyon.');
      });

      it("#getStation(2010)", function(){
        var fn = function() {API.getStation(2010);};
        expect(fn).to.throw(Error, 'contractName can\'t be null');
      });
    });

    describe('withSetContract:lyon', function() {
      before(function(done) {
        API.init(APIKEY, {contractName: 'lyon'});
        done();
      });

      it("#getStation(cb)", function(){
        var fn = function() {API.getStation('lyon');};
        expect(fn).to.throw(Error, 'Argument 0 (stationId) should be type Int, but it was type string with value lyon.');
      });
    });

    describe('withBadUrlApi', function(){
      before(function(done) {
        API.init(APIKEY, {contractName: 'lyon', urlApi: 'http://google.com'});
        done();
      });

      it("#getStation(2010, 'lyon', cb)", function(done){
        API.getStation(2010, 'lyon', function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it("promise#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
          done();
        }).fail(function(err) {
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
      it("#getStation(2010, 'lyon', cb)", function(done){
        API.getStation(2010, 'lyon', function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it("promise#getStation(2010, 'lyon')", function(done){
        API.getStation(2010, 'lyon').then(function(result) {
          expect(result).to.be.null;
          done();
        }).fail(function(err) {
          err.should.to.be.an('object');
          done();
        });
      });
    });
  });
});
