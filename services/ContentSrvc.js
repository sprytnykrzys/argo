angular.module('Argo.Services.ContentSrvc', [
    'ngStorage'
])

.service('ContentSrvc', [
    '$http',
    '$localStorage',
    '$state',
    '$rootScope',
    '$window',
    '$q',

    
    function($http, $localStorage, $state, $rootScope, $window, $q) {

        this.getProducts = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + "/product",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.products = data.data.products;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.getCategories = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + "/category",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.categories = data.data.categories;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.updateProduct = function(prod) {
            $rootScope.showPreloader();
            var data = {
                    "uid": $localStorage.user.uid,
                    "token": $localStorage.user.token,
                    "product": prod
            };

            delete data.product.edit;

            var req = {
                method: 'POST',
                data: data,
                url: $rootScope.endpointURL + "/product/create",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.token = data.data.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.updateCategory = function(p) {
            $rootScope.showPreloader();
            var data = {
                    "uid": $localStorage.user.uid,
                    "token": $localStorage.user.token,
                    "category": p
            };

            delete data.category.edit;

            var req = {
                method: 'POST',
                data: data,
                url: $rootScope.endpointURL + "/category/create",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.token = data.data.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteProduct = function(prod) {
            $rootScope.showPreloader();
            var data = {
                    "uid": $localStorage.user.uid,
                    "token": $localStorage.user.token,
                    "id" : prod.id,
            };
            var req = {
                method: 'POST',
                data: data,
                url: $rootScope.endpointURL + "/product/delete",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.token = data.data.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteCategory = function(p) {
            $rootScope.showPreloader();
            var data = {
                    "uid": $localStorage.user.uid,
                    "token": $localStorage.user.token,
                    "id" : p.id,
            };
            var req = {
                method: 'POST',
                data: data,
                url: $rootScope.endpointURL + "/category/delete",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.token = data.data.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.sendMail = function(con) {
            $rootScope.showPreloader();
            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + "/contact",
                data: con,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $rootScope.hidePreloader();
            });

            return promise;
        };
    }
]);
