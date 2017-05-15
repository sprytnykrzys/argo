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

            $scope.basketData = {
                "lang": $localStorage.currLang,
                "mail": "",
                "nip": "",
                "message": "",
                "products": $localStorage.shoppingBasket
            };

            $scope.sendBasket = function() {
                ContentSrvc.sendBasket($scope.basketData).then(function(data) {
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


            $scope.getProductsFromAPI();

            $scope.basket = $localStorage.shoppingBasket;

            $scope.deleteProductFromBasket = function(data) {
                $localStorage.shoppingBasket.splice($localStorage.shoppingBasket.indexOf(data), 1);
            }



            $scope.validate = function() {

                var email = $scope.basketData.mail;

                if (email == '') {
                    return true;

                }

                if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    return true;
                } else {
                    return false;
                }

            }

            $scope.ifBasketEmpty = function() {
                if (!$localStorage.shoppingBasket || $localStorage.shoppingBasket.length == 0) {
                    return true;
                } else {
                    return false;
                }

            };




        }
    ]);
