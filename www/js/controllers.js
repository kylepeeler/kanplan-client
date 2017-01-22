angular.module('kanplan.controllers', [])

// Logging control //UserSession?
.controller('LoginCtrl', function($scope, $http, $state, $ionicSideMenuDelegate){
  $scope.email = "";
  $scope.password = "";

  $scope.error = "";

  //disable side menu on login page
  //$ionicSideMenuDelegate.canDragContent(false);
  //enable side menu drag before moving to next view
  $scope.$on('$ionicView.beforeLeave', function(event) {
    //$ionicSideMenuDelegate.canDragContent(true);
  });

  $scope.login = function(email,password, userId){
    var user = {
      email: email,
      password:password,
      userId: userId
    };
    _httpPostLogin(user)
  };

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

            if(successCallback.status === 200){
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

        }, function(errorCallback) {
            $scope.error = $stateParams.error;
            $state.go('login', {error:true});
            console.log('test ' + errorCallback);
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
  };

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

 .controller('DashboardCtrl', function($scope, $ionicPopup, $state,  $ionicSideMenuDelegate){
    //Enable side menu
   $ionicSideMenuDelegate.canDragContent(true);
   $scope.toggleLeft = function() {
     $ionicSideMenuDelegate.toggleLeft();
   };

 })

// -----------------------------------

.controller('ErrorCtrl', function($scope, $ionicPopup, $state){
    var alertPopup = $ionicPopup.show({
       title: 'You Messed Up',
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
})// Task template controller
.controller('TaskCtrl', function($scope){
    $scope.task = {
        $scope: orgId,
        $scope: author,
        $scope: assignee,
        $scope: title,
        $scope: state,
        $scope: compensation,
    }

    // function for time start / stop

    // function for time stop

    // for task delete button
    function deleteTask(){

    }


    // for task submit button 
    function submitTask(){

    }


})
 
 // New Task template controller
.controller('NewTaskCtrl', function($scope){
    // 
    $scope.task = {
        title: "",
        description: "",
        compensation: "",
        asignee : []
    };

  $scope.createTask = function(title, description, compensation, asignee){
    $scope.task.title = title;
    $scope.task.description = description;
    $scope.task.compensation = compensation;
    $scope.task.asignee = asignee;
    _httpPostTask(task);
  }

    

    function _httpPostTask(task, orgId){
        var request = {
            method : "POST",
            url: "http://52.14.22.20:3000/task/:{{orgId}}",
            headers : {
                'content-type' : 'application/json'
                },
            data : {
                title: $scope.task.title,
                description: $scope.task.description,
                compensation: $scope.task.compensation,
                userId: $scope.task.asignee
            }
        };

        $http(request).then(
            function(res ){
                if(res.status === 200){
                    // if request is returned from server, then go to dashboard
                    console.log("Post to user/signup");
                       // $state.go('dashboard');
                       //close modal
                }
            }
        );
    }
});


