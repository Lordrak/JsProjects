angular.module('uiApp').component("component",{
	templateUrl : 'component/changePage/vue.html',
	controller:'controller'
});

angular.module('uiApp').config(function($stateProvider) {
//Création des variables pour pouvoir changer de vue avec le ui router
  	var page2 = {
  		name: 'page2',
  		url: '/page2',
  		templateUrl: 'component/changePage/vue2.html'
  	};
  	var page3 = {
  		name: 'page3',
  		url: '/page3',
  		templateUrl: 'component/changePage/vue3.html'
  	};


  $stateProvider.state(page2);
  $stateProvider.state(page3);
});