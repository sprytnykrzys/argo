angular
    .module('Argo.Controllers.MainProductsCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('MainProductsCtrl', [
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
                    defered.resolve();
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                    defered.reject();
                });
            };

            $scope.getCategoriesFromAPI = function() {
                $scope.categories = null;
                ContentSrvc.getCategories().then(function(data) {
                    $scope.categories = data.data.categories;
                    defered.resolve();
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                    defered.reject();
                });
            };

            $scope.getProductsFromAPI();

            $scope.getCategoriesFromAPI();

        
        }
    ]);