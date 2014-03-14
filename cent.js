angular.module('mrmCent', []).provider('centConfig', function(){
  var url, token, project, user;

  this.url = function(u){ url = u; };
  this.token = function(t){ token = t; };
  this.project = function(p){ project = p; };
  this.user = function(u){ user = u; };

  this.$get = function(){
    return {
      url: url,
      token: token,
      project: project,
      user: user
    };
  };
}).factory('CentBackend', function(){
  return new Centrifuge();
}).factory('Cent', function(CentBackend, centConfig, $q, $rootScope){
  var connectDeferred = $q.defer();
  var connect = connectDeferred.promise;
  CentBackend.configure(centConfig);
  CentBackend.connect();

  CentBackend.on('connect', function(){
    $rootScope.$apply(function(){
      connectDeferred.resolve();
    });
  });

  return {
    subscribe: function(channel){
      var deferred = $q.defer();
      var subscriptionDeferred = $q.defer();
      
      deferred.promise.publish = function(msg){
        subscriptionDeferred.promise.then(function(){
          deferred.promise.$subscription.publish(msg);
        });
      };

      connect.then(function(){
        deferred.promise.$subscription = CentBackend.subscribe(channel, function(msg){
          $rootScope.$apply(function(){
            deferred.notify(msg);
          });
        });

        deferred.promise.$subscription.on('ready', function(){
          $rootScope.$apply(function(){
            subscriptionDeferred.resolve();   
          });

        });

      });
      return deferred.promise;
    }
  };
});
