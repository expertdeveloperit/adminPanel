'use strict';

angular.module('myApp.header', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/header', {
    templateUrl: 'header/header.html',
    controller: 'HeaderCtrl'
  });
}])
// controller for header
.controller('HeaderCtrl', ['$scope','userService',function($scope,userService) {
	$scope.user = {};
	$scope.baseUrl = 'http://localhost:3000/'
	$scope.getHeaderData = function(){
		userService.user().success(function(data){
			$scope.user.userName = data.data.userName;
			$scope.user.role = data.data.role;
			$scope.user.profilePicture = $scope.baseUrl + data.data.profilePicture;
			console.log($scope.user,"user");
		}).error(function(data){
			console.log(data,"header data on error");
		})
	}
	//executing function at page load
	$scope.getHeaderData();

}])
//creating header directive
.directive('appHeader',function(){

	var directive = {};
	directive.restrict = 'E';
	directive.templateUrl = '../header/header.html';
	return directive;
});