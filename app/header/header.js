'use strict';

angular.module('myApp.header', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/header', {
    templateUrl: 'header/header.html',
    controller: 'HeaderCtrl'
  });
}])

.controller('HeaderCtrl', ['$scope','userService',function($scope,userService) {
	$scope.user = {};
	$scope.baseUrl = 'http://localhost:3000/'
	$scope.getHeaderData = function(){
		userService.user().success(function(data){
			console.log(data.data,"header data on success");
			$scope.user.userName = data.data.userName;
			$scope.user.role = data.data.role;
			$scope.user.profilePicture = $scope.baseUrl + data.data.profilePicture;
			console.log($scope.user,"user");
		}).error(function(data){
			console.log(data,"header data on error");
		})
	}
	$scope.getHeaderData();

}])

.directive('appHeader',function(){

	var directive = {};
	directive.restrict = 'E';
	directive.templateUrl = '../header/header.html';
	return directive;
});