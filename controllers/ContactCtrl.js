angular
    .module('Argo.Controllers.ContactCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('ContactCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, ContentSrvc) {

            $scope.contactData = {
                "from": "",
                "message": "",
                "subject": ""
            };

            $scope.send = function() {
                ContentSrvc.sendMail($scope.contactData).then(function(data) {
                    Materialize.toast('Wiadomość została wysłana', 4000);
                }, function(data) {
                    $rootScope.hidePreloader();
                    setTimeout(function() {
                        Materialize.toast('Wystąpił błąd', 4000);
                    }, 500);
                    
                });
            };

            $scope.mati
        
        }
    ]);
