angular
    .module('Argo.Controllers.ShoppingBasketCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('ShoppingBasketCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, ContentSrvc) {

            $scope.contactData = {
                "from": "",
                "message": "",
                "subject": ""
            };

            $scope.send = function() {
                ContentSrvc.sendMail($scope.contactData).then(function(data) {
                    Materialize.toast('Wiadomość została wysłana', 4000);
                }, function(data) {
                    $rootScope.hidePreloader();
                    setTimeout(function() {
                        Materialize.toast('Wystąpił błąd', 4000);
                    }, 500);
                    
                });
            };

            $scope.getProductsFromAPI = function() {
                $scope.products = null;
                ContentSrvc.getProducts().then(function(data) {
                    $scope.products = data.data.products;
                    if ($stateParams.id) {
                        for (var i = 0; i < $scope.products.length; i++) {
                            if ($scope.products[i].id == $stateParams.id) {
                                $rootScope.singleProduct = true;
                                $scope.currentProductId = $stateParams.id;
                            }
                        }

                    }
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getCategoriesFromAPI = function() {
                $scope.categories = null;
                ContentSrvc.getCategories().then(function(data) {
                    $scope.categories = data.data.categories;
                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getProductsFromAPI();

            $scope.getCategoriesFromAPI();

        
        }
    ]);
