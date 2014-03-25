describe("centConfig", function(){
  var centConfigProvider;

  beforeEach(module('mrmCent'));

  beforeEach(module(function(_centConfigProvider_){
    centConfigProvider = _centConfigProvider_;
  }));

  it("exists", inject(function(centConfig){
    expect(centConfigProvider).to.be.ok;
  }));

  describe("configuration", function(){
    var centConfig;

    beforeEach(module(function(){
      centConfigProvider.url('url');
      centConfigProvider.token('token');
      centConfigProvider.project('project');
      centConfigProvider.user('user');
      centConfigProvider.timestamp('timestamp');
    }));

    beforeEach(inject(function(_centConfig_){
      centConfig = _centConfig_;
    }));

    it("sets the timestamp", function(){
      expect(centConfig.timestamp).to.eq('timestamp');
    });

    it("sets the url", function(){
      expect(centConfig.url).to.eq('url');
    });

    it("sets the token", function(){
      expect(centConfig.token).to.eq('token');
    });

    it("sets the project", function(){
      expect(centConfig.project).to.eq('project');
    });

    it("sets the user", function(){
      expect(centConfig.user).to.eq('user');
    });

  });

});
