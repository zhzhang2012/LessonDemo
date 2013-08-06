/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 13-8-1
 * Time: 下午9:26
 * To change this template use File | Settings | File Templates.
 */

angular.module('LessonDemo.directives', [])

    .directive("chapter", function (SandboxProvider, LazyLoader) {

        //create the chapter sandbox
        var chapterSandbox = SandboxProvider.getSandbox();

        return {
            restrict: "E",
            link: function ($scope, $element) {
                var chapterData = chapterSandbox.getMaterial();
                var chapterUserdata = chapterSandbox.getUserdata();

            }
        }
    })


    //lesson module
    .directive("lesson", function (SandboxProvider, $location, $routeParams) {

        //create the lesson sandbox
        var lessonSandbox = SandboxProvider.getSandbox();

        //every lesson has a fsm
        var FSM = StateMachine.create({
            initial: 'welcome',
            events: [
                { name: 'enter', from: 'welcome', to: 'learn'},
                { name: 'resume', from: 'welcome', to: 'learn'},
                { name: 'complete', from: 'learn', to: 'welcome'},
                { name: 'back', from: 'learn', to: 'welcome'}
            ],

            callbacks: {
                onwelcome: function (event, from, to) {
                    $location.path('/lesson/lesson1');
                },
                onlearn: function (event, from, to, activity_id) {
                    $location.path('/lesson/lesson1/activity/' + activity_id);
                }
            }
        });

        var continueLesson = function (activity_id) {
            $location.path('/lesson/lesson1/activity/' + activity_id);
        }

        return {
            restrict: "E",
            link: function ($scope, $element) {
                var lessonData = lessonSandbox.getMaterial($routeParams.lid);
                var lessonUserdata = lessonSandbox.getLessonUserdata(lessonData.id);

                //initialize ng-models
                $scope.title = lessonData.title;
                $scope.summary = lessonData.summary;
                $scope.activities = lessonData.activities;
                if (typeof lessonUserdata.current_activity === "undefined") {
                    $scope.buttonMsg = "开始学习";
                } else {
                    $scope.buttonMsg = "继续学习";
                }

                $scope.startLesson = function () {
                    if (!lessonUserdata.is_complete) {
                        $scope.startLesson = true;
                    } else {
                        //remove activities that are not redoable
                        for (var i = 0; i < lessonData.activities.length; i++) {
                            if ((typeof lessonData.activities[i].redoable !== "undefined") &&
                                (!lessonData.activities[i].redoable)) {
                                $scope.activities.splice(i, 1);
                            }
                        }
                        $scope.reviewLesson = true;
                    }
                }
                $scope.enterActivity = function () {
                    if (typeof lessonUserdata.current_activity === "undefined") {
                        lessonUserdata.current_activity = lessonData.activities[0].id;
                        FSM.enter(lessonData.activities[0].id);
                    } else {
                        FSM.resume(lessonUserdata.current_activity);

                    }
                }
                $scope.reviewActivity = function (activityId) {
                    if (typeof lessonUserdata.activities[activityId].current_problem !== "undefined") {
                        lessonUserdata.activities[activityId].current_problem = undefined;
                    }
                    FSM.resume(activityId);
                }
                //listen to the pause activity request sent by an activity module
                $scope.$on("pauseActivity", function (event) {
                    FSM.back();
                })
                //listen to the endOfListen event to end the lesson
                $scope.$on("endOfLesson", function (event, args) {
                    if ((typeof args !== "undefined") && (typeof args.summary !== "undefined") &&
                        (typeof args.summary.correctCount !== "undefined")) {
                        lessonUserdata.summary.correctCount = args.summary.correctCount;
                        lessonUserdata.summary.correctPercent = args.summary.correctPercent;
                    }
                    //return to the lesson page;
                    lessonUserdata.current_activity = undefined;
                    lessonUserdata.is_complete = true;
                    FSM.back();
                })

                //iterate all the activities and add listeners
                angular.forEach(lessonData.activities, function (activity, index) {

                    //listen to the complete event sent by an activity module
                    $scope.$on("activityComplete_" + activity.id, function (event, args) {
                        //update summary if received args
                        if ((typeof args !== "undefined") && (typeof args.summary !== "undefined") &&
                            (typeof args.summary.correctCount !== "undefined")) {
                            lessonUserdata.summary.correctCount = args.summary.correctCount;
                            lessonUserdata.summary.correctPercent = args.summary.correctPercent;
                        }

                        //operate jump logic
                        if (index != lessonData.activities.length - 1) {
                            //check if the listener receives jump args
                            if ((typeof args !== "undefined") && (typeof args.activity !== "undefined")) {
                                lessonUserdata.current_activity = args.activity;
                                continueLesson(args.activity);
                            } else {
                                lessonUserdata.current_activity = lessonData.activities[index + 1].id;
                                continueLesson(lessonData.activities[index + 1].id);
                            }
                        } else {
                            //return to the lesson page;
                            lessonUserdata.current_activity = undefined;
                            lessonUserdata.is_complete = true;
                            console.log(lessonUserdata);
                            FSM.back();
                        }
                    })
                })
            }
        }
    })

    //review template which belongs to lesson view
    .directive("review", function () {
        return {
            restrict: "E",
            templateUrl: 'partials/_showAllActivities.html'
        };
    })


    //activity module
    .directive("activity", function (SandboxProvider, $routeParams) {

        //create the activity sandbox
        var activitySandbox = SandboxProvider.getSandbox();

        return {
            restrict: "E",
            link: function ($scope, $element) {
                var activityData = activitySandbox.getMaterial($routeParams.aid);
                var activityUserdata = activitySandbox.getUserdata(activityData.id);

                $scope.title = activityData.title;
                $scope.body = activityData.body;

                //find the previous problem which the student has entered
                if (activityData.type === 'quiz') {
                    var currProblem = 0;
                    for (var i = 0; i < activityData.problems.length; i++) {
                        if ((activityUserdata.current_problem != "undefined") &&
                            (activityUserdata.current_problem == activityData.problems[i].id)) {
                            currProblem = i;
                            break;
                        }
                    }
                    $scope.problems = activityData.problems.slice(currProblem);
                }

                $scope.pauseLearn = function () {
                    //send pause activity event to lesson directive
                    activitySandbox.sendEvent("pauseActivity", $scope);
                }

                //check if the activity has been previously entered. If yes, reset the activityUserdata
                if ((typeof activityUserdata.is_complete != "undefined") && (activityUserdata.is_complete)) {
                    activityUserdata = activitySandbox.resetUserdata("activity", activityData.id);
                    console.log(activityUserdata);
                }

                if (activityData.type === "quiz") {

                    //hide the activity continue button
                    //only wait for receiving the problem complete event
                    $scope.hideContinueButton = true;

                    //iterate all the problems and add listeners
                    angular.forEach(activityData.problems, function (problem, index) {

                        //listen to the complete event sent by a problem
                        $scope.$on("problemComplete_" + problem.id, function (event) {
                            //some userdata logic
                            if (index != activityData.problems.length - 1) {
                                activityUserdata.current_problem = activityData.problems[index + 1].id;
                            } else {
                                //destroy the current_problem attribute for later reviewing
                                activityUserdata.current_problem = undefined;
                                //set the current activity to complete so that if the student goes back to previous
                                //activity, this activity's userdata can be removed
                                activityUserdata.is_complete = true;

                                //count the correct answer and update UserdataProvider
                                var correctCount = 0;
                                for (var k = 0; k < activityData.problems.length; k++) {
                                    if (activityUserdata.problems[activityData.problems[k].id].is_correct) {
                                        correctCount++;
                                    }
                                }
                                activityUserdata.summary['correct_count'] = correctCount;
                                //if the activity is final quiz, save the userdata to lessonSummary object
                                var lessonSummary = {};
                                if ((typeof activityData.is_final !== "undefined") && (activityData.is_final)) {
                                    lessonSummary.correctCount = correctCount;
                                    lessonSummary.correctPercent = parseInt(correctCount * 100 / activityData.problems.length) + "%";
                                }
                            }

                            //check if the activity has a jump attribute and has reached the final problem
                            if (index == activityData.problems.length - 1) {
                                //check if the activity need show the quiz result
                                if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                                    ((activityData.show_summary) && ($scope.showQuizSummary))) {

                                    activitySandbox.completeQuizActivity(activityData, $scope, lessonSummary);

                                } else if ((typeof activityData.show_summary != "undefined") && (activityData.show_summary)) {
                                    $scope.showQuizSummary = true;
                                    $scope.hideContinueButton = true;
                                    $scope.quizCorrectCount = correctCount;
                                    $scope.quizCorrectPercent = parseInt(correctCount * 100 / activityData.problems.length) + "%";
                                    $scope.nextActivity = function () {
                                        activitySandbox.completeQuizActivity(activityData, $scope, lessonSummary);
                                    }
                                }
                            } else {
                                //do a page transition and show the next problem
                                PageTransitions.nextPage(24);
                            }
                        });
                    })

                    //if the activity is a lecture
                } else {
                    //show lecture
                    $scope.lecture = true;
                    //show the activity continue button
                    //and wait for this button to be clicked
                    $scope.continueActivity = function () {
                        if (typeof activityData.jump !== "undefined") {
                            var jump = activityData.jump.split(':');
                            if (jump[0] === 'force_to_activity') {
                                activitySandbox.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1]});
                            }
                        } else {
                            //send activity complete event to lesson directive
                            activitySandbox.sendEvent("activityComplete_" + activityData.id, $scope);
                        }
                    }
                }
            }
        }
    })

    //the outsider of problem directive used for getting the problem DOM collection
    .directive("switch", function ($timeout) {
        return {
            link: function ($scope, $element) {
                $timeout(function () {
                    PageTransitions.initParams($element);
                }, 0);
            }
        }
    })

    //problem module
    .directive("problem", function (SandboxProvider, $compile, $http, $templateCache) {

        //create the problem sandbox
        var problemSandbox = SandboxProvider.getSandbox();

        return {
            restrict: "E",
            link: function ($scope, $element) {
                var currProblem = $scope.problem;
                var problemUserdata = problemSandbox.getUserdata(currProblem.id);
                var parentActivityData = problemSandbox.getActivityData(currProblem.parent_id);

                //render dynamic templateUrl
                var templateUrl = 'partials/choiceTemplates/_' + currProblem.type + 'Template.html';
                $http.get(templateUrl, {cache: $templateCache}).success(function (contents) {
                    $element.html(contents);
                    $compile($element.contents())($scope);
                });

                //init ng-models
                $scope.answer = {};
                if ((typeof parentActivityData.show_answer !== "undefined") && (parentActivityData.show_answer)) {
                    $scope.explanation = currProblem.explanation;
                }
                if (typeof currProblem.hint !== "undefined") {
                    $scope.hint = currProblem.hint;
                    $scope.showHintButton = true;
                    $scope.showHint = function () {
                        $scope.showHintBox = true;
                    }
                }

                //when the student complete the problem
                $scope.submitAnswer = function () {
                    if ($scope.answer !== null) {
                        //multi-choice question grader
                        if (currProblem.type === "multichoice") {
                            problemUserdata.is_correct = problemSandbox.problemGrader(currProblem, $scope.answer);
                            for (var i = 0; i < currProblem.choices.length; i++) {
                                if ((typeof $scope.answer[currProblem.choices[i].id] !== "undefined") &&
                                    ($scope.answer[currProblem.choices[i].id])) {
                                    problemUserdata.answer.push(currProblem.choices[i].id);
                                }
                            }
                            //single choice & single filling questions grader
                        } else {
                            if (typeof $scope.answer[currProblem.id] !== "undefined") {
                                problemUserdata.is_correct = problemSandbox.problemGrader(currProblem, $scope.answer);
                                problemUserdata.answer.push($scope.answer[currProblem.id]);
                            }
                        }
                    }

                    if ((typeof parentActivityData.show_answer !== "undefined") && (parentActivityData.show_answer)) {
                        $scope.showExplanation = true;
                        $scope.hideSubmitButton = true;
                        $scope.showContinueButton = true;
                    } else {
                        //send problem complete event to activity directive
                        problemSandbox.sendEvent('problemComplete_' + currProblem.id, $scope);
                    }
                }

                //continue button if show_answer=true
                $scope.continueProblem = function () {
                    //send problem complete event to activity directive
                    problemSandbox.sendEvent('problemComplete_' + currProblem.id, $scope);
                }
            }
        }
    })



