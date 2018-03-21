'use strict';

angular.module('myApp.profile', ['ngRoute','ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', 'Upload', '$timeout','userService',function($scope,Upload,$timeout,userService) {

 $scope.userData = {};
 $scope.isDisabled = true;
 $scope.data = {};
 $scope.myDefaultImage = '../images/download.png';
 $scope.enableButton = false;
 
 // $scope.buttonText = "";
 // $scope.toggle = true;

// This is to change the button text on some event
 // $scope.$watch('toggle', function(){
 //        $scope.buttonText = $scope.toggle ? 'Update' : 'Cancel';
 //    })


  $scope.replace = function () {
                $scope.isDisabled = false;
            };

  $scope.changeMode = function() {
                      $scope.isDisabled = true;
                      $scope.userData.userName = $scope.data.userName;
                      $scope.userData.email = $scope.data.email;
                      $scope.userData.createdAt = $scope.data.createdAt;
                    }

  $scope.info = function(){
                userService.user().success(function(data){
                  console.log(data.data,"data on success");
                  $scope.isDisabled = true;
                  $scope.userData={};
                  $scope.data = data.data;
                  $scope.userData.userName = $scope.data.userName;
                  $scope.userData.email = $scope.data.email;
                  $scope.userData.createdAt = $scope.data.createdAt;
                  $scope.date = new Date($scope.data.createdAt);
                  $scope.userData.createdAt = $scope.date.getFullYear()+'-' + ($scope.date.getMonth()+1) + '-'+$scope.date.getDate();
                  $scope.userData.id = $scope.data._id;
                  if($scope.userData.profilePicture == ""){
                    $scope.userData.profilePicture = '../images/download.png';
                  }
                  else{
                    $scope.userData.profilePicture = 'http://localhost:3000/' + $scope.data.profilePicture;
                  }
                  
                  console.log($scope.userData.profilePicture,"type of profile picture source");
                }).error(function(data){
                  console.log(data,"data on error");
                })
 }

 $scope.info(); 

  $scope.update = function(){
    userService.updateUser($scope.userData,$scope.userData.id).success(function(data){
       $scope.isDisabled = true;
      console.log($scope.userData.userName,"username after updation");
      console.log($scope.userData,"field data");
      console.log(data,"updated data");
    }).error(function(data){
      console.log(data,"error on updating data");
    });
  }

  $scope.deleteImage = function(){

    userService.removeProfilePicture().success(function(data){
     $scope.userData.profilePicture = '';
      console.log(data,"data on image removal");
    }).error(function(data){
      alert(data);
    })
  }

  $scope.changeImage = function(){
    console.log("fuction on edit image");
    $scope.enableButton = true;
  }

  $scope.disableEdit = function(){
    $scope.enableButton = false;
  }


  $scope.header = JSON.parse(localStorage.getItem('token'));

  

	$scope.uploadPic = function(file) {
		console.log(file,"file");
    // file.upload = Upload.upload({
    //   url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
    //   data: {file: file},
    // });
    console.log(file,"file1");

      userService.profilePicture(file).success(function(data){
        $scope.userData.profilePicture = 'http://localhost:3000/'+data.result.profilePicture;
        console.log('http://localhost:3000/'+data.result.profilePicture,"imagedata on success");

      }).error(function(data){
        console.log(data,"onfailure image upload");
      });
      // file.upload.then(function (response) {
      //   $timeout(function () {
      //     file.result = response.data;
      //   });
      // }, function (response) {
      //   if (response.status > 0)
      //     $scope.errorMsg = response.status + ': ' + response.data;
      // }, function (evt) {
      //   // Math.min is to fix IE which reports 200% sometimes
      //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      // });
      

    }


}])
.directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
          
          attrs.$observe('ngSrc', function(value) {
            if (!value && attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    });
