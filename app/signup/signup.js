'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope','$http',function($scope,$http) {
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

	$scope.switchPage = function(){

		window.location = "#!/login";
		
	}
}]);