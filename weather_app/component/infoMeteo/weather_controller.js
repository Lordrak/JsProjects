angular.module("weatherApp").controller("weatherController", function($scope, $http,weatherModel){


    
    $scope.weatherTimezone= '';
    $scope.degrees = '';
    $scope.date = '';
    $scope.summary = '';
    $scope.hourly = [];
    $scope.daily = [];
    $scope.celsius = true;
    $scope.changeCelFar = changeCelFar;
    $scope.villeS = '';
    $scope.paysLat = '';
    $scope.paysLng = '';
	$scope.weatherGeoLoc = getLocation();
	$scope.changeLocation = changeLocation;
	$scope.villeSave = [];
	$scope.saveVille = saveVille;
	$scope.latitude = '';
	$scope.longitude = '';


	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        $scope.weatherGeoLoc = "Geolocation is not supported by this browser.";
	    }
	}
// Changement de Ville
	function changeLocation(ville) {
		console.log(ville);
		var key = 'k4PhQK9E67eEXB0Armk8NmvigCzFonOJ';
		var geocodata = $http.get('http://www.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+ville);
		geocodata.then(
			function(cityGeoloc){
					$scope.paysLat = cityGeoloc.data.results[0].locations[0].latLng.lat;
					$scope.paysLng = cityGeoloc.data.results[0].locations[0].latLng.lng;
					weatherData(ville, $scope.paysLat, $scope.paysLng);
					
			});

	};
//Sauvegarder la ville dans un tableau et dans le localStorage
	function saveVille(villeS, latitudeS, longitudeS){
		$scope.villeSave.push([$scope.villeS,latitudeS,longitudeS]);
		console.log($scope.villeSave);
		localStorage.setItem('ville',JSON.stringify($scope.villeSave));
	}
//
	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		$scope.villeSave = JSON.parse(localStorage.getItem("ville"));
		console.log(JSON.parse(localStorage.getItem("ville")));
		weatherData('Paris',latitude, longitude);
	}


//
		function weatherData(ville, latitude, longitude){
			var key = "a658e50f59f20edc68091fd4df6f40f5";
			var promise = $http.get('https://lit-ridge-46374.herokuapp.com/forecast/'+key+"/"+latitude+","+longitude);
			promise.then(
			function(weather){

				// var keyVille = "AIzaSyCdsqv3-ZT3v50r0IEiCR9RHieo1eZpX0A";
				// var promiseVille = $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key="+keyVille);
				// promiseVille.then(function(response){
				// 	console.log(response.data.results.address_components);
				// });
			   $scope.villeS = ville;
			   $scope.latitude = latitude;
			   $scope.longitude = longitude;
	           $scope.weatherTimezone = weather.data.timezone;
	           $scope.degrees = convertToC(weather.data.currently.temperature);
	           $scope.date = new Date();
	           $scope.summary = weather.data.currently.summary;
	           $scope.daily = weather.data.daily.data[0];
	           $scope.daily.apparentTemperatureHigh = convertToC($scope.daily.apparentTemperatureHigh);
	           $scope.daily.apparentTemperatureLow = convertToC($scope.daily.apparentTemperatureLow);

	        for (var i =0; i <49; i++) {
	           	weather.data.hourly.data[i].time =  new Date(weather.data.hourly.data[i].time*1000);
	           }
	           
	           $scope.daily.sunriseTime = new Date($scope.daily.sunriseTime*1000);
	           $scope.daily.sunsetTime = new Date($scope.daily.sunsetTime*1000);
			   $scope.hourly = weather.data.hourly.data;
	           console.log(weather);

	        var heure = new Date(weather.data.currently.time*1000);
	    	})
			}

		function convertToF(celsius) {
		return celsius * (9/5) + 32;
		}

		function convertToC(fahrenheit) {
		return (fahrenheit - 32) * (5/9) ;
		}

		function changeCelFar() {
		if ($scope.celsius){
           $scope.degrees = convertToF($scope.degrees);
           $scope.daily.apparentTemperatureHigh = convertToF($scope.daily.apparentTemperatureHigh);
           $scope.daily.apparentTemperatureLow = convertToF($scope.daily.apparentTemperatureLow);
		} else {
           $scope.degrees = convertToC($scope.degrees);
           $scope.daily.apparentTemperatureHigh = convertToC($scope.daily.apparentTemperatureHigh);
           $scope.daily.apparentTemperatureLow = convertToC($scope.daily.apparentTemperatureLow);
		} 
		$scope.celsius = !$scope.celsius;
		}
		});