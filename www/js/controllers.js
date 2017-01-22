angular.module('kanplan.controllers', [])

// Logging control //UserSession?
  .controller('LoginCtrl', function ($scope, $http, $state, $stateParams, $ionicSideMenuDelegate,$rootScope, UserID, CurrentOrgId) {
    $scope.email = "";
    $scope.password = "";
    $scope.error = "";
    var firstOrg;
//    $scope.firstOrg;

    //disable side menu on login page
    $ionicSideMenuDelegate.canDragContent(false);
    //enable side menu drag before moving to next view
    // $scope.$on('$ionicView.beforeLeave', function(event) {
    //   $ionicSideMenuDelegate.canDragContent(true);
    // });

    $scope.login = function (email, password) {
      var user = {
        email: email,
        password: password
      };
      UserID.set(user.userId);
      _httpPostLogin(user)
    };

    getFirstUserOrg();


    function getFirstUserOrg(){
      var request = {
        method: "GET",
        url: "http://52.14.22.20:3000/user/" + UserID.get()
      };
      $http(request).then(
        function(successCallback, errorCallback){
          if (successCallback.status === 200){
            CurrentOrgId.set(successCallback.data.orgs[0]);
            $rootScope.firstorg = successCallback.data.orgs[0];
          }
        }
      )
    };



    function _httpPostLogin(user) {
      var request = {
        method: "POST",
        url: "http://52.14.22.20:3000/user/login",
        headers: {
          'content-type': 'application/json'
        },
        data: {
          email: user.email,
          password: user.password
        }
      };

      $http(request).then(
        function (successCallback, errorCallback) {
          //console.log('success:');
          //console.dir(successCallback);
          //console.log('error:');
          //console.dir(errorCallback);


          if (successCallback.status === 200) {
            UserID.set(successCallback.data._id);
            //console.log(getFirstUserOrg(UserID.get()));
            console.log("first org " + $rootScope.firstorg);
            CurrentOrgId.set($rootScope.firstorg);
            $state.go('dashboard',{orgid:  $rootScope.firstorg} );
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

        }, function (errorCallback) {
          $scope.error = $stateParams.error;
          $state.go('login', {error: true});
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

  .controller('SignUpCtrl', function ($scope, $http, $state) {
    $scope.user = {
      name: "",
      email: "",
      password: ""
    };

    $scope.signUp = function (name, email, password) {
      $scope.user.name = name;
      $scope.user.email = email;
      $scope.user.password = password;
      _httpPostSignUp();
    };

    function _httpPostSignUp() {
      var request = {
        method: "POST",
        url: "http://52.14.22.20:3000/user/signup",
        headers: {
          'content-type': 'application/json'
        },
        data: {
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
        }
      };

      $http(request).then(
        function (res) {
          if (res.status === 200) {
            // if request is returned from server, then go to dashboard
            console.log("Post to user/signup");
            $state.go('dashboard');
          }
        }
      );
    }
  })
  .controller('DashboardCtrl', function ($scope, $ionicPopup, $state, $stateParams, $rootScope, $ionicSideMenuDelegate, Tasks, CurrentOrgId) {
    //Enable side menu
    $scope.orgid = {};
    $scope.orgid = CurrentOrgId.get();
    console.log("Current Org Id from factory: " + CurrentOrgId.get());
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    //set the org id to scope from url param
    //console.log("orgid: " + $stateParams.orgid);


    console.log("ASSIGNED TASKS = ");
    console.dir( Tasks.get($rootScope.firstorg, "Assigned"));



    $scope.openTasks = Tasks.get("SJJDsU-wg", "Open");
    $scope.assignedTasks = Tasks.get("SJJDsU-wg", "Assigned");
    $scope.pendingTasks = Tasks.get("SJJDsU-wg", "Pending");
    $scope.closedTasks = Tasks.get("SJJDsU-wg", "Closed");




    //console.log(Tasks.get('SJJDsU-wg','Open'));

    // get the tasks from the backend based on the :orgId
    //$stateProvider.state('org.task',{
    // url: '/dashboard/:orgId',

    // });

  })

  // -----------------------------------

  .controller('ErrorCtrl', function ($scope, $ionicPopup, $state) {
    var alertPopup = $ionicPopup.show({
      title: 'You Messed Up',
      buttons: [
        {
          text: 'Continue',
          type: 'button-assertive',
          onTap: function (e) {
            $state.go('login');
          }
        }
      ]
    });
  })// Task template factory



.controller('CreatedTaskCtrl', function ($scope,$stateParams, $http, Tasks, CurrentOrgId) {

  var createdTaskQuery = {
    method: "get",
    url: "http://52.14.22.20:3000/tasks/" + CurrentOrgId.get() + "?state=Open" 
  }
  $http(createdTaskQuery).then(
    function(res){
      if(res.status === 200){
        $scope.tasks = res.data;
      }
    }
  );

  console.log(Tasks.get(CurrentOrgId.get(), "Created"));
  //$scope.tasks = Tasks.get(CurrentOrgId.get(), "Created");
})
.controller('AssignedTaskCtrl',  function ($scope,$stateParams, $http, Tasks, CurrentOrgId) {

  var assignedTaskQuery = {
    method: "get",
    url: "http://52.14.22.20:3000/tasks/" + CurrentOrgId.get() + "?state=Assigned" 
  }
  $http(assignedTaskQuery).then(
    function(res){
      if(res.status === 200){
        $scope.tasks = res.data;
      }
    }
  );

  console.log(Tasks.get(CurrentOrgId.get(), "Created"));
  //$scope.tasks = Tasks.get(CurrentOrgId.get(), "Created");
})

.controller('PendingTaskCtrl', function ($scope,$stateParams, $http, Tasks, CurrentOrgId) {

  var pendingTaskQuery = {
    method: "get",
    url: "http://52.14.22.20:3000/tasks/" + CurrentOrgId.get() + "?state=Pending" 
  }
  $http(pendingTaskQuery).then(
    function(res){
      if(res.status === 200){
        $scope.tasks = res.data;
      }
    }
  );

  console.log(Tasks.get(CurrentOrgId.get(), "Created"));
  //$scope.tasks = Tasks.get(CurrentOrgId.get(), "Created");
})

  .controller('ClosedTaskCtrl', function ($scope,$stateParams, $http, Tasks, CurrentOrgId) {

  var closedTaskQuery = {
    method: "get",
    url: "http://52.14.22.20:3000/tasks/" + CurrentOrgId.get() + "?state=Closed" 
  }
  $http(closedTaskQuery).then(
    function(res){
      if(res.status === 200){
        $scope.tasks = res.data;
      }
    }
  );

  console.log(Tasks.get(CurrentOrgId.get(), "Created"));
  //$scope.tasks = Tasks.get(CurrentOrgId.get(), "Created");
})




  .directive('task', function () {
    return { // custom DOM element for tast
      templateUrl: 'templates/task.html'
    };
  })
  // New Task template controller
.controller('NewTaskCtrl', function ($scope, $ionicModal, UserID) {
    // TODO, finish the POST request to create a new task
    $scope.task = {
      title: "",
      description: "",
      compensation: "",
      asignee: []
    };

    $scope.createTask = function (title, description, compensation, asignee) {
      $scope.task.title = title;
      $scope.task.description = description;
      $scope.task.compensation = compensation;
      $scope.task.asignee = asignee;
      _httpPostTask(task);
    }

    function _httpPostTask(task, orgId) {
      var request = {
        method: "POST",
        url: "http://52.14.22.20:3000/task/:{{orgId}}",
        headers: {
          'content-type': 'application/json'
        },
        data: {
          title: $scope.task.title,
          description: $scope.task.description,
          compensation: $scope.task.compensation,
          userId: $scope.task.asignee
        }
      };

      $http(request).then(
        function (res) {
          if (res.status === 200) {
            // if request is returned from server, then go to dashboard
            console.log("Post to user/signup");
            // $state.go('dashboard');
            //close modal
          }
        }
      );
    }
  })
  .controller('JoinOrgCtrl', function ($scope, $http, $ionicHistory, UserID) {
    $scope.orgtojoin = {};
    var orgsReq = {
      method: "GET",
      url: "http://52.14.22.20:3000/organization"
    };

    $http(orgsReq).then(
      function (res) {
        if (res.status === 200) {
          console.log("Organizations loaded");
          console.log(res);
          $scope.orgs = res.data;
        } else {
          console.log("Could not load organizations");
        }
      }
    );

    $scope.joinOrg = function () {
      var joinOrgReq = {
        method: "POST",
        url: "http://52.14.22.20:3000/organization/join",
        data: {
          role: "client",
          userId: UserID.get(),
          orgId: $scope.orgtojoin.id
        }
      };
      $http(joinOrgReq).then(
        function (res) {
          if (res.status === 200) {
            console.log("organization joined successfully: " + $scope.orgtojoin.id + "result:");
            console.log(res);
          } else {
            console.log("could not join organization");
          }
        }
      );
    };

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('InvoiceCtrl', function ($scope, $ionicModal, UserID) {

  // TODO impilment GET request and populate list view will all the current invoices

  $scope.getInvoices = function () {
    /*$scope.task.title = title;
     $scope.task.description = description;
     $scope.task.compensation = compensation;
     $scope.task.asignee = asignee; */
    console.log("query invoices");
    //_httpPostTask(task);
    $scope.modal.show();
  };


  $ionicModal.fromTemplateUrl('templates/invoices.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });


  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.createTask = function (title, description, compensation, asignee) {

    var invoice = {}

    _httpGetInvoices(invoices);
    console.log("create task");
    //$scope.modal.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });


  function _httpGetInvoices(task, orgId) {
    var request = {
      method: "GET",
      url: "http://52.14.22.20:3000/tasks/" + orgId,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        title: $scope.task.title,
        description: $scope.task.description,
        compensation: $scope.task.compensation,
        asignee: $scope.task.asignee,
        userId: $scope.task.author
      }
    };

    $http(request).then(
      function (res) {
        if (res.status === 200) {
          // if request is returned from server, then go to dashboard
          console.log("Post to user/signup");
          // $state.go('dashboard');
          //close modal
        }
      }
    );
  }
});


