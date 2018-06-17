angular.module("app").controller("controller", function($scope, $http, $sce){
	$scope.matches=[];
	$scope.winner = [[{name1p: "test1", name2p : "test2"}]];
	$scope.looser = [];
	var players = [];
	var roundWinner = 1;
	var roundLooser = -1;
	$scope.compteur = 0;
	allTournoi();
	$scope.listTournoi = []
	$scope.tournoiInfo="";
	$scope.challonge = "";


	function allTournoi(){
		$http.get('http://localhost:1407/index').then(function(response){
			$scope.listTournoi = response.data;
		})
	}

	$scope.create = function(tournoi){
		$http.post('http://localhost:1407/create',tournoi).then(function(response){
			console.log(response.data);
		})
	}



	$scope.display = function(url){
		$scope.winner = [];
		$scope.looser = [];
		roundWinner = 1;
		roundLooser = -1;
		$http.get("http://localhost:1407/show/"+url).then(function(response){
			$scope.tournoiInfo = response.data;
			console.log($scope.tournoiInfo.tournament.state);
		})
		$http.get("http://localhost:1407/mindex/"+url).then(function(response){

			$scope.matches = Object.entries(response.data);
			$http.get("http://localhost:1407/pindex/"+url).then(function(res){
					var tabRoundWinner = [];
					var tabRoundLooser = [];
				$scope.players = Object.entries(res.data);
				for(var i = 0 ; i < $scope.matches.length; i++){
					$scope.players.forEach(function(element){
						 if($scope.matches[i][1].match.player1Id == element[1].participant.id){
						 	$scope.matches[i][1].match.name1p = element[1].participant.displayName;

						 }
						 else if($scope.matches[i][1].match.player2Id == element[1].participant.id){
						 	$scope.matches[i][1].match.name2p = element[1].participant.displayName;
						 }
					})
					if($scope.matches[i][1].match.round > 0){
						if($scope.matches[i][1].match.round > roundWinner){
							roundWinner = $scope.matches[i][1].match.round;
							if(tabRoundWinner.length > 0){
								$scope.winner.push(tabRoundWinner);
							}
							var tabRoundWinner = [];
						}
						tabRoundWinner.push($scope.matches[i][1].match);
					}
					else{
						// $scope.looser.push($scope.matches[i][1].match);
						if($scope.matches[i][1].match.round < roundLooser){
							if(tabRoundLooser.length > 0){
								$scope.looser.push(tabRoundLooser);
							}
							var tabRoundLooser = [];
							roundLooser = $scope.matches[i][1].match.round;
						}
						tabRoundLooser.push($scope.matches[i][1].match);
					}
				}
				$scope.winner.push(tabRoundWinner);
				$scope.looser.push(tabRoundLooser); 
				document.getElementById('challonge').src = $sce.trustAsHtml("https://challonge.com/"+url+"/module?match_width_multiplier=1.2&show_final_results=1");
			})
		})
	}

	$scope.addPlayer = function(player, url){
		$http.post("http://localhost:1407/pcreate/"+url, player).then(function(response){
			console.log(response.data);
			$http.get("http://localhost:1407/pindex/"+url).then(function(res){
				$scope.players = Object.entries(res.data);
				console.log(res.data)
			})
		})
	}

})