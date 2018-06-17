angular.module("facebook").controller("profilListController", function($scope, profilListModel){
	$scope.listOfProfil = profilListModel.getProfiles();
	console.log('$scope.listOfProfil : ', $scope.listOfProfil);

});