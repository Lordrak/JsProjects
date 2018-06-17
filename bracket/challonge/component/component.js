angular.module("app").component("component",{
	templateUrl: "component/main.html",
	controller: "controller"
})

angular.module("app").config(function($stateProvider){
	var create = {
		name: "create",
		url: "/create",
		templateUrl: "component/create.html"
	}

	var bracket = {
		name: "bracket",
		url: "/bracket",
		templateUrl :"component/vue.html"
	}

	$stateProvider.state(create);
	$stateProvider.state(bracket);
})