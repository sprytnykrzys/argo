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
            'labelEn': 'Home',
            'labelRu': 'дома',
            'activeStateRule': 'main',
            'uiSref': 'main'
         },
         {
            'labelPl': 'Produkty',
            'labelEn': 'Products',
            'labelRu': 'продукты',
            'activeStateRule': 'mainProducts',
            'uiSref': 'mainProducts'
         },
         {
            'labelPl': 'O nas',
            'labelEn': 'About us',
            'labelRu': 'О компании',
            'activeStateRule': 'history',
            'uiSref': 'history'
         },
         {
            'labelPl': 'Kontakt',
            'labelEn': 'Contact',
            'labelRu': 'контакт',
            'activeStateRule': 'contact',
            'uiSref': 'contact'
         }
         ];

         $scope.globalLang = [
         {
            'langCode': 'pl',
            'flag': 'img/pl.png',
            'selected': true
         },
         {
            'langCode': 'en',
            'flag': 'img/en.png',
            'selected': false
         },
         {
            'langCode': 'ru',
            'flag': 'img/ru.png',
            'selected': false
         }
         ];


         $scope.changeState = function(state){
                $state.go(state);  
         };


        $scope.selectLang = function(lang){
            $rootScope.lang = lang;
            $localStorage.currLang = lang;
            for(var i=0; i<$scope.globalLang.length; i++){
                /*if($scope.globalLang[i].selected == true){
                    $scope.globalLang[i].selected = false;  
                }else{
                    $scope.globalLang[i].selected = true;

                }*/
                $scope.globalLang[i].selected = false;
            }
            if(lang == 'pl'){
                $scope.globalLang[0].selected = true;
            }else if(lang == 'en'){
                $scope.globalLang[1].selected = true;
            }else{
                $scope.globalLang[2].selected = true;
            }
            $('#mainlang').removeClass('active')
         };
        
        }
    ]);
