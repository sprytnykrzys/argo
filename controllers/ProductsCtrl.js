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

            $scope.newPosition = {
                position: ""
            }

            $scope.changeUpPosition = function(p, position) {
                if (position == 0) {
                    Materialize.toast('Nie ma takiej pozycji!', 4000);
                } else {
                    $scope.newPosition.position = position;
                    $scope.setSequence(p.id, p.categoryId);
                }
            }

            $scope.changeDownPosition = function(p, position) {
                if ($localStorage.products.length == position + 1) {
                    Materialize.toast('Nie ma takiej pozycji!', 4000);
                } else {
                    $scope.newPosition.position = position + 2;
                    $scope.setSequence(p.id, p.categoryId);
                }

            }

            $scope.setSequence = function(id_product, id_category, position) {
                // $scope.newPosition.id_category = id_category;
                if ($scope.newPosition.position == position +1) {
                    Materialize.toast('Nie ma takiej pozycji!', 4000);
                } else {

                    $scope.newPosition.id_product = id_product;

                    ContentSrvc.setSequenceProducts($scope.newPosition).then(function(data) {
                        $scope.getProductsFromAPI();
                        Materialize.toast('Zapisano!', 4000);

                        $scope.newPosition = {
                            position: "",
                            id_category: "",
                            id_product: ""
                        }

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            Materialize.toast('Zostałeś wylogowany', 4000);
                            $state.go('adminLogin');
                        } else {
                            Materialize.toast('Wystąpił błąd', 4000);
                            $scope.getCategoriesFromAPI();
                        }
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