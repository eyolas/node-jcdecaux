var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API = require('../'),
    APIKEY = process.env.APIKEY;

describe('getContracts', function(){
  describe('goodConfig', function() {
    before(function(done) {
      API.init(APIKEY);
      done();
    });

    it('#getContracts(cb)', function(done){
      API.getContracts(function(err, result) {
        expect(err).to.be.null;
        result.should.to.be.an('array')
          .with.deep.property('[2]')
            .that.is.an('object');
        done();
      });
    });

    it('promise#getContracts()', function(done){
      API.getContracts().then(function(result) {
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
        API.init(APIKEY, {urlApi: "http://google.com"});
        done();
      });


      it('#getContracts(cb)', function(done){
        API.getContracts(function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it('promise#getContracts()', function(done){
        API.getContracts().then(function(result) {
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


      it('#getContracts(cb)', function(done){
        API.getContracts(function(err, result) {
          err.should.to.be.an('object');
          expect(result).to.be.null;
          done();
        });
      });

      it('promise#getContracts()', function(done){
        API.getContracts().then(function(result) {
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
