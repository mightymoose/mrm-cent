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
      connect.then(function(){
        CentBackend.subscribe(channel, function(msg){
          $rootScope.$apply(function(){
            deferred.notify(msg);
          });
        });
      });
      return deferred.promise;
    }
  };
});
