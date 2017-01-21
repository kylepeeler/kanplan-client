/**
 * Created by Kyle on 1/21/17.
 */
angular.module('userLogin').component('userLogin', {
  templateUrl: 'login/login.template.html',
  controller: ['$scope', '$http', '$state', 'UserSession',
    function userLogin($scope, $http, $state, UserSession) {
      $scope.email = "";
      $scope.password = "";

      $scope.login = function(email, password) {
        var user = {
          email: email,
          password: password
        };
        _httpPostLogin(email, password);
      };

      function _httpPostLogin(user){
        var request = {
          method : "POST",
          url : "http://52.14.22.20:3000/login",
          headers : {
            'content-type' : 'application/json'
          },
          data : {
            email : user.email,
            password : user.password
          }
        };

        $http(request).then(
          function(res){
            if(res.status === 200){
              UserSession.set("user",res.data);
              UserSession.set("active", true);
              alert("success!" + res.data);
            }
            console.dir(res)
          },
          function(res){
            alert('error: ' + res);
          });
      }
    }
  ]
});

