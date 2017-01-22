/**
 * Created by Kyle on 1/21/17.
 */
angular.module('kanplan.services', [])
.factory('UserID', function() {
    var userID = "";
    return {
        get: function(){
            if (!userID) {
            return null;
            }else return userID;
        },
        set: function(id){
        userID = id;
        }
    };
})
.factory('Tasks', function($http, $rootScope){
      var self = $rootScope;
    return {
      get: function(orgId, state){
        var tasksQuery = {
                method: "get",
                url: "http://52.14.22.20:3000/tasks/" + orgId + "?state=" + state
        };

        $http(tasksQuery).then(
            function(res){
                if(res.status === 200){
                    console.log("tasks loaded");
                    console.log(res);
                    return res;
                }else{
                    console.log("could not load tasks");
                    return null;
                }
            }
        );
      },
      set: function(key, task){
        tasks[key] = task; // set the tasks given from the back end to our array
      },
      deleteTask: function(){
        console.log('need to delete');
      },
      submitTask: function(){
         console.log('need to submit');
      }
    };
   
});


