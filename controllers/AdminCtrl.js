angular
    .module('Argo.Controllers.AdminCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('AdminCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        function($scope, $state, $timeout, $localStorage, $rootScope) {
            $(".button-collapse").sideNav();


            $scope.adminMenuItems = [{
                'labelPl': 'Strona główna',
                'activeStateRule': '',
                'ifLogged': '-1',
                'uiSref': 'main'
            }, {
                'labelPl': 'Produkty',
                'activeStateRule': 'products',
                'ifLogged': '1',
                'uiSref': 'products'
            }, {
                'labelPl': 'Kategorie',
                'activeStateRule': 'categories',
                'ifLogged': '1',
                'uiSref': 'categories'
            }, {
                'labelPl': 'Wyloguj',
                'activeStateRule': '',
                'ifLogged': '1',
                'uiSref': 'logout'
            }, {
                'labelPl': 'Zaloguj',
                'activeStateRule': 'adminLogin',
                'ifLogged': '0',
                'uiSref': 'adminLogin'
            }];

            $scope.changeState = function(state) {
                if (state && state != 'logout') {
                    $state.go(state);
                } else if (state == 'logout') {
                    $localStorage.user = null;
                    $rootScope.user = null;
                    $state.go('adminLogin');
                }
            };

            $scope.verifyUser = function(ifRequired) {
                if (ifRequired == '1') {
                    if ($rootScope.user) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (ifRequired == '0') {
                    if (!$rootScope.user) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (ifRequired == '-1') {
                    return true;
                }
            };

            $scope.preloaderCounter = 0;

            $rootScope.showPreloader = function() {
                $('.loader-wrapper').show();
                $scope.preloaderCounter++;
            }

            $rootScope.hidePreloader = function() {
                if ($scope.preloaderCounter == 1) {
                    setTimeout(function() {
                        $('.loader-wrapper').hide();
                    }, 500);
                }
                
                $scope.preloaderCounter--;
            }


        }
    ]);
