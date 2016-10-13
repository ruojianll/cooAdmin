angular.module("cooAdmin").controller("login",function($scope,apiServ,environment,accountServ){
	  var _selected;
	  $scope.selected = undefined;
	  $scope.states = ['lilei', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',];
		$scope.click = function(){
			accountServ.login($scope.user_name,$scope.password);
		}
}).controller("index",function($scope){
	$scope.maxSize = 3;
  $scope.bigTotalItems = 100;
//$scope.bigCurrentPage = 1;
})
