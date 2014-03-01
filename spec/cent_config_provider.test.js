describe("centConfig", function(){
  var centConfigProvider;

  beforeEach(module('mrmCent'));

  beforeEach(module(function(_centConfigProvider_){
    centConfigProvider = _centConfigProvider_;
  }));

  it("exists", inject(function(centConfig){
    expect(centConfigProvider).to.be.ok;
  }));

});
