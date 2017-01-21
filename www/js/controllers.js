angular.module('kanplan.controllers', [])

// Loging control //UserSession?
.controller('LoginCtrl', function($scope, $http, $state ){
  $scope.email;
  $scope.password;

  $scope.login = function(email,password){
    var user = {
      email: email,
      password:password
    };
    _httpPostLogin(user)
  }

  function _httpPostLogin(user){
    var request = {
      method : "POST",
      url : "http://52.14.22.20:3000/user/login",
      headers : {
        'content-type' : 'application/json'
      },
      data : {
        email : user.email,
        password : user.password
      }
    };

    $http(request).then(
        function(){
            console.log("Posted to user/login");
        }
    );
      /*function(res){
        if(res.status === 200){
          UserSession.set("user",res.data);
          UserSession.set("active", true);
          $state.go('chat');
        }
        console.dir(res)
      },
       function(res){
         $state.go('error');
    }); */
  }
})

.controller('SignUpCtrl', function($scope, $http, $state){
  $scope.user = {
    name: "",
    email: "",
    password: ""
  };

  $scope.signUp = function(name,email,password){
    $scope.user.name = name;
    $scope.user.email = email;
    $scope.user.password = password;

    console.log("username: " + name);
    console.log("email: " + email);
    console.log("password: " + password);
    _httpPostSignUp();
  }

 function _httpPostSignUp(){
   var request = {
     method : "POST",
     url: "http://52.14.22.20:3000/user/signup",
     headers : {
       'content-type' : 'application/json'
     },
     data : {
       name : $scope.user.name,
       email : $scope.user.email,
       password : $scope.user.password,
     }
   };

   $http(request).then(
       function(){
           console.log("Post request to /user/signup complete");
       }
   );
     /*function(res){
       console.log('Success');
       console.dir(res);
     },
      function(res){
        $state.go('error');
   }); */
  }
 })

 .controller('DashboardCtrl', function($scope, $ionicPopup, $state){
    /*var alertPopup = $ionicPopup.show({
       title: 'You Messed Up',
       templateUrl: 'templates/error.html',
       buttons: [
         {
           text: 'Continue',
           type: 'button-assertive',
           onTap: function(e){
             $state.go('login');
           }
         }
       ]
     }); */
})

// -----------------------------------

.controller('ErrorCtrl', function($scope, $ionicPopup, $state){
    var alertPopup = $ionicPopup.show({
       title: 'You Messed Up',
       templateUrl: 'templates/error.html',
       buttons: [
         {
           text: 'Continue',
           type: 'button-assertive',
           onTap: function(e){
             $state.go('login');
           }
         }
       ]
     });
});