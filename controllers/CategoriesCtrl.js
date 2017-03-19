angular
    .module('Argo.Controllers.CategoriesCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('CategoriesCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, ContentSrvc) {

            $scope.getCategoriesFromAPI = function() {
                $scope.categories = null;
                ContentSrvc.getCategories().then(function(data) {
                    $scope.categories = data.data.categories;

                    $scope.searchByNameId = function(id) {
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].id == id) {
                                return $scope.categories[i].name.pl

                            }
                        }
                    }


                }, function(data) {
                    Materialize.toast('Wystąpił błąd', 4000);
                });
            };


            $scope.newItem = {
                name: {

                },
                description: {

                },
                id_parent: ""
            };

            $scope.getCategoriesFromAPI();

            $scope.addCategory = function() {
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newItem.image = null;
                    $scope.sendCategory($scope.newItem);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newItem.image = base64;
                        $scope.sendCategory($scope.newItem);
                    });
                }
            };

            $scope.sendCategory = function(prod) {
                ContentSrvc.updateCategory(prod).then(function(data) {
                    $scope.getCategoriesFromAPI();
                    Materialize.toast('Zapisano!', 4000);
                    $scope.newItem = {
                        name: {

                        },
                        description: {

                        },
                        id_parent: ""
                    };
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getCategoriesFromAPI();
                    }
                });
            };


            $scope.editCategory = function(p) {
                p.edit = !p.edit;
            };

            $scope.saveCategory = function(index, p) {
                ContentSrvc.updateCategory($scope.categories[index]).then(function(data) {
                    p.edit = !p.edit;
                    // $scope.getCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);
                    $scope.changeParentCategory(p)
                    
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getCategoriesFromAPI();
                    }
                });
            };

            $scope.closeEditMode = function(p) {
                p.edit = !p.edit;
                $scope.categories = angular.copy($localStorage.categories);
            };

            $scope.deleteCategory = function(p) {
                ContentSrvc.deleteCategory(p).then(function(data) {
                    $scope.getCategoriesFromAPI();
                    Materialize.toast('Usunięto!', 4000);
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getCategoriesFromAPI();
                    }
                });
            };

            $scope.selectPicture = function(index, p) {
                var selectedFile = document.getElementById('file' + p.id).files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.categories[index].image = null;
                    $scope.saveCategory(index, p);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.categories[index].image = base64;
                        $scope.saveCategory(index, p);
                    });
                }
            };


            $scope.parentCategory = {
                id: ""
            };


            $scope.changeParentCategory = function(p) {
                var parentId = $scope.parentCategory;
                ContentSrvc.changeParentCategory(p, parentId).then(function(data) {
                    $scope.getCategoriesFromAPI();
                    Materialize.toast('Zapisano!', 4000);

                    $scope.parentCategory = {
                        id: ""
                    };

                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        Materialize.toast('Zostałeś wylogowany', 4000);
                        $state.go('adminLogin');
                    } else {
                        Materialize.toast('Wystąpił błąd', 4000);
                        $scope.getCategoriesFromAPI();
                    }
                });

            };

            File.prototype.convertToBase64 = function(callback) {
                var FR = new FileReader();
                FR.onload = function(e) {
                    callback(e.target.result)
                };
                FR.readAsDataURL(this);
            }


        }
    ]);
