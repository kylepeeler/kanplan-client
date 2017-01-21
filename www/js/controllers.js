angular.module('kanplan.controllers', [])

// Loging control //UserSession?
.controller('LoginCtrl', function($scope, $http, $state, $stateParams){
  $scope.email;
  $scope.password;

  $scope.error;

  $scope.login = function(email,password, userId){
    var user = {
      email: email,
      password:password,
      userId: userId
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
        password : user.password,
        userId: user.userId // use user idea in a session variable for later requests
      }
    };

    $http(request).then(
        function(res, err){
           
            if(res.status === 200){
                $state.go('dashboard');
            } 
            // TODO impliment some error handeling
           //console.log(res);
            /*if(err){
                // figure out best way to error handle
                $scope.error = $stateParams.error;
                $state.go('login', {error:true});
                console.log("this is err: " + err);
            } else {
                $state.go('dashboard');
            } */

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
       function(res ){
           if(res.status === 200){
               // if request is returned from server, then go to dashboard
               console.log("Post to user/signup");
                $state.go('dashboard');
           }
           
          
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