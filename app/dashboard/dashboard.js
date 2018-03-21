'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])
.filter('searchFor', function(){

    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchText)

    return function(arr, searchText){

        if(!searchText){
            return arr;
        }

        var result = [];

        searchText = searchText.toLowerCase();

        // Using the forEach helper method to loop through the array
        angular.forEach(arr, function(item){

            if(item.userName.toLowerCase().indexOf(searchText) !== -1){
                result.push(item);
            }

        });

        return result;
    };

})


.controller('DashboardCtrl', ['$scope','$http','userService',function($scope,$http,userService) {
	$scope.userlist = [];
    $scope.response="";

    //function returns the list of available users if any user exists,else will display message accordingly
	$scope.setup = function(){

    // $scope.token_val = JSON.parse(localStorage.getItem('token'));

        userService.getUsers().success(function(data){
    	   console.log(data,"success data");
    	   if(!data.status){
    	       $scope.response ="No user to display";
    	   }
    	   $scope.userlist = data;
        })
        .error(function(data){
    	   console.log(data,"error data")
        })
	}
    //this is to invoke a function "setup" on page load
    $scope.setup();

    //this function is invoked to perform deletion operation
    $scope.deleteUser = function($index,id){
        userService.removeUser(id).success(function(data){
            console.log(data,"data on success");
            $scope.userlist.data.splice($index,1);
            if($scope.userlist.data == ""){
             $scope.response = "No user to display";
            }
        })
        .error(function(data){
            console.log(data,"error on deletion")
        })
     }
}]);
