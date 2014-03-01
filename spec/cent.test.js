describe("cent", function(){
  var Cent;

  beforeEach(module('mrmCent'));

  beforeEach(inject(function(_Cent_){
    Cent = _Cent_;
  }));

  it("exists", function(){
    expect(Cent).to.be.ok;
  });

});
