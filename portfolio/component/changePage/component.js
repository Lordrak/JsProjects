angular.module('portfolio').component("component",{
	templateUrl : 'component/changePage/vue.html',
	controller:'controller'
});

angular.module('portfolio').config(function($stateProvider) {
//Création des variables pour pouvoir changer de vue avec le ui router
  	var projet = {
  		name: 'projet',
  		url: '/projet',
  		templateUrl: 'component/changePage/projet.html'
  	};
  	var page3 = {
  		name: 'page3',
  		url: '/page3',
  		templateUrl: 'component/changePage/vue3.html'
  	};


  $stateProvider.state(projet);
  $stateProvider.state(page3);
});