'use strict';

angular.module("todoListApp")
.controller("todoListCtrl", ["$scope", "dataService", function ($scope, dataService) {

        dataService.getTodos(function (response) {
                $scope.todos = response.data;
        });

        $scope.addTodo = function () {
                var todo = { "name": "New Todo Task!" };
                $scope.todos.push(todo);
        };

        $scope.saveTodo = function (todo) {
                dataService.saveTodo(todo);
        };

        $scope.deleteTodo = function ($index, todo) {
                dataService.deleteTodo(todo);
                $scope.todos.splice($index, 1);
        };

        $scope.updateTodo = function ($index, todo) {
                dataService.updateTodo(todo);
        };
}])

.controller("detailsTodoCtrl", ["$scope", "$routeParams", function ($scope, $routeParams) {
        
        $scope.task_id = $routeParams.id;

}])

.controller('uploadCtrl',['Upload','$window',function(Upload, $window){
        
        var vm = this;

        vm.submit = function () { //function to call on form submit
                if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                        vm.upload(vm.file); //call upload function
                }
        }

        vm.upload = function (file) {
                
                Upload.upload({
                        url: 'http://localhost:3000/upload_file', //webAPI exposed to upload the file
                        data: { file: file } //pass file as data, should be user ng-model
                }).then(function (resp) { //upload function returns a promise
                        if (resp.data.error_code === 0) { //validate success
                                $window.alert('Response: Success ' + resp.config.data.file.name + ' uploaded.');
                        } else {
                                $window.alert('an error occured');
                        }
                }, function (resp) { //catch error
                        console.log('Error status: ' + resp.status);
                        $window.alert('Error status: ' + resp.status);
                }, function (evt) {
                        console.log(evt);
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                });
        };

}]);