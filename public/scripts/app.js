//here are defined all application states
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.run([
    "$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }
]);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller:'IndexCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        });

    $urlRouterProvider.otherwise('/home');

});
