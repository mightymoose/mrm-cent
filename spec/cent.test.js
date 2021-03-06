describe("Cent", function(){
  var Cent, CentBackend, centConfig, subscription, subscriptionHooks;

  beforeEach(module('mrmCent'));

  beforeEach(module(function($provide){
    subscription = {};
    subscription.publish = sinon.spy();
    subscriptionHooks = {};
    subscription.on = function(hook, f){ subscriptionHooks[hook] = f; }

    CentBackend = {};
    CentBackend.configure = sinon.spy();
    CentBackend.subscribe = sinon.stub().returns(subscription);
    CentBackend.connect = sinon.stub();
    CentBackend.on = sinon.stub();

    CentBackend.triggerConnect = function(){
      var lastArgs = CentBackend.on.lastCall.args;
      var connectCallback = lastArgs[1];
      connectCallback();
    };

    CentBackend.triggerMessage = function(msg){
      var lastArgs = CentBackend.subscribe.lastCall.args;
      var messageCallback = lastArgs[1];
      messageCallback(msg);
    };
    centConfig = {};
    $provide.value('CentBackend', CentBackend);
    $provide.value('centConfig', centConfig);
  }));

  describe("with configuration provided", function() {

    beforeEach(inject(function(_centConfig_){
      centConfig = _centConfig_;
      centConfig.url = 'url'
      centConfig.token = 'token'
      centConfig.project = 'project'
      centConfig.user = 'user'
      centConfig.timestamp = 'timestamp'
    }));

    beforeEach(inject(function(_Cent_){
      Cent = _Cent_;
    }));

    it("configures centrifuge", function(){
      expect(CentBackend.configure).to.have.been.calledOnce;
      expect(CentBackend.configure).to.have.been.calledWith(centConfig);
    });

    it("calls CentBackend.connect if a configuration has been provided", function(){
      expect(CentBackend.connect).to.have.been.calledOnce;
    });
  });

  describe("without a configuration", function(){

    beforeEach(inject(function(_Cent_){
      Cent = _Cent_;
    }));

    it("doesn't call CentBackend.connect if a configuration has  notbeen provided", function(){
      expect(CentBackend.connect).not.to.have.been.called;
    });

  });

  describe("Cent.subscribe", function(){
    it("exists", function(){
      expect(Cent.subscribe).to.be.ok;
    });

    it("calls CentBackend.subscribe after connecting", function(){
      Cent.subscribe("channel");
      expect(CentBackend.subscribe).not.to.have.been.called;
      CentBackend.triggerConnect();
      expect(CentBackend.subscribe).to.have.been.calledOnce;
      var lastArgs = CentBackend.subscribe.lastCall.args;
      var channel = lastArgs[0];
      var callback = lastArgs[1];
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
        CentBackend.triggerConnect();
      });

      describe("notification callback", function(){
        var callback;

        beforeEach(function(){
          callback = sinon.spy();
          res.then(angular.noop, angular.noop, callback);
        });

        describe("publish",function(){
          it("exists on the subscription result", function(){
            expect(res).to.have.property('publish');
          });

          it("publishes messages after a successful subscription", function(){
            res.publish('hi');
            expect(subscription.publish).not.to.have.been.called;
            subscriptionHooks['ready']();
            expect(subscription.publish).to.have.been.called;
          });

        });

        it("adds the subscription to the promise", function(){
          expect(res.$subscription).to.eq(subscription);
        });

        it("receives messages", function(){
          CentBackend.triggerMessage('hi');
          expect(callback).to.have.been.calledOnce;
        });

      });

    });

  });

});
