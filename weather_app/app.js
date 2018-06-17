angular.module("weatherApp",[]);

function whiteListConfig($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	  'self',
	  'https://api.darksky.net/*',
	]);
}


angular.module('weatherApp').config(whiteListConfig);
