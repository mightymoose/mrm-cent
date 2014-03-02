describe("CentBackend", function(){
  var CentBackend;

  beforeEach(module('mrmCent'));

  beforeEach(inject(function(_CentBackend_){
    CentBackend = _CentBackend_;
  }));

  it("exists", function(){
    expect(CentBackend).to.be.ok;
  });

  it("is a centrifuge object", function(){
    expect(CentBackend).to.have.property("configure");
    expect(CentBackend).to.have.property("connect");
    expect(CentBackend).to.have.property("subscribe");
  });

});
