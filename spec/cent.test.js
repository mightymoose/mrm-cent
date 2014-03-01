describe("Cent", function(){
  var Cent, CentBackend, centConfig;

  beforeEach(module('mrmCent'));

  beforeEach(module(function($provide){
    CentBackend = {};
    CentBackend.configure = sinon.spy()
    CentBackend.subscribe = sinon.spy()
    CentBackend.triggerMessage = function(msg){
      var lastArgs = CentBackend.subscribe.lastCall.args;
      var messageCallback = lastArgs[1];
      messageCallback(msg);
    }
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

  describe("Cent.subscribe", function(){
    it("exists", function(){
      expect(Cent.subscribe).to.be.ok;
    });

    it("calls CentBackend.subscribe", function(){
      Cent.subscribe("channel");
      var lastArgs = CentBackend.subscribe.lastCall.args;
      var channel = lastArgs[0];
      var callback = lastArgs[1];
      expect(CentBackend.subscribe).to.have.been.calledOnce;
      expect(channel).to.eq("channel");
      expect(callback).to.be.a("function");
    });

    it("returns an angular promise", function(){
      var res = Cent.subscribe("channel");
      expect(res).to.have.property("then");
      expect(res).to.have.property("catch");
      expect(res).to.have.property("finally");
    });

    describe("the result of Cent.subscribe", function(){
      var res;
      beforeEach(function(){
        res = Cent.subscribe('channel');
      });

      describe("notification callback", function(){
        var callback;

        beforeEach(function(){
          callback = sinon.spy();
          res.then(angular.noop, angular.noop, callback);
        });

        it("receives messages", function(){
          CentBackend.triggerMessage('hi');
          expect(callback).to.have.been.calledOnce;
        });

      });

    });

  });

});
