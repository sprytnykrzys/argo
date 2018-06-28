angular
    .module('Argo.Services.AuthorizationSrvc', ['ngStorage'])

    .service('AuthorizationSrvc', [
        '$http',
        '$localStorage',
        '$state',
        '$rootScope',
        '$window',
        '$q',
        function($http, $localStorage, $state, $rootScope, $window, $q) {
            var user = null;

            if ($localStorage.user) {
                user = $localStorage.user;
            }

            this.loginUser = function(params) {
                var req = {
                    method: 'POST',
                    data: params,
                    url: $rootScope.configData.endPointUrl + '/login',
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                };

                var promise = $http(req);

                promise.then(function(data) {
                    user = data.data;
                    user.who = 'admin';
                    $localStorage.user = user;
                    $rootScope.user = user;
                });

                return promise;
            };
        }
    ]);
