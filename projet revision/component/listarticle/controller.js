angular.module("app").controller("listController", function($scope, $http){
	$scope.listArticle = [];
	$http.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(function(res){
		for (var i = 0; i < 30; i++) {
			$http.get("https://hacker-news.firebaseio.com/v0/item/"+res.data[i]+".json?print=pretty").then(function(response){
				$scope.listArticle.push(response.data);
			})
		}
	})
})