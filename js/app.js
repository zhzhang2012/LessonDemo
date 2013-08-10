angular.module("LessonDemo", ['LessonDemo.controllers', 'LessonDemo.directives',
        'LessonDemo.services', 'LazyLoader'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'initCtrl',
                templateUrl: 'partials/subject.html'
            })
            .when('/chapter/:cid', {
                controller: 'chapterCtrl',
                templateUrl: 'partials/chapter.html'
            })
            .when('/chapter/:cid/lesson/:lid/activity/:aid', {
                controller: 'activityCtrl',
                templateUrl: 'partials/activity.html'
            })
    });








