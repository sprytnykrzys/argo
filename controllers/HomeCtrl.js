angular
    .module('Argo.Controllers.HomeCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('HomeCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, ContentSrvc) {
        
            $scope.getProductsFromAPI = function() {
                $scope.products = null;
                ContentSrvc.getProducts().then(function(data) {
                    $scope.products = data.data.products;
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getProductsFromAPI();

            $('.carousel').carousel();
        }
    ]);
