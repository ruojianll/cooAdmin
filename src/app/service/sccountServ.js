angular.module('cooAdmin').service('accountServ',function(environment,$http,apiServ){
    var login = function(user_name,password){
    return apiServ.post("/api/account/login",{user_name:user_name,password:password}).then(
        function(data){
            var user_id = data.id;
            var token = data.web_token;
            localStorage['user_id'] = user_id;
            localStorage['web_token'] = token;
        }
        )
    }
    var logout = function(){
        delete localStorage['user_id'];
        delete localStorage['web_token'];
    }
    return {
        'login':login,
        'logout':logout
    }
});
