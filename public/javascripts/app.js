	// create the module and name it serverApp
	var serverApp = angular.module('serverApp', ['ngRoute']);

	// configure our routes
	serverApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact/:id', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
	});


	serverApp.factory('sample', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('data');
			},
			create : function(todoData) {
				return $http.post('/postdata', todoData);
			},
			delete : function(id) {
				return $http.delete('/delete/' + id);
			},put : function(id) {
			//	alert(id)
				return $http.put('/update/'+ id);
			},udate : function(id,data) {
					alert(id)
					alert(data)
					return $http.post('/updates/'+ id,data);
				}
		}
	}]);
	// create the controller and inject Angular's $scope
	serverApp.controller('mainController', function($scope,sample,$location) {
		// create a message to display in our view
		$scope.message = '';
	
		sample.get()
			.success(function(data) {
				$scope.value = data
			});


			$scope.delete = function(id) {
				sample.delete(id)
				.success(function(data) {
					$scope.value = data
				})
			}


			$scope.createTodo = function() {

					// call the create function from our service (returns a promise object)
					sample.create($scope.formData)
	
						// if successful creation, call our get function to get all the new todos
						.success(function(data) {
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.value = data; // assign our new list of todos
						});
				
			};

			
			$scope.update = function(id) {

				// call the create function from our service (returns a promise object)
			//	sample.put(id)
				 $location.path('/contact/'+id)
				//	if successful creation, call our get function to get all the new todos
					//.success(function(data) {
					// 	console.log(data)
					// 	//$scope.formData = {}; // clear the form so our user is ready to enter another
					// 	$scope.value = data; // assign our new list of todos
					// });
			
		};
// 		$http.get('/data', {msg:'hello word!'}).
//   then(function(response) {
// console.log(response)
// $scope.value = response.data
//   }, function(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
	});

	serverApp.controller('aboutController', function($scope) {
	//	alert()
		$scope.message = 'Look! I am an about page.';
	});

	serverApp.controller('contactController', function($scope,sample,$routeParams) {
		$scope.message = 'Contact us! JK. This is just a demo.';

			sample.put($routeParams.id)
		//$location.path('/contact/'+id)
			//if successful creation, call our get function to get all the new todos
			.success(function(data) {
				console.log(data[0])

				console.log(data.name)
				//$scope.formData = {}; // clear the form so our user is ready to enter another
				// $scope.name = data[0].name; // assign our new list of todos
				// // $scope.address = 'asds'
				// $scope.id = data[0]._id
				
					$scope.data=data[0]
				
			});

			$scope.updatesave = function(id) {
				console.log($scope.name)
				
				console.log($scope.data)
						sample.udate(id,$scope.data)
					//	if successful creation, call our get function to get all the new todos
						.success(function(data) {
							console.log(data)
							//$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.value = data; // assign our new list of todos
						});
			}
	});