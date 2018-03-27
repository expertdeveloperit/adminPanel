'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.services',
  'myApp.view1',
  'myApp.view2',
  'myApp.login',
  'myApp.dashboard',
  'myApp.user',
  'myApp.header',
  'myApp.profile',
  'myApp.password',
  'myApp.settings',
  'oitozero.ngSweetAlert',
  'myApp.version'
]).
config(['$locationProvider', '$urlRouterProvider','$stateProvider', function($locationProvider, $urlRouterProvider,$stateProvider) {

  $urlRouterProvider.otherwise('/#');
//    $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: false
// });
}])
.controller('mainController',['$scope','$state',function($scope,$state){
  $scope.logOut = function(){
    localStorage.clear();
    $state.go('home');  
  }
}])
.run(function($state, $rootScope){
  //this is to call a global function on every route change
    $rootScope.$on('$locationChangeStart', function() {

        $rootScope.user ={};
        $rootScope.$on("updatedata", function(){
           $rootScope.getData();
        });
        $rootScope.$on("imageupdate", function(){
           $rootScope.getData();
        });

        $rootScope.getData = function(){

          $rootScope.token = JSON.parse(localStorage.getItem('token'));
          if($rootScope.token){

           $rootScope.info = JSON.parse(localStorage.getItem('info'));

           $rootScope.user.userName = $rootScope.info.userName;
           if($rootScope.info.profilePicture){
            $rootScope.user.profilePicture = 'http://localhost:3000/' + $rootScope.info.profilePicture;
           }
           else{
            $rootScope.user.profilePicture = '../images/download.png';
           }

          }
          else{
          console.log("hello");
          }    
        }
        $rootScope.getData();
    

      });

      //This is to hide header from some state
      $rootScope.$state = $state;

   
});
