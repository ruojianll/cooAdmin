angular.module("cooAdmin").controller("login",function($scope,apiServ,environment,accountServ,$state){
	   	//login_in 检索功能
	   	var _selected;
	    $scope.selected = undefined;
	    $scope.states = [];
	  
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
	$scope.vm={}
	
	if(localStorage.user_id && localStorage.web_token){

	}else{
		$state.go("login")
	}
	//获取所有用户
	apiServ.post("/api/manager/user/all",{}).then(
		function(data){
//						console.log(data)
			$scope.aUser = data;
			$scope.arr_user = $scope.aUser.slice(0,5)
			$scope.userItems = Math.ceil($scope.aUser.length / 5)*10;
		},
		function(err){
				console.log("cuowu")
		}
	)
	//user分页功能
	$scope.userPage = function(){
		$scope.arr_user = $scope.aUser.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//focus焦点
	$scope.focus = function(){
		$scope.vm.focus_name = this.x.user_name;
		$scope.vm.focus_id = this.x.id;
		console.log(this)
	}
	//编辑用户
	$scope.edit = function(){
//		console.log($scope.vm.focus_id)
//		console.log($scope.vm.focus_name)
//		console.log($scope.vm.focus_password)
		apiServ.post("/api/manager/user/edit",{
			user_id:$scope.vm.focus_id,
		    user_name:$scope.vm.focus_name,
		    user_password:$scope.vm.focus_password
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//创建用户
	$scope.create = function(){
//		console.log($scope.vm.focus_name)
//		console.log($scope.vm.focus_password)
		apiServ.post("/api/manager/user/new",{
			user_name:$scope.vm.focus_name, 
			user_password:$scope.vm.focus_password 
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//删除用户
	$scope.delete = function(){
		apiServ.post("/api/manager/user/delete",{user_id:$scope.vm.focus_id}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//获取所有组织
	apiServ.post("/api/manager/orgnization/all",{}).then(
		function(data){
//				console.log(data)
			$scope.aOrgnization = data;
			$scope.orgnizationItems = Math.ceil($scope.aOrgnization.length / 5)*10;
			$scope.arr_orgnization = $scope.aOrgnization.slice(0,5)
		},
		function(err){
				console.log("cuowu")
		}
	)
	//orgnization分页功能
	$scope.orgnizationPage = function(){
		$scope.arr_orgnization = $scope.aOrgnization.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//组织焦点
	$scope.o_focus = function(){
//		console.log(this)
		$scope.vm.o_name = this.x.name;
		$scope.vm.o_id = this.x.id;
	}
	//创建组织
	$scope.o_create = function(){
		console.log($scope.vm.o_name)
		apiServ.post("/api/manager/orgnization/new",{
			orgnization_name:$scope.vm.o_name
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//删除组织
	$scope.o_delete = function(){
		apiServ.post("/api/manager/orgnization/delete",{
			orgnization_id:$scope.vm.o_id
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//修改组织
	$scope.o_edit = function(){
//		console.log($scope.vm.o_id)
//		console.log($scope.vm.o_name)
		apiServ.post("/api/manager/orgnization/edit",{
			orgnization_id:$scope.vm.o_id,
   			orgnization_name:$scope.vm.o_name}
		).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
})
