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
}).value('Cent', {});
