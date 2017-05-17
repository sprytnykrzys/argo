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
                'labelPl': 'Zapytanie Ofertowe',
                'labelEn': 'Inquiry',
                'labelRu': 'запрос',
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
                $state.go(state, { id: undefined });
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

            // $scope.ifBasketEmpty = function(name) {
            //     if (name == 'Zapytanie Ofertowe') {
            //         if (!$localStorage.shoppingBasket || $localStorage.shoppingBasket.length == 0) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     } else {
            //         return false;
            //     }   
            // };


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



            (function() {

                var monster = {
                    set: function(e, t, n, r) {
                        var i = new Date,
                            s = "",
                            o = typeof t,
                            u = "";
                        r = r || "/", n && (i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3), s = "; expires=" + i.toGMTString());
                        if (o === "object" && o !== "undefined") {
                            if (!("JSON" in window)) throw "Bummer, your browser doesn't support JSON parsing.";
                            u = JSON.stringify({ v: t })
                        } else u = escape(t);
                        document.cookie = e + "=" + u + s + "; path=" + r
                    },
                    get: function(e) {
                        var t = e + "=",
                            n = document.cookie.split(";"),
                            r = "",
                            i = "",
                            s = {};
                        for (var o = 0; o < n.length; o++) {
                            var u = n[o];
                            while (u.charAt(0) == " ") u = u.substring(1, u.length);
                            if (u.indexOf(t) === 0) {
                                r = u.substring(t.length, u.length), i = r.substring(0, 1);
                                if (i == "{") {
                                    s = JSON.parse(r);
                                    if ("v" in s) return s.v
                                }
                                return r == "undefined" ? undefined : unescape(r)
                            }
                        }
                        return null
                    },
                    remove: function(e) { this.set(e, "", -1) },
                    increment: function(e, t) {
                        var n = this.get(e) || 0;
                        this.set(e, parseInt(n, 10) + 1, t)
                    },
                    decrement: function(e, t) {
                        var n = this.get(e) || 0;
                        this.set(e, parseInt(n, 10) - 1, t)
                    }
                };

                if (monster.get('cookieinfo') === 'true') {
                    return false;
                }

                var container = document.createElement('div'),
                    link = document.createElement('a');

                container.setAttribute('id', 'cookieinfo');
                container.setAttribute('class', 'cookie-alert');
                container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookies</h6><p>Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu.</p>';

                link.setAttribute('href', '#');
                link.setAttribute('title', 'Zamknij');
                link.innerHTML = 'x';

                function clickHandler(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }

                    container.setAttribute('style', 'opacity: 1');

                    var interval = window.setInterval(function() {
                        container.style.opacity -= 0.01;

                        if (container.style.opacity <= 0.02) {
                            document.body.removeChild(container);
                            window.clearInterval(interval);
                        }
                    }, 4);
                }

                if (link.addEventListener) {
                    link.addEventListener('click', clickHandler);
                } else {
                    link.attachEvent('onclick', clickHandler);
                }

                container.appendChild(link);
                document.body.appendChild(container);

                monster.set('cookieinfo', 'true', 365);

                return true;
            })();


        }
    ]);
