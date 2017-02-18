angular
    .module('Argo.Controllers.AdminLoginCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('AdminLoginCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        'AuthorizationSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, AuthorizationSrvc) {

            $scope.userData = {
                'email': '',
                'password': ''
            };

            $scope.login = function() {
                AuthorizationSrvc.loginUser($scope.userData).then(function(data) {
                    Materialize.toast('Zostałeś zalogowany!', 4000);
                    $state.go('products');
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };


        }
    ]);
