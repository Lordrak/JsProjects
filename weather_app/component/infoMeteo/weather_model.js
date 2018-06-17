angular.module("weatherApp").service("weatherModel",function($http){
	return{
		getWeather: function(latitude,longitude){
			var key = "a658e50f59f20edc68091fd4df6f40f5";
			var weatherdata = $http.get('https://lit-ridge-46374.herokuapp.com/forecast/'+key+"/"+latitude+","+longitude);
			   return weatherdata;	
		},

		getGeocode: function(ville,pays){
			var key = 'k4PhQK9E67eEXB0Armk8NmvigCzFonOJ';
			var geocodata = $http.get('http://www.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+ville);
			return geocodata;
		}   
	}
});