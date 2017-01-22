/**
 * Created by Kyle on 1/21/17.
 */
angular.module('kanplan.services', [])
  //creates a factory to store the user id
  .factory('UserID', function($window) {
    var userID = $window.localStorage['uid'];
    return {
      get: function(){
        if (!userID){
          return null;
        }else return userID;
      },
      set: function(id){
        userID = id;
        $window.localStorage['uid'] = id;
      }
    };
  })
