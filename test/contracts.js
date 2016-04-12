var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    API,
    JCDecaux = require('../').default,
    APIKEY = process.env.APIKEY;

describe('getContracts', function(){
  describe('goodConfig', function() {
    before(function(done) {
      API = new JCDecaux(APIKEY);
      done();
    });

    it('#getContracts()', function(done){
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
        API = new JCDecaux(APIKEY, {urlApi: "http://google.com"});
        done();
      });

      it('#getContracts()', function(done){
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
        API = new JCDecaux("badApiKey");
        done();
      });

      it('#getContracts()', function(done){
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
