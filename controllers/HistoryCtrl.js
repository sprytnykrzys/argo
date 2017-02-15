angular
    .module('Argo.Controllers.HistoryCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('HistoryCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        function($scope, $state, $timeout, $localStorage, $rootScope) {

             $('.materialboxed').materialbox();

         $scope.changeState = function(state){
                $state.go(state);  
         };

        
        }
    ]);
