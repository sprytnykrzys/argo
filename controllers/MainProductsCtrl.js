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

            $scope.singleProduct = false;

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

            $scope.allCategory = true;
            $scope.currProd = 0;

            $scope.changeCategory = function(category, categoryId) {
                $scope.category = category;
                $scope.categoryId = categoryId;
                $scope.allCategory = false;
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

            // $('select').material_select();
            // $('ul.tabs').tabs();

            if ($stateParams.id) {
                $scope.singleProduct = true;
                $scope.currentProductId = $stateParams.id;

            }

        }
    ]);
