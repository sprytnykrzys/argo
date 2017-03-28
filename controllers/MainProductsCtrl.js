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
        '$filter',
        'ContentSrvc',
        '$stateParams',
        function($scope, $state, $timeout, $localStorage, $rootScope, $filter, ContentSrvc, $stateParams) {

            $('.materialboxed').materialbox();
            $rootScope.singleProduct = false;

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

            $scope.getNestedCategoriesFromAPI = function() {
                $scope.nestedCategories = null;
                ContentSrvc.getNestedCategories().then(function(data) {
                    $scope.nestedCategories = data.data.categories;
                    $scope.currentCategories = data.data.categories;

                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getNestedCategoriesFromAPI();

            $scope.getProductsFromAPI();

            $scope.getCategoriesFromAPI();

            $scope.allCategory = true;
            $scope.currProd = 0;
            $scope.linksToSubcategories = [];
            $scope.lastCategories = [];
            $localStorage.links = $scope.linksToSubcategories;
            $localStorage.caa = $scope.lastCategories;
            $scope.nestedCategoriesCounter = 0;
            $scope.ifEnter = true;


            $scope.changeCategory = function(categoryNames, categoryId, objSubcategories, cat) {
                $scope.category = categoryNames;
                $scope.categoryId = categoryId;
                $scope.allCategory = false;
                $scope.nestedCategoriesCounter++;
                $scope.ifEnter = true;

                if ($scope.nestedCategoriesCounter > 1) {
                    $scope.lastCategory = $scope.currentCategories;
                    $scope.lastCategories.push($scope.lastCategory);
                }

                if (objSubcategories) {
                    $scope.currentCategories = objSubcategories;
                    $scope.linksToSubcategories.push(cat);
                    $scope.ifSubcategories = true;
                } else {
                    $scope.linksToSubcategories.push(cat);
                    $scope.ifSubcategories = false;
                }
            }

            $scope.backToAllCategory = function() {
                $scope.ifEnter = false;
                $scope.currentCategories = $scope.lastCategory;
                $scope.category = 0;
                $scope.linksToSubcategories.pop();
                $scope.nestedCategoriesCounter--;


                if ($scope.nestedCategoriesCounter > 0) {
                    if ($scope.lastCategories.length == 1) {
                        $scope.ifSubcategories = true;
                    } else if ($scope.ifSubcategories) {
                        $scope.lastCategories.pop();
                    } else {
                        $scope.ifSubcategories = true;
                    }
                }

                if ($scope.nestedCategoriesCounter == 0) {
                    $scope.lastCategories.pop();
                    $scope.allCategory = true;
                    $scope.currentCategories = $scope.nestedCategories;
                    $scope.ifEnter = true;
                }
            }


            $scope.changeMainCategory = function(data) {
                $scope.parentId = data;
            }

            $scope.changeAllCategory = function() {
                $scope.category = 0;
                $scope.allCategory = true;
            }

            $scope.moreProduct = function(id) {
                $scope.currProd = id;
            }

            $scope.lessProduct = function() {
                $scope.currProd = 0;
            }

            $scope.shoppingBasket = $localStorage.shoppingBasket;

            $scope.checkAmountOfProduct = function(p) {
                p.amount = 0;
                if ($scope.shoppingBasket) {
                    for (var i = 0; i < $scope.shoppingBasket.length; i++) {
                        if ($scope.shoppingBasket[i].id == $scope.currentProductId) {
                            p.amount = $scope.shoppingBasket[i].qty;
                        }
                    }
                }
            };


            $scope.addToShoppingBasket = function(prod) {
                if (!$localStorage.shoppingBasket) {
                    $localStorage.shoppingBasket = [];
                }

                var isInArray = '-1';
                for (var i = 0; i < $localStorage.shoppingBasket.length; i++) {
                    if ($localStorage.shoppingBasket[i].id == prod.id) {
                        isInArray = i;
                    }
                }
                if (isInArray == '-1') {
                    var obj = {
                        'id': prod.id,
                        'qty': prod.amount
                    };
                    $localStorage.shoppingBasket.push(obj);
                } else {
                    $localStorage.shoppingBasket[isInArray].qty = prod.amount;
                }

                $scope.shoppingBasket = $localStorage.shoppingBasket;
                Materialize.toast('Dodano!', 2000);
            };





        }
    ]);
