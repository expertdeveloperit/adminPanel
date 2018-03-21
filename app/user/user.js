'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/update/:id', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope','$routeParams','userService',function($scope,$routeParams,userService) {

	$scope.id = $routeParams.id;
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
			alert(response.Error);
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