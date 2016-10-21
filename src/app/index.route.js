(function() {
  'use strict';

  angular
    .module('cooAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/template/login.template.html',
        controller: "init"
      })
      .state("login_in",{
      	url: "/login_in",
      	templateUrl: "app/template/login_in_template.html",
      	controller: "login_in"
      })
			.state("user",{
				url: '/user',
        templateUrl: 'app/template/user.template.html',
        controller: 'homeCtrl'
			})
			
    $urlRouterProvider.otherwise('login');
  }

})();
