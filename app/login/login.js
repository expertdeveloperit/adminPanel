'use strict';

angular.module('myApp.login', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state("home", {
    url:"/",
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$rootScope','$scope','$http','$state','$timeout','SweetAlert','userService',function($rootScope,$scope,$http,$state,$timeout,SweetAlert,userService) {
    $scope.message="";
    $scope.token = {};
    $scope.disableLogin = true;
    $scope.userData = {};
    $scope.formData={};
    $scope.btn_text = "Sign Up";
    $scope.head_text = "Don't have an account?";

  //Function to authenticate user at the time of login
	$scope.logMeIn = function(){
        
       userService.login($scope.formData).success(function(data){
        console.log(data);
        // $scope.token = {"token":[{"data":data.data},{"token":data.token}]}
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('info', JSON.stringify(data.data));

          $scope.token = JSON.parse(localStorage.getItem('token'));
          $scope.info = JSON.parse(localStorage.getItem('info'));
          console.log($scope.token,"token from localStorage");
          console.log($scope.info,"token from localStorage");        
        if(data.data.role == "user"){

          $state.go("settings");
         // $rootScope.$emit("CallParentMethod",$scope.token);
        }
        if(data.data.role == "superuser"){
          window.location = "#!/dashboard";
        }
        
       }).error(function(data){
        console.log(data);
        $scope.message = data.message;
        console.log($scope.message);
        // $scope.formData = "";
        SweetAlert.swal($scope.message);
        $state.go("home");
       })     
  }
//Function to perform user registeration functionality
  $scope.registerMe = function(){
    
    if($scope.userData.name && $scope.userData.email && $scope.userData.password && $scope.userData.confirm_password){
      if($scope.userData.password == $scope.userData.confirm_password){
        $http.post('http://localhost:3000/api/signup', $scope.userData)
              //on getting a successful response switches to login form
              .success(function(data) {
                
                  $scope.todos = data;
                  SweetAlert.swal("Registered successfully");
                  $scope.disableLogin = true;
                  $scope.btn_text = 'Sign Up';
                  $scope.head_text = "Don't have an Account?";
                  $scope.userData ="";
              })
              //on getting a response with error status(code) clears the form and remain stuck at registeration page
              .error(function(data) {
                
                  // clear the form so our user is ready to enter another
                  $scope.userData = {}; 
                  console.log(data);
                  // alert(data.message);
                  SweetAlert.swal(data.message);
              });
        
      }
      else{
        //to clear confirm password and password field on password mismatch
        $scope.userData.password ="" ;
        $scope.userData.confirm_password = "" ;
        SweetAlert.swal("Password and confirm password should be same");
      }
    }
    else{
      SweetAlert.swal("Please fill form data");
    }
  }

  //change form from signup to login and from login to signup 
  $scope.change_form = function(){
    if(!$scope.disableLogin){
      $scope.disableLogin = true;
      console.log($scope.disableLogin,"disableLogin");
      $scope.btn_text = $scope.disableLogin ? 'Sign Up' :'Login';
      $scope.head_text = $scope.disableLogin ? "Don't have an Account?" : "Already a registered User?"
    }
    else{
      $scope.disableLogin = false;
      console.log($scope.disableLogin,"disableLogin");
      $scope.btn_text = $scope.disableLogin ? 'Sign Up' :'Login';
      $scope.head_text = $scope.disableLogin ? "Don't have an Account?" : "Already a registered User?"
    }
  }
}]);