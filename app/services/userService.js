angular.module('myApp.services',[]).service("userService",function($http){

	var token = JSON.parse(localStorage.getItem('token'));
	

	return{
		login: function(loginCredentials){
			return $http.post('http://localhost:3000/api/login',loginCredentials);
		},

		registeration : function(){
			return $http.post('http://localhost:3000/api/signup',userData);
		},

		getUsers : function(){
			return $http.get('http://localhost:3000/api/users')
		},

		removeUser : function(id){
			return $http.delete('http://localhost:3000/api/removeuser/' + id);
		},

		userDetail : function(id){
			return $http.get('http://localhost:3000/api/user/' + id)
		},

		updateUser: function(modifiedData,id){

			return $http.put('http://localhost:3000/api/update/' + id,modifiedData);
		},

		user :function(){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.get('http://localhost:3000/api/userdata',
			{headers: {'Authorization': 'Bearer ' + token}});
		},

		profilePicture: function(imagename){
			var token = JSON.parse(localStorage.getItem('token'));

			var fd = new FormData();

			fd.append('file',imagename);

			
			return $http.put('http://localhost:3000/api/image',fd,{headers : {'Content-Type':undefined,'Authorization' : 'Bearer ' + token}})
				
		},

		removeProfilePicture: function(profilePicture){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.put('http://localhost:3000/api/deleteimage',profilePicture,
				{headers: 
					{"Authorization": "Bearer " + token}}
					);
		},

		changepassword : function(passwordData){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.put('http://localhost:3000/api/changepassword',passwordData,
			{
				headers:{"Authorization" : "Bearer " + token}
			});
		}
	}
})