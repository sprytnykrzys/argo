angular
    .module('Argo.Controllers.MainCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('MainCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window) {
            $(".button-collapse").sideNav();

            $scope.mainMenuItems = [{
                'labelPl': 'Strona główna',
                'labelEn': 'Home',
                'labelRu': 'дома',
                'activeStateRule': 'home',
                'uiSref': 'home'
            }, {
                'labelPl': 'Produkty',
                'labelEn': 'Products',
                'labelRu': 'продукты',
                'activeStateRule': 'mainProducts',
                'uiSref': 'mainProducts'
            }, {
                'labelPl': 'O nas',
                'labelEn': 'About us',
                'labelRu': 'О компании',
                'activeStateRule': 'history',
                'uiSref': 'history'
            }, {
                'labelPl': 'Kontakt',
                'labelEn': 'Contact',
                'labelRu': 'контакт',
                'activeStateRule': 'contact',
                'uiSref': 'contact'
            }, {
                'labelPl': 'Koszyk',
                'labelEn': 'Basket',
                'labelRu': 'корзина',
                'activeStateRule': 'shoppingBasket',
                'uiSref': 'shoppingBasket'
            }];

            $scope.globalLang = [{
                'langCode': 'pl',
                'flag': 'img/pl.png',
            }, {
                'langCode': 'en',
                'flag': 'img/en.png',
            }, {
                'langCode': 'ru',
                'flag': 'img/ru.png',
            }];


            $scope.changeState = function(state) {
                $state.go(state);
            };


            $scope.selectLang = function(lang) {
                $rootScope.lang = lang;
                $localStorage.currLang = lang;
                for (var i = 0; i < $scope.globalLang.length; i++) {
                    if ($scope.globalLang[i].langCode == lang) {
                        $scope.globalLang[i].selected = true;
                    } else {
                        $scope.globalLang[i].selected = false;
                    }
                }
                $('#mainlang').removeClass('active')
            };

            $scope.scrollToTop = function() {
                $window.scrollTo(0, 0);
            };

            $scope.ifBasketEmpty = function(name) {
                console.log(name);
                if (name == 'Koszyk') {
                    if (!$localStorage.shoppingBasket || $localStorage.shoppingBasket.length == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }   
            };


            $scope.init = function() {
                if ($localStorage.currLang) {
                    for (var i = 0; i < $scope.globalLang.length; i++) {
                        if ($scope.globalLang[i].langCode == $localStorage.currLang) {
                            $scope.globalLang[i].selected = true;
                        }
                    }
                } else {
                    for (var i = 0; i < $scope.globalLang.length; i++) {
                        if ($scope.globalLang[i].langCode == 'pl') {
                            $scope.globalLang[i].selected = true;
                        }
                    }
                }
            };

            $scope.init();


            $('.carousel').carousel();

        }
    ]);
