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
                'labelPl': 'O nas',
                'labelEn': 'About us',
                'labelRu': 'О компании '
            }, {
                'labelPl': 'Historia',
                'labelEn': 'History',
                'labelRu': 'история'
            }, {
                'labelPl': 'O firmie',
                'labelEn': 'About company',
                'labelRu': 'сведения об организации'
            }];

            $scope.activeView = 'O nas';

            $scope.changeView = function(data) {
                $scope.activeView = data.labelPl;
            }

            $scope.materialBoxed = function(){
                $('.materialboxed').materialbox();
            }


               

            

        }
    ]);
