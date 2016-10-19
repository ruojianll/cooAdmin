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
					$state.go("user");
				},function(err){
					$scope.user_name = "";
					$scope.password = "";
					alert("登录失败,账号或密码错误");
				}
			)
		}
}).controller("homeCtrl",function($scope,apiServ,$state){
	$scope.vm={}
	var _selected;
    $scope.selected = undefined;
    $scope.states = ["two","three"];
	if(localStorage.user_id && localStorage.web_token){

	}else{
		$state.go("login")
	}
	//获取所有用户
	apiServ.post("/api/manager/user/all",{}).then(
		function(data){
			console.log(data)
			$scope.aUser = data;
			$scope.arr_user = $scope.aUser.slice(0,5)
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
			$scope.arr_orgnization = $scope.aOrgnization.slice(0,5)
		},
		function(err){
				console.log("cuowu")
		}
	)
	//user分页功能
	$scope.userPage = function(){
		$scope.arr_user = $scope.aUser.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//用户焦点
	$scope.focus = function(){
		$scope.vm.focus_name = this.x.user_name;
		$scope.vm.focus_id = this.x.id;
		console.log(this)
		apiServ.post("/api/manager/user_orgnization/get",{
			user_id:$scope.vm.focus_id
		}).then(
			function(data){
				console.log(data)
//				$scope.user_o用户所在的所有组织
				$scope.user_o = data;
			},
			function(err){
				console.log(data)
			}
		)
		
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
	//user页面新建组织映射
	$scope.user_add = function(){
		apiServ.post("/api/manager/user_orgnization/new",{
			user_id:$scope.vm.focus_id,
    		orgnization_id:$scope.vm.id
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//删除组织映射
	$scope.o_del = function(){
		console.log(this)
		apiServ.post("/api/manager/user_orgnization/delete",{
			id:this.x.id
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	$scope.user_del = function(){
		console.log(this)
		apiServ.post("/api/manager/user_orgnization/delete",{
			id:this.x.id
		}).then(
			function(data){
				console.log(data)
			},
			function(err){
				console.log(err)
			}
		)
	}
	//orgnization分页功能
	$scope.orgnizationPage = function(){
		$scope.arr_orgnization = $scope.aOrgnization.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//组织焦点
	$scope.o_focus = function(){
//		console.log(this)
		$scope.vm.o_name = this.x.name;
		$scope.vm.o_id = this.x.id;
		apiServ.post("/api/manager/user_orgnization/get",{
			orgnization_id:$scope.vm.o_id
		}).then(
			function(data){
				console.log(data)
//				$scope.o_user组织的所有用户
				$scope.o_user = data;
			},
			function(err){
				console.log(data)
			}
		)
	}
	//组织页面新建组织映射
	$scope.o_add = function(){
//		console.log($scope.vm.id)
		apiServ.post("/api/manager/user_orgnization/new",{
			user_id:$scope.vm.id,
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
//		console.log(this)
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
	//获取所有公告
	apiServ.post("/api/manager/board/all",{}).then(
//		console.log($scope.aOrgnization)//所有组
//		console.log($scope.aUser)//所有用户
//		console.log(data)//所有公告板
		function(data){
			$scope.board = data;
			$scope.arr_board = $scope.board.slice(0,5)
			$scope.boardItems = Math.ceil($scope.board.length / 5)*10;
			//给data加onwer键值对
			for(var i = 0;i < data.length;i++){
				if(data[i].type == "personal"){
//						alert(data[i].relative_id)
					for(var j = 0;j < $scope.aUser.length;j++){
						if(data[i].relative_id == $scope.aUser[j].id){
							$scope.board[i].owner = $scope.aUser[j].user_name;
						}
					}
				}else if(data[i].type == "orgnizational"){
					for(var j = 0;j < $scope.aOrgnization.length;j++){
						if(data[i].relative_id == $scope.aOrgnization[j].id){
							$scope.board[i].owner = $scope.aOrgnization[j].name;
						}
					}
				}
			}
			
		},
		function(err){
			console.log(err)
		}
	)
	//board分页
	$scope.boardPage = function(){
		$scope.arr_board = $scope.board.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//board焦点
	$scope.board_focus = function(){
		console.log(this)
		$scope.board_id = this.x.id;
		apiServ.post("/api/manager/card/get",{board_id:$scope.board_id}).then(
			function(data){
				console.log(data)
				$scope.card = data;
				$scope.arr_card = $scope.card.slice(0,5)
				$scope.cardItems = Math.ceil($scope.card.length / 5)*10;
			},
			function(err){
				console.log(err)
			}
		)
	}
	//card分页
	$scope.cardPage = function(){
		$scope.arr_card = $scope.card.slice((this.currentPage-1)*5,this.currentPage*5)
	}
	//card焦点
	$scope.card_focus = function(){
		console.log(this)
		$scope.card_id = this.x.id;
		apiServ.post("/api/manager/item/get",{card_id:$scope.card_id}).then(
			function(data){
				console.log(data)
				var tmpData = [];
				var _html = "";
				for(var i = 0;i < data.length;i++){
					tmpData = eval('('+data[i].data+')');
//					alert(tmpData.data.url)
					if(tmpData.type == "image"){
						_html += '<a href="javascript:;"><img src ="'+tmpData.data.url+'" title="'+tmpData.data.title+'"/></a>'
					}else if(tmpData.type == "text"){
						_html += '<span>'+tmpData.data+'</span>';
					}else if(tmpData.type == "time"){
						_html += '<span>'+tmpData.data+'</span>'
					}else if(tmpData.type == "checkbox"){
						if(tmpData.data.checked == false){
							_html += '<span><input type="checkbox" />'+tmpData.data.text+'</span>'
						}else{
							_html += '<span><input type="checkbox" checked/>'+tmpData.data.text+'</span>'
						}
					}else if(tmpData.type == "at"){
						_html += '<span>@'+tmpData.data.name+' ID:'+tmpData.data.id+'</span>';
					}
				}
				$(".boards_right").html(_html)
			},
			function(err){
				console.log(err)
			}
		)
	}
})
