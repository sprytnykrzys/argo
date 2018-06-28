angular.module('Argo.Controllers.MainProductsCtrl', ['ui.router', 'ngAnimate']).controller('MainProductsCtrl', [
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
            ContentSrvc.getProducts().then(
                function(data) {
                    $scope.products = data.data.products;
                    if ($stateParams.id) {
                        for (var i = 0; i < $scope.products.length; i++) {
                            if ($scope.products[i].id == $stateParams.id) {
                                $rootScope.singleProduct = true;
                                $scope.currentProductId = $stateParams.id;
                            }
                        }
                    }
                },
                function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                }
            );
        };
        // $localStorage.currCategories = [];
        $scope.getNestedCategoriesFromAPI = function() {
            $scope.nestedCategories = null;
            $scope.currentCategories = null;
            ContentSrvc.getNestedCategories().then(
                function(data) {
                    $scope.nestedCategories = data.data.categories;
                    $scope.currentCategories = data.data.categories;

                    if ($localStorage.currCategories) {
                        $scope.currentCategories = $localStorage.currCategories;
                    } else {
                        $scope.currentCategories = $scope.nestedCategories;
                        $localStorage.currCategories = $scope.currentCategories;
                    }
                },
                function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                }
            );
        };

        $scope.getNestedCategoriesFromAPI();

        $scope.getProductsFromAPI();

        $scope.currProd = 0;

        $scope.lastCategories = [];
        // $scope.linksToSubcategories = [];
        // $localStorage.links = $scope.linksToSubcategories;
        $localStorage.caa = $scope.lastCategories;

        $scope.nestedCategoriesCounter = 0;
        $scope.ifEnter = true;
        $scope.allCategory = true;
        $scope.searchedProducts = $scope.products;
        $localStorage.ser = $scope.searchedProducts;

        $scope.searchedProducts = [];

        if ($localStorage.links) {
            $scope.linksToSubcategories = $localStorage.links;
        } else {
            $scope.linksToSubcategories = [];
            $localStorage.links = $scope.linksToSubcategories;
        }

        $scope.changeCategory = function(cat) {
            $scope.linksToSubcategories.push(cat);
            $scope.searchedProducts = [];
            $localStorage.links = $scope.linksToSubcategories;
            $scope.showProperCategories();
        };

        $scope.back = function() {
            $scope.linksToSubcategories.pop();
            $scope.showProperCategories();
        };

        $scope.isInChild = function(catId, sub) {
            if (!sub) {
                if (catId == $scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].id) {
                    $scope.searchedProducts.push(catId);
                    return true; // sprawdzanie czy produkt jest w kategorii aktualnie wybranej (ostatniej)
                }
                if ($scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories) {
                    for (var i in $scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories) {
                        if ($scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories.hasOwnProperty(i)) {
                            if ($scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories[i].id == catId) {
                                $scope.searchedProducts.push(catId);
                                return true; //sprawdzanie czy produkt jest w dzieciach kategorii aktualnie wybranej (ostatniej)
                            }
                        }
                    }
                }
                if ($scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories) {
                    for (var j in $scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories) {
                        if ($scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories.hasOwnProperty(j)) {
                            return $scope.isInChild(catId, $scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories[j]);
                        }
                    }
                }
            } else {
                if (sub.id == catId) {
                    $scope.searchedProducts.push(catId);
                    return true;
                }
                if (sub.subcategories) {
                    for (var j in sub.subcategories) {
                        if (sub.subcategories.hasOwnProperty(j)) {
                            return $scope.isInChild(catId, sub.subcategories[j]);
                        }
                    }
                }
            }
        };

        $scope.showProperCategories = function(category, index) {
            if (!category) {
                if ($scope.linksToSubcategories.length > 0) {
                    $scope.currentCategories = $scope.linksToSubcategories[$scope.linksToSubcategories.length - 1].subcategories;
                    if ($scope.currentCategories) {
                        $localStorage.currCategories = $scope.currentCategories;
                    } else {
                        $localStorage.currCategories = [];
                    }
                } else {
                    $scope.currentCategories = $scope.nestedCategories;
                    $scope.searchedProducts = $scope.products;
                    $localStorage.currCategories = $scope.currentCategories;
                }
            } else {
                if (category.subcategories) {
                    $scope.currentCategories = category.subcategories;
                    $localStorage.currCategories = $scope.currentCategories;
                } else {
                    $scope.currentCategories = category.subcategories;
                    $localStorage.currCategories = [];
                }
                $scope.linksToSubcategories.splice(index + 1, $scope.linksToSubcategories.length - index);
            }
        };

        $scope.changeMainCategory = function(data) {
            $scope.parentId = data;
        };

        $scope.changeAllCategory = function() {
            $scope.currentCategories = $scope.nestedCategories;
            $localStorage.currCategories = $scope.currentCategories;
            $scope.linksToSubcategories = [];
            $localStorage.links = [];
            $scope.searchedProducts = $scope.products;
        };

        $scope.moreProduct = function(id) {
            $scope.currProd = id;
        };

        $scope.lessProduct = function() {
            $scope.currProd = 0;
        };

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
                    id: prod.id,
                    qty: prod.amount
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
