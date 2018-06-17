angular.module('app').controller('animalController',function($scope, $http){
	$scope.animals = [];
	$scope.addAnimal = addAnimal;
	getAnimals();
	$scope.message = "";

	function getAnimals(){
		$http.get("http://localhost:3000/getAnimals").then(function(res){
			$scope.animals = res.data;
		})
	}

	function addAnimal(){
		var animal = {name : this.name};
		$http.post("http://localhost:3000/addAnimal",animal).then(function(res){
			$scope.message = res.data;
			getAnimals();
		})
	}


})
