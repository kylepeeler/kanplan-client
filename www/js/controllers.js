angular.module('kanplan.controllers', [])

// Logging control //UserSession?
.controller('LoginCtrl', function($scope, $http, $state, $stateParams, $ionicSideMenuDelegate, UserID){
  $scope.email = "";
  $scope.password = "";
  $scope.error = "";

  //disable side menu on login page
  $ionicSideMenuDelegate.canDragContent(false);
  //enable side menu drag before moving to next view
  // $scope.$on('$ionicView.beforeLeave', function(event) {
  //   $ionicSideMenuDelegate.canDragContent(true);
  // });

  $scope.login = function(email,password){
    var user = {
      email: email,
      password:password
    };
    UserID.set(user.userId);
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
        password : user.password
      }
    };

    $http(request).then(
        function(successCallback, errorCallback){
            console.log('success:');
            console.dir(successCallback);
            console.log('error:');
            console.dir(errorCallback);
            if(successCallback.status === 200){
              UserID.set(successCallback.data._id);
              $state.go('dashboard');
            }

            // TODO impliment some error handling
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
       function(res){
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

 .controller('DashboardCtrl', function($scope, $ionicPopup, $state,  $ionicSideMenuDelegate, UserID){

   console.log("user id is " + UserID.get());

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
})
  .controller('JoinOrgCtrl', function($scope, $http, $ionicHistory, UserID){
    $scope.orgtojoin = {};
    var orgsReq = {
      method: "GET",
      url: "http://52.14.22.20:3000/organization"
    };

    $http(orgsReq).then(
      function(res){
        if (res.status === 200){
          console.log("Organizations loaded");
          console.log(res);
          $scope.orgs = res.data;
        }else{
          console.log("Could not load organizations");
        }
      }
    );

    $scope.joinOrg = function(){
      var joinOrgReq = {
        method: "POST",
        url: "http://52.14.22.20:3000/organization/join",
        data : {
          role : "client",
          userId : UserID.get(),
          orgId : $scope.orgtojoin.id
        }
      };
      $http(joinOrgReq).then(
        function(res){
          if (res.status === 200){
            console.log("organization joined successfully: " + $scope.orgtojoin.id + "result:");
            console.log(res);
          }else{
            console.log("could not join organization");
          }
        }
      );
    };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  });


