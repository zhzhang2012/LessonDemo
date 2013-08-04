/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 13-8-1
 * Time: 下午9:25
 * To change this template use File | Settings | File Templates.
 */

angular.module('LessonDemo.controllers', [])

    //chapter controller
    .controller('initCtrl', function ($scope, $q, MaterialProvider, LessonService, LazyLoader) {

        /*LazyLoader.setTask(function () {

         //XMLHttpRequest task
         var deferred = $q.defer();

         var xhr = new XMLHttpRequest();
         xhr.open('GET', 'data/lesson1.json', true);

         xhr.onprogress = function (event) {
         if (event.lengthComputable) {
         var percentage = Math.round((event.loaded / event.total) * 100);
         $scope.$emit("progress", percentage);
         }

         };

         xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
         if (xhr.status == 200) {
         $scope.$apply(deferred.resolve(xhr.responseText));
         } else {
         $scope.$apply(deferred.reject("An error occured during loading!"));
         }
         }
         };

         xhr.send();

         return deferred.promise;
         })

         LazyLoader.showProcess(true, "progress");

         LazyLoader.setLoaderUI(function (opt_process) {
         $scope.loadingMes = true;
         $scope.progress = opt_process + "%";

         })

         LazyLoader.setSuccess(function (result) {
         MaterialProvider.lessonData = JSON.parse(result);
         LessonService.TMPDATA.total_activities = MaterialProvider.lessonData.activities.length;

         for (var i = 0; i < LessonService.TMPDATA.total_activities; i++) {
         if (MaterialProvider.lessonData.activities[i].type === "lecture") {
         LessonService.USERDATA.activities[MaterialProvider.lessonData.activities[i].id] = {};
         } else {
         LessonService.USERDATA.activities[MaterialProvider.lessonData.activities[i].id] = {
         current_problem: 0,
         problems: {},
         summary: {
         correct_count: 0,
         badges: []
         }
         };
         }

         }

         LessonService.FSM.start();
         })

         LazyLoader.setError(function (reason) {
         $scope.alertBox = true;
         $scope.alert = reason;
         })

         //loaderContainer is the div that contains several divs to transit
         LazyLoader.showTransition(true, $('#loaderContainer'));

         $scope.selectLesson = function () {
         LazyLoader.startLoading($scope);
         }*/
    })

    //lesson controller
    .controller('lessonCtrl', function () {
        /*$scope.title = MaterialProvider.lessonData.title;
         $scope.summary = MaterialProvider.lessonData.summary;
         $scope.buttons = MaterialProvider.lessonData.activities;

         if (LessonService.USERDATA.current_activity === "") {
         $scope.buttonMsg = "开始学习";
         } else {
         $scope.buttonMsg = "继续学习";
         }

         //show the info dialogue
         $scope.startLesson = function () {
         if (!LessonService.USERDATA.is_complete) {
         $scope.startLesson = true;
         } else {
         $scope.reviewLesson = true;
         }
         };

         //start the first activity
         $scope.startLearn = function () {
         if (LessonService.USERDATA.current_activity === "") {
         LessonService.FSM.enter("activity1");
         } else {
         LessonService.FSM.resume(LessonService.USERDATA.current_activity);

         }
         }

         //return to certain activity after finishing all the activities
         $scope.reviewActivity = function (activity_id) {
         LessonService.TMPDATA.currActivityIndex = activity_id;
         LessonService.TMPDATA.currProblemIndex = 0;
         LessonService.FSM.resume('activity' + (parseInt(activity_id) + 1));
         }*/
    })

    //activity controller
    .controller('activityCtrl', function () {
        /*var currentAct = LessonService.TMPDATA.currActivityIndex;
         LessonService.USERDATA.current_activity = $routeParams.aid;

         //show lecture or problem switcher
         if (MaterialProvider.lessonData.activities[currentAct].type === "lecture") {
         $scope.lecture = true;
         $scope.title = MaterialProvider.lessonData.activities[currentAct].title;
         $scope.body = MaterialProvider.lessonData.activities[currentAct].body;
         } else {
         //$scope.problems = MaterialProvider.lessonData.activities[currentAct].problems;
         }

         $scope.continueLearn = function () {

         //check if the student has finished all the activities
         //if yes, return to the lesson page
         if (MaterialProvider.lessonData.activities[currentAct].is_final && PageTransitions.isFinal()) {
         LessonService.USERDATA.is_complete = true;
         LessonService.TMPDATA.currProblemIndex = 0;
         LessonService.FSM.complete();
         } else {

         //check if the student has finished the current activity
         if (MaterialProvider.lessonData.activities[currentAct].type === "lecture" || PageTransitions.isFinal()) {

         //check if the student has finished all the activities and is reviewing an activity right now
         //if yes, return to the lesson page
         if (LessonService.USERDATA.is_complete) {
         LessonService.TMPDATA.currProblemIndex = 0;
         LessonService.FSM.complete();

         //the student is not reviewing an activity now
         //turn to the next activity, update the current_activity attribute, and reset problemIndex
         } else {
         LessonService.TMPDATA.currActivityIndex++;
         LessonService.TMPDATA.currProblemIndex = 0;
         LessonService.USERDATA.current_activity = MaterialProvider.lessonData.
         activities[LessonService.TMPDATA.currActivityIndex].id;
         LessonService.continueLesson(LessonService.USERDATA.current_activity);
         }

         //the student stays in the middle of a quiz activity
         //update current_problem attribute and use a page transition
         } else {
         LessonService.TMPDATA.currProblemIndex++;
         LessonService.USERDATA.activities[LessonService.USERDATA.current_activity].current_problem =
         MaterialProvider.lessonData.activities[LessonService.TMPDATA.currActivityIndex].
         problems[LessonService.TMPDATA.currProblemIndex].id;

         PageTransitions.nextPage(24, $("#buttonContainer"));
         }
         }
         }

         //return to the lesson page when doing an activity
         $scope.pauseLearn = function () {
         LessonService.FSM.back();
         }*/

    });