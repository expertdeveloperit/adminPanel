'use strict';

angular.module('myApp.user', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('user', {
  	url:'/update/:id',
    templateUrl: 'user/user.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope','$state','$stateParams','Sweetalert','userService',function($scope,$state,$stateParams,Sweetalert,userService) {

	$scope.id = $stateParams.id;
	$scope.disablePassword = true;

	$scope.userInfo =function(id){

		console.log("This is a userinfo controller function");

		userService.userDetail($scope.id).success(function(details){
			$scope.user = {};

			console.log(details);
			$scope.user.userName  = details.userData.userName;
			$scope.user.email = details.userData.email;
			$scope.user.password = details.userData.password; 
		})
		.error(function(response){
			Sweetalert.swal(response.Error);
		})
		
	}
	$scope.userInfo();

	$scope.modifyingUser = function(){
		console.log($scope.user);
		console.log($scope.id,"id");

		userService.updateUser($scope.user,$scope.id).success(data => {
			console.log(data,"successful updation");
		}).error(data => {
			console.log(data,"error at updating userInfo");
		})
	}

}]);