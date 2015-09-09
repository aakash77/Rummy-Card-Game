'use strict';
rummy.controller("MainController", function($scope,DataService) {

	var initPtsVar = {
			"papa":0,
			"mamma":0,
			"anand":0,
			"shikha":0,
			"aakash":0
		};
	$scope.names = [];
	this.init = function(){
		$scope.scores=[];
		/*$scope.names = ["papa", "mamma","anand","shikha","aakash","srushti"];*/
		$scope.names = ["papa","mamma","anand","shikha","aakash"];
		/*$scope.names = ["papa","mamma","shikha","aakash"];*/
		initPoints();
		DataService.getData("/api/data",[]).success(function(resp){
			if(resp.data.length>0){
				$scope.scores.push(JSON.parse(resp.data[0].data));
			}
		}).error(function(err){
			alert(err.msg);
		});
		$scope.show = $scope.names[0];
	};

	//Disable text box on the basis of show select
	this.showVal = function(name){
		if($scope.show===name){
			return true;
		}else{
			return false;
		}
	};


	this.addScore = function(){
		var total_maal	= 0;

		$scope.names.forEach(function(name){
			total_maal+=$scope.maal[name];
		});	
		
		var score = {},total_sc=0;
		$scope.names.forEach(function(name){
			if($scope.show===name){
				score[name] = 0;
			}else{
				score[name] = ($scope.names.length*$scope.maal[name]) - ($scope.pts[name]+total_maal);
			}
			total_sc+=score[name];
		});

		score[$scope.show] = -1*total_sc;
		$scope.scores.push(score);

		initPoints();

		//Calculate total scores
		$scope.scores.forEach(function(sc){
			$scope.names.forEach(function(name){
				$scope.total[name]+=sc[name];
			});
		});

		//add data in db
		var params = {
			"payload" : JSON.stringify($scope.total),
			"timestamp" : new Date()
		};

		DataService.postData("/api/data",params).success(function(resp){

		}).error(function(err){
			alert(err.msg);
		});
	};

	//get total of scores
	this.getTotal = function(name){

		var total = 0;
		$scope.scores.forEach(function(round){
			total+=round[name];
		});
		return total;
	};

	//Refresh database results
	this.clearDb = function(){
		DataService.deleteData("/api/data",[]).success(function(resp){
			$scope.scores=[];
			initPoints();
		}).error(function(err){
			alert(err.msg);
		})
	};

	//initialize objects
	function initPoints(){
		$scope.pts 	= angular.copy(initPtsVar);
		$scope.maal = angular.copy(initPtsVar);
		$scope.total= angular.copy(initPtsVar);
	}
});