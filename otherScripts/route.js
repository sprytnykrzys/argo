angular.module('Argo.Routes', [
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
                .state('categories', {
                    url: '/categories',
                    templateUrl: 'views/categories.html',
                    parent: 'admin',
                    controller: 'CategoriesCtrl'
                })
                .state('mainProducts', {
                	url: '/products',
                	templateUrl: 'views/mainProducts.html',
                	parent: 'main',
                	controller: 'MainProductsCtrl'
                })
                .state('contact', {
                	url: '/contact',
                	templateUrl: 'views/contact.html',
                	parent: 'main',
                	controller: 'ContactCtrl'
                });
            // $locationProvider.html5Mode(true);


            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("main");
            });

        }
    ])
    .run(['$rootScope', '$state', '$localStorage', '$window', '$location', '$http', function($rootScope, $state, $localStorage, $window, $location, $http) {

        $rootScope.$on('$stateChangeStart', function(e, to, params, from) {
            $rootScope.currState = to.name;
            $rootScope.parentCurrState = to.parent;

            if ($localStorage.user && !$rootScope.user) {
                $rootScope.user = $localStorage.user;
            }

            //TODO - should be moved to config file
            $rootScope.lang = 'pl';
            $rootScope.endpointURL = 'http://argo.k-org.pl';



            if (((to.name != 'adminLogin') && (to.parent == 'admin' || to.name == 'admin')) && !$localStorage.user) {
                e.preventDefault();
                $state.go("adminLogin");
            }
        });

    }]);
