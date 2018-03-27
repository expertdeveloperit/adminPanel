'use strict';

angular.module('myApp.settings', ['ui.router','ngFileUpload'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('settings', {
    url:'/settings',
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', ['$scope','$rootScope','Upload', '$timeout','SweetAlert','userService',function($scope,$rootScope,Upload,$timeout,SweetAlert,userService) {

 $scope.userData = {};
 $scope.isDisabled = true;
 $scope.data = {};
 $scope.myDefaultImage = '../images/download.png';
 $scope.enableButton = false;
 $scope.user = {};
 
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
                      SweetAlert.swal("No changes are saved");
                    }

  $scope.info = function(){
  
                userService.user().success(function(data){

                  $scope.isDisabled = true;
                  $scope.userData={};
                  $scope.data = data.data;
                  $scope.userData.userName = $scope.data.userName;
                  $scope.userData.email = $scope.data.email;
                  $scope.userData.createdAt = $scope.data.createdAt;
                  $scope.date = new Date($scope.data.createdAt);
                  $scope.userData.createdAt = $scope.date.getFullYear()+'-' + ($scope.date.getMonth()+1) + '-'+$scope.date.getDate();
                  $scope.userData.id = $scope.data._id;
                
                  if($scope.data.profilePicture != undefined){

                    $scope.userData.profilePicture = 'http://localhost:3000/' + $scope.data.profilePicture;
                  }
                  else{
                    $scope.userData.profilePicture = '../images/download.png';
                  }
                  
                }).error(function(data){
                  SweetAlert.swal(data);
                })
 }

 $scope.info(); 

  $scope.update = function(){
    userService.updateUser($scope.userData,$scope.userData.id).success(function(data){
       $scope.isDisabled = true;
      SweetAlert.swal("Data updated successfully!");
    }).error(function(data){
      console.log(data,"error on updating data");
    });
  }

  $scope.deleteImage = function(){
    console.log("in delete function");

    SweetAlert.swal({
                      title: "Are you sure?",
                      text: "Your will not be able to recover this image!",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                      cancelButtonText: "No",
                      closeOnConfirm: false,
                      closeOnCancel: false 
                    }, 
                      function(isConfirm){ 
                        if (isConfirm) {
                            userService.removeProfilePicture().success(function(data){
                              $scope.userData.profilePicture = '';
                              console.log(data,"data on image removal");
                              SweetAlert.swal("Deleted!", "Your image has been deleted.", "success");
                              })
                            .error(function(data){
                               alert(data);
                            })
 
                          
                        } 
                        else {
                          SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
                        }
                      });
}


  $scope.changeImage = function(){
    console.log("function on edit image");
    $scope.enableButton = true;
  }

  $scope.disableEdit = function(){
    $scope.enableButton = false;
  }


  $scope.header = JSON.parse(localStorage.getItem('token'));

  

	$scope.uploadPic = function(file) {
	
    // file.upload = Upload.upload({
    //   url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
    //   data: {file: file},
    // });
    console.log(file,"file");
    if(!file){
      SweetAlert.swal("Please select an image first to upload!")
    }

      else{userService.profilePicture(file).success(function(data){
              $scope.userData.profilePicture = 'http://localhost:3000/'+data.data.profilePicture;
              console.log('http://localhost:3000/'+data.data.profilePicture,"imagedata on success");
              $scope.enableButton = false;
              $scope.storage = JSON.parse(localStorage.getItem('info'));
              $scope.storage.profilePicture = data.data.profilePicture;
              localStorage.setItem('info', JSON.stringify($scope.storage));
              $rootScope.$emit("imageupdate",JSON.parse(localStorage.getItem('info')));
              SweetAlert.swal("Profile Picture Updated!");
            }).error(function(data){
              console.log(data,"onfailure image upload");
              SweetAlert.swal(data);
            });}
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
    $scope.deletion = function(){

    	console.log("function is executing");
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
