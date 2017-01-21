/**
 * Created by Kyle on 1/21/17.
 */
angular.module('UserSession', [])
  .factory('UserSession', function() {
    var currentSessions = {active:false};
    return {
      get: function(){
        return currentSessions;
      },
      set: function(key,value){
        currentSessions[key] = value;
      }
    };
  })
