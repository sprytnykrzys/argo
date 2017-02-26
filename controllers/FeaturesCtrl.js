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

                    for(var i=0; i<$scope.products.length; i++){
                        if($scope.products[i].properties){
                            for(var key in $scope.products[i].properties){
                                $scope.products[i].propertiesCount = key;
                            }
                            $scope.products[i].propertiesCount++;
                        }else{
                            $scope.products[i].propertiesCount = 1;
                        }
                    }

                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getProductsFromAPI();

            $scope.newItem = {
                properties: {

                }
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

            $scope.sendProperties = function(id) {
                $scope.newItem.id = id;
                var prod = $scope.newItem;
                ContentSrvc.updateProduct(prod).then(function(data) {
                    $scope.getProductsFromAPI();
                    Materialize.toast('Zapisano!', 4000);
                    $scope.newItem = {
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
