'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$http','$timeout','userService',function($scope,$http,$timeout,userService) {
    $scope.message="";
    $scope.token_val = "";
    $scope.disableLogin = true;
    $scope.userData = {};
    $scope.formData={};
    $scope.btn_text = "Sign Up";
    $scope.head_text = "Don't have an account?";

	$scope.logMeIn = function(){

		console.log($scope.formData);
    
       userService.login($scope.formData).success(function(data){
        
        if(data.data.role == "user"){
          localStorage.setItem('token', JSON.stringify(data.token));
          $scope.token_val = JSON.parse(localStorage.getItem('token'));
          window.location = "#!/profile";
        }
        if(data.data.role == "superuser"){
           localStorage.setItem('token', JSON.stringify(data.token));
           $scope.token_val = JSON.parse(localStorage.getItem('token'));
          console.log($scope.token_val,"token");
          window.location = "#!/dashboard";
        }
        
       }).error(function(data){
        console.log(data);
        $scope.message = data.message;
        alert($scope.message);
        $scope.formData = "";
       })     
  }

  $scope.registerMe = function(){
    
    if($scope.userData.name && $scope.userData.email && $scope.userData.password && $scope.userData.confirm_password){
      if($scope.userData.password == $scope.userData.confirm_password){
        console.log($scope.userData.name,$scope.userData.email,$scope.userData.password,$scope.userData.confirm_password);
        $http.post('http://localhost:3000/api/signup', $scope.userData)
              //on getting a successful response navigates to login page
              .success(function(data) {
                
                  $scope.todos = data;
                  console.log(data);
                  $scope.userData ="";
                  window.location = "#!/login";
              })
              //on getting a response with error status(code) clears the form and remain stuck at registeration page
              .error(function(data) {
                
                  // clear the form so our user is ready to enter another
                  $scope.userData = {}; 
                  console.log(data);
                  alert(data.message);
              });
        
      }
      else{
        //to clear confirm password and password field on password mismatch
        $scope.userData.password ="" ;
        $scope.userData.confirm_password = "" ;
        alert("Password and confirm password doesnot match");
      }
    }
    else{
      alert("Please fill form data");
    }
  }

  $scope.signup = function(){
    window.location = "#!/signup";
  } 
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