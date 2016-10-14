angular.module("cooAdmin").controller("login",function($scope,apiServ,environment,accountServ,$state){
	  var _selected;
	  $scope.selected = undefined;
	  $scope.states = ['lilei', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',];
		$scope.click = function(){
			accountServ.login($scope.user_name,$scope.password).then(
				function(data){
					$state.go("user")
				},function(err){
					$scope.user_name = "";
					$scope.password = "";
					alert("登录失败,账号或密码错误");
				}
			)
		}
}).controller("homeCtrl",function($scope,apiServ){
	var _selected;
  $scope.selected = undefined;
  $scope.states = ['lilei','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii','Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan'];
  
  //--------users
   $scope.totalItems = 60;
   $scope.currentPage = 3;
  
  $scope.fn = function(){
		accountServ.login($scope.user_name,$scope.user_password).then(
			function(data){
				console.log(data)
				$state.go("home.user");
			},
			function(err){
				alert(err)
			}
		);
  }
  //获取全部人员
  apiServ.post('/api/manager/user/all').then(
  	function (data){
//		console.log(data)
  		$scope.all=data;
  	},
  	function (err){
  		
  	}
  );
  //获取全部组织
	apiServ.post('/api/manager/orgnization/all').then(
		function (data_or){
			console.log(data_or)
			$scope.all_2=data_or;
		},
		function(err){
			
		}
	);
	//对组织的编辑Edit
	$scope.Edit=function (){
		
	}
	
	
})
