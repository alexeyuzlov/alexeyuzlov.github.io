'use strict';

var app = angular.module('myApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl'
    });
    $routeProvider.when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);

appControllers.controller('IndexCtrl', ['$scope', function ($scope) {
    console.log($scope);
}]);

appControllers.controller('AboutCtrl', ['$scope', function ($scope) {
    console.log($scope);
}]);