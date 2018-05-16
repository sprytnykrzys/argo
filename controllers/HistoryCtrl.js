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


            $scope.changeState = function(state) {
                $state.go(state);
            };

            $scope.historyItems = [{
                'labelPl': 'O firmie',
                'labelEn': 'About company',
                'labelRu': 'О фирмe'
            }, {
                'labelPl': 'Historia',
                'labelEn': 'History',
                'labelRu': 'История'
            }, {
                'labelPl': 'Nasza misja',
                'labelEn': 'Our mission',
                'labelRu': 'Hаша миссия'
            }];

            $scope.activeView = 'O firmie';

            $scope.changeView = function(data) {
                $scope.activeView = data.labelPl;
            }

            $scope.materialBoxed = function(){
                $('.materialboxed').materialbox();
            }


               

            

        }
    ]);
