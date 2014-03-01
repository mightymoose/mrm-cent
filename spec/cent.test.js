describe("cent", function(){
  var cent;

  beforeEach(module('mrmCent'));

  beforeEach(inject(function(_cent_){
    cent = _cent_;
  }));

  it("exists", function(){
    expect(cent).to.be.ok;
  });

});
