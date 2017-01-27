angular
    .module('Argo.Controllers.ProductsCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('ProductsCtrl', [
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

            $scope.newItem = {
                name: {

                },
                description: {

                },
                categoryId: 1
            };

            $scope.addProduct = function() {
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newItem.image = null;
                    $scope.sendProduct($scope.newItem);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newItem.image = base64;
                        $scope.sendProduct($scope.newItem);
                    });
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
                        defered.reject();
                    }
                });
            };

            $scope.sendProduct = function(prod) {
                ContentSrvc.updateProduct(prod).then(function(data) {
                    $scope.getProductsFromAPI();
                    Materialize.toast('Zapisano!', 4000);
                    $scope.newItem = {
                        name: {

                        },
                        description: {

                        },
                        categoryId: 1
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
                        defered.reject();
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
                        defered.reject();
                    }
                });
            };

            $scope.selectPicture = function(index, prod) {
                var selectedFile = document.getElementById('file' + prod.id).files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.products[index].image = null;
                    $scope.saveProduct(index, prod);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.products[index].image = base64;
                        $scope.saveProduct(index, prod);
                    });
                }
            };

            File.prototype.convertToBase64 = function(callback) {
                var FR = new FileReader();
                FR.onload = function(e) {
                    callback(e.target.result)
                };
                FR.readAsDataURL(this);
            }
        }
    ]);
