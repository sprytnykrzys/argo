angular
    .module('Argo.Routes', [
        'ui.router',
        'ngMaterial',

        'Argo.Services.AuthorizationSrvc',
        'Argo.Services.ContentSrvc',

        'Argo.Controllers.MainCtrl',
        'Argo.Controllers.AdminCtrl',
        'Argo.Controllers.AdminLoginCtrl',
        'Argo.Controllers.IndexCtrl',
        'Argo.Controllers.ProductsCtrl',
        'Argo.Controllers.CategoriesCtrl',
        'Argo.Controllers.MainProductsCtrl',
        'Argo.Controllers.ContactCtrl',
        'Argo.Controllers.HistoryCtrl',
        'Argo.Controllers.HomeCtrl',
        'Argo.Controllers.FeaturesCtrl',
        'Argo.Controllers.ShoppingBasketCtrl'
    ])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$mdDateLocaleProvider',
        '$httpProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $httpProvider, $locationProvider) {
            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/admin.html',
                    controller: 'AdminCtrl'
                })
                .state('adminLogin', {
                    url: '/login',
                    templateUrl: 'views/adminLogin.html',
                    parent: 'admin',
                    controller: 'AdminLoginCtrl'
                })
                .state('products', {
                    url: '/products',
                    templateUrl: 'views/products.html',
                    parent: 'admin',
                    controller: 'ProductsCtrl'
                })
                .state('features', {
                    url: '/features',
                    templateUrl: 'views/features.html',
                    parent: 'admin',
                    controller: 'FeaturesCtrl'
                })
                .state('categories', {
                    url: '/categories',
                    templateUrl: 'views/categories.html',
                    parent: 'admin',
                    controller: 'CategoriesCtrl'
                })
                .state('mainProducts', {
                    url: '/products?id',
                    templateUrl: 'views/mainProducts.html',
                    parent: 'main',
                    controller: 'MainProductsCtrl'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'views/contact.html',
                    parent: 'main',
                    controller: 'ContactCtrl'
                })
                .state('history', {
                    url: '/history',
                    templateUrl: 'views/history.html',
                    parent: 'main',
                    controller: 'HistoryCtrl'
                })
                .state('shoppingBasket', {
                    url: '/basket',
                    templateUrl: 'views/shoppingBasket.html',
                    parent: 'main',
                    controller: 'ShoppingBasketCtrl'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    parent: 'main',
                    controller: 'HomeCtrl'
                });

            // $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('home');
            });
        }
    ])
    .run([
        '$rootScope',
        '$state',
        '$localStorage',
        '$window',
        '$location',
        '$http',
        function($rootScope, $state, $localStorage, $window, $location, $http) {
            $rootScope.$on('$stateChangeStart', function(e, to, params, from) {
                $rootScope.currState = to.name;
                $rootScope.parentCurrState = to.parent;

                if ($rootScope.currState != 'mainProducts') {
                    $localStorage.links = null;
                    $localStorage.currCategories = null;
                }

                if ($localStorage.user && !$rootScope.user) {
                    $rootScope.user = $localStorage.user;
                }

                //TODO - should be moved to config file

                if (!$localStorage.currLang) {
                    $rootScope.lang = 'pl';
                    $localStorage.currLang = 'pl';
                } else {
                    $rootScope.lang = $localStorage.currLang;
                }

                // $rootScope.endpointURL = 'http://argo.k-org.pl';

                $http.get('conf/config.json').then(function(data) {
                    $rootScope.configData = data.data;
                });

                if (to.name != 'adminLogin' && (to.parent == 'admin' || to.name == 'admin') && !$localStorage.user) {
                    e.preventDefault();
                    $state.go('adminLogin');
                }

                if (to.name == 'main') {
                    e.preventDefault();
                    $state.go('home');
                }

                $rootScope.preloaderCounter = 0;

                $rootScope.showPreloader = function() {
                    $rootScope.preloaderCounter++;
                };

                $rootScope.hidePreloader = function() {
                    //setTimeout(function() {
                    $rootScope.preloaderCounter--;
                    //}, 500);
                };
            });
        }
    ]);
