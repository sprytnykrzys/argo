angular
    .module('Argo.Controllers.FeaturesCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('FeaturesCtrl', [
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

            $scope.newItem = {
                name: {

                },
                description: {

                },
                categoryId: 1,
                properties: {

                }
            };

            $scope.addProperties = function() {

                $scope.sendProperties($scope.newItem);

            };

            $scope.editProduct = function(prod) {
                prod.edit = !prod.edit;
            };

            $scope.saveProduct = function(index, prod) {
                ContentSrvc.updateProduct($scope.products[index]).then(function(data) {
                    prod.edit = !prod.edit;
                    $scope.getProductsFromAPI();
                    Materialize.toast('Zapisano!', 4000);
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getProductsFromAPI();
                    }
                });
            };

            $scope.sendProperties = function(prod) {
                ContentSrvc.updateProduct(prod).then(function(data) {
                    $scope.getProductsFromAPI();
                    Materialize.toast('Zapisano!', 4000);
                    $scope.newItem = {
                        name: {

                        },
                        description: {

                        },
                        categoryId: 1,
                        properties: {

                        }
                    };
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getProductsFromAPI();
                    }
                });
            };

            $scope.closeEditMode = function(prod) {
                prod.edit = !prod.edit;
                $scope.products = angular.copy($localStorage.products);
            };

            $scope.deleteProduct = function(prod) {
                ContentSrvc.deleteProduct(prod).then(function(data) {
                    $scope.getProductsFromAPI();
                    Materialize.toast('Usunięto!', 4000);
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getProductsFromAPI();
                    }
                });
            };

        }
    ]);
