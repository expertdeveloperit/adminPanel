angular.module('myApp.services',[]).service("userService",function($http){

	var token = JSON.parse(localStorage.getItem('token'));
	

	return{
		// returns permission to login
		login: function(loginCredentials){
			return $http.post('http://localhost:3000/api/login',loginCredentials);
		},

		//registers a new user
		registeration : function(){
			return $http.post('http://localhost:3000/api/signup',userData);
		},

		//returns a list of existing users
		getUsers : function(){
			return $http.get('http://localhost:3000/api/users')
		},

		//deletes a user based on key
		removeUser : function(id){
			return $http.delete('http://localhost:3000/api/removeuser/' + id);
		},

		//returns all details of user based on key
		userDetail : function(id){
			return $http.get('http://localhost:3000/api/user/' + id)
		},

		//returns updated user details
		updateUser: function(modifiedData,id){

			return $http.put('http://localhost:3000/api/update/' + id,modifiedData);
		},

		//fetches user details based on some key
		user :function(){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.get('http://localhost:3000/api/userdata',
			{headers: {'Authorization': 'Bearer ' + token}});
		},

		//returns src for user profile picture
		profilePicture: function(imagename){
			var token = JSON.parse(localStorage.getItem('token'));

			var fd = new FormData();

			fd.append('file',imagename);

			
			return $http.put('http://localhost:3000/api/image',fd,{headers : {'Content-Type':undefined,'Authorization' : 'Bearer ' + token}})
				
		},

		//deletes user profile picture
		removeProfilePicture: function(profilePicture){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.put('http://localhost:3000/api/deleteimage',profilePicture,
				{headers: 
					{"Authorization": "Bearer " + token}}
					);
		},

		//sets a new password for user
		changepassword : function(passwordData){
			var token = JSON.parse(localStorage.getItem('token'));

			return $http.put('http://localhost:3000/api/changepassword',passwordData,
			{
				headers:{"Authorization" : "Bearer " + token}
			});
		}
	}
})