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

        $('.carousel.carousel-slider').carousel({fullWidth: true, dist: 0});

         $scope.changeState = function(state){
                $state.go(state);  
         };

        
        }
    ]);
