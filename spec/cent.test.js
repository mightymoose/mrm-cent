describe("Cent", function(){
  var Cent, CentBackend, centConfig;

  beforeEach(module('mrmCent'));

  beforeEach(module(function($provide){
    CentBackend = { configure: sinon.spy() };
    centConfig = {};
    $provide.value('CentBackend', CentBackend);
    $provide.value('centConfig', centConfig);
  }));

  beforeEach(inject(function(_Cent_, _centConfig_){
    Cent = _Cent_;
    centConfig = _centConfig_;
  }));

  it("exists", function(){
    expect(Cent).to.be.ok;
  });

  it("configures centrifuge", function(){
    expect(CentBackend.configure).to.have.been.calledOnce;
    expect(CentBackend.configure).to.have.been.calledWith(centConfig);
  });

});
