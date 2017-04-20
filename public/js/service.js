'use strict';

angular.module("todoListApp").service("dataService", function ($http) {

    this.getTodos = function (callback) {
        $http.get("http://localhost:3000/api/task").then(callback);
    };

    this.saveTodo = function (todo) {
        $http.post("http://localhost:3000/api/task", todo).then(
            console.log("Todo " + todo.name + " has been saved!"));
    };

    this.deleteTodo = function (todo) {
        $http.delete("http://localhost:3000/api/task/" + todo._id).then(
        console.log("Todo " + todo.name + " has been deleted!"));
    };

    this.updateTodo = function (todo) {

        $http.put("http://localhost:3000/api/task/" + todo._id, todo).then(
        console.log("Todo " + todo.name + " has been updated!"));
    };

});