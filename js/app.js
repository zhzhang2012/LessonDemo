angular.module("LessonDemo", ['LessonDemo.controllers', 'LessonDemo.directives',
        'LessonDemo.services', 'LazyLoader'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'initCtrl',
                templateUrl: 'partials/subjectShow.html'
            })
            .when('/lesson/:lid', {
                controller: 'lessonCtrl',
                templateUrl: 'partials/lessonStart.html'
            })
            .when('/lesson/:lid/activity/:aid', {
                controller: 'activityCtrl',
                templateUrl: 'partials/lessonShow.html'
            })
    });








