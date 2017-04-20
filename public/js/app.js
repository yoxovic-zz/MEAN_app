'use strict';

angular.module("todoListApp", ["ngRoute","ngFileUpload"]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/tasks_page.html' })
        .when('/todo/details/:id', { templateUrl: 'partials/task_details_page.html', controller:'detailsTodoCtrl' })
        .when('/todo/register', { templateUrl: 'partials/register_page.html' })
        .when('/todo/login', { templateUrl: 'partials/login_page.html' })
        .when('/todo/upload', { templateUrl: 'partials/upload_page.html' , controller:'uploadCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
});