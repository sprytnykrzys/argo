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
                'labelRu': 'О компании'
            }, {
                'labelPl': 'Historia',
                'labelEn': 'History',
                'labelRu': 'история'
            }, {
                'labelPl': 'O nas',
                'labelEn': 'About us',
                'labelRu': 'adada'
            }];

            $scope.activeView;

            $scope.changeView = function(data) {
                $scope.activeView = data.labelPl;
                 $('.materialboxed').materialbox();
            }



            $('.materialboxed').materialbox();

        }
    ]);
