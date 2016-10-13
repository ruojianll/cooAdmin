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
      })
      .state("login_in",{
      	url: "/login_in",
      	templateUrl: "app/template/login_in_template.html",
      	controller: "login"
      })
			.state("index",{
      	url: "/index",
      	templateUrl: "app/template/index.html",
      	controller: "index"
      })
    $urlRouterProvider.otherwise('login');
  }

})();
