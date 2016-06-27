angular.module('routerApp').controller('IndexCtrl', function ($http, $scope) {
    $scope.tabActive = function ($state) {
        return $state.includes("home");
    }

    $http.get('http://localhost:8082/users').success(function (data) {
        $scope.userList = data;

    });
});