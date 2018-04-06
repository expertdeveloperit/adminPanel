'use strict';

angular.module('myApp.password', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('settings.password', {
  	url:'/password',
    templateUrl: 'password/password.html',
    controller: 'PasswordCtrl'
  });
}])
//defining module for password setting module
.controller('PasswordCtrl', ['$scope','$http','$state','SweetAlert','userService',function($scope,$http,$state,SweetAlert,userService) {

	//creating model for password change
	$scope.changePassword = function(){
		$scope.passowrd = {};
		
		if($scope.password.confirm_newPassword != $scope.password.new_password){
			SweetAlert.swal("New Password and confirm Password doesnot match");
		}
		else{
			userService.changepassword($scope.password).success(data => {
				
				SweetAlert.swal(data.message);
				$scope.password = "";
				localStorage.clear();
				$state.go("home");
			}).error(error => {
				SweetAlert.swal(error.Error);
			});
		}
	}
}]);