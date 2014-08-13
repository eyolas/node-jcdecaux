var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API = require('../'),
    APIKEY = process.env.APIKEY;

describe('getStations', function() {
  describe('goodConfig', function() {
    before(function(done) {
      API.init(APIKEY);
      done();
    });

    it('#getStations(cb)', function(done){
      API.getStations(function(err, result) {
        expect(err).to.be.null;
        result.should.to.be.an('array')
          .with.deep.property('[2]')
            .that.is.an('object');
        done();
      });
    });

    it('promise#getStations()', function(done){
      API.getStations().then(function(result) {
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

  describe('testErrors', function(){

    describe('withBadUrlApi', function(){
      before(function(done) {
        API.init(APIKEY, {urlApi: 'http://google.com'});
        done();
      });


      it('#getStations(cb)', function(done){
        API.getStations(function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it('promise#getContracts()', function(done){
        API.getStations().then(function(result) {
          expect(result).to.be.null;
          done();
        }).catch(function(err) {
          err.should.to.be.an('object');
          done();
        })
      });
    });


    describe('withBadApiKey', function(){
      before(function(done) {
        API.init("LOL");
        done();
      });


      it('#getStations(cb)', function(done){
        API.getStations(function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it('promise#getStations()', function(done){
        API.getStations().then(function(result) {
          expect(result).to.be.null;
          done();
        }).catch(function(err) {
          err.should.to.be.an('object');
          done();
        })
      });
    });
  });
});
