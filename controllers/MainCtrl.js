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
        function($scope, $state, $timeout, $localStorage, $rootScope) {
         $(".button-collapse").sideNav();

         $scope.mainMenuItems = [
         {
            'labelPl': 'Strona główna',
            'activeStateRule': '',
            'uiSref': 'main'
         },
         {
            'labelPl': 'Produkty',
            'activeStateRule': 'mainProducts',
            'uiSref': 'mainProducts'
         },
         {
            'labelPl': 'O nas',
            'activeStateRule': '',
            'uiSref': 'history'
         },
         {
            'labelPl': 'Kontakt',
            'activeStateRule': 'contact',
            'uiSref': 'contact'
         }
         ];

         $scope.changeState = function(state){
            if(state && state != 'logout'){
                $state.go(state);
            }else if(state == 'logout'){
                $localStorage.user = null;
                $rootScope.user = null;
                $state.go('adminLogin');
            }  
         };

        
        }
    ]);
