angular.module("cooAdmin").controller("login",function($scope,apiServ,environment,accountServ,$state){
	  var _selected;
	  $scope.selected = undefined;
	  $scope.states = [];
	  //获取所有用户
		apiServ.post("/api/manager/user/all",{}).then(
				function(data){
						for(var x in data){
							$scope.states.push(data[x].user_name)
						}
						console.log($scope.states)
				},
				function(err){
						console.log("cuowu")
				}
		)
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
}).controller("homeCtrl",function($scope,apiServ,$state){	
		if(localStorage.user_id && localStorage.web_token){
//				return;
		}else{
				$state.go("login")
		}
		//获取所有用户
		apiServ.post("/api/manager/user/all",{}).then(
				function(data){
						console.log(data)
						$scope.aUser = data;
						$scope.userItems = Math.ceil($scope.aUser.length / 5)*10;
				},
				function(err){
						console.log("cuowu")
				}
		)
		//获取所有组织
		apiServ.post("/api/manager/orgnization/all",{}).then(
				function(data){
						console.log(data)
						$scope.aOrgnization = data;
						$scope.orgnizationItems = Math.ceil($scope.aOrgnization.length / 5)*10;
						
				},
				function(err){
						console.log("cuowu")
				}
		)
	
	
	
})
