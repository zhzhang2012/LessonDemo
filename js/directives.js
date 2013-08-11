/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 13-8-1
 * Time: 下午9:26
 * To change this template use File | Settings | File Templates.
 */

angular.module('LessonDemo.directives', [])

    .directive("chapter", function (SandboxProvider, $routeParams, $filter) {

        //create the chapter sandbox
        var chapterSandbox = SandboxProvider.getSandbox();

        return {
            restrict: "E",
            link: function ($scope, $element) {
                var chapterData = chapterSandbox.getChapterMaterial($routeParams.cid);
                var chapterUserdata = chapterSandbox.getChapterUserdata();

                $scope.lessons = chapterData.lessons;
                $scope.stateMessage = function (lesson) {
                    if (chapterSandbox.shouldLoadLesson(lesson, chapterUserdata.lessons)) {
                        return "未载入";
                    } else {
                        return "尚未开启本课程";
                    }
                }
                //select lessons that have completed the requirements
                $scope.selectLessons = $filter('filter')(chapterData.lessons, function (lesson) {
                    return (chapterSandbox.shouldLoadLesson(lesson, chapterUserdata.lessons));
                });
            }
        }
    })


    //lesson module
    .directive("lesson", function (SandboxProvider, $location, $routeParams, $http, $q, $templateCache, $compile) {

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
                    $location.path('/chapter/chapter1');
                },
                onlearn: function (event, from, to, lesson_id, activity_id) {
                    $location.path('chapter/chapter1/lesson/' + lesson_id + '/activity/' + activity_id);
                }
            }
        });

        var continueLesson = function (lesson_id, activity_id) {
            $location.path('chapter/chapter1/lesson/' + lesson_id + '/activity/' + activity_id);
        }

        return {
            restrict: "E",
            link: function ($scope, $element) {
                if (typeof $scope.lesson != "undefined") {
                    var lessonMaterialPromise = lessonSandbox.getLessonMaterial($scope.lesson.id);
                    var lessonUserdataPromise = lessonSandbox.getLessonUserdata($scope.lesson.id);

                    //load the lesson template on the chapter page
                    $http.get('partials/lesson.html', {cache: $templateCache}).success(function (contents) {
                        $element.html(contents);
                        $compile($element.contents())($scope);
                    });
                } else {
                    var lessonMaterialPromise = lessonSandbox.getLessonMaterial($routeParams.lid);
                    var lessonUserdataPromise = lessonSandbox.getLessonUserdata($routeParams.lid);
                }

                //record lessonMaterial and lessonUserdata into a object
                var lessonTotalData = {};
                lessonMaterialPromise.then(function (material) {
                    lessonTotalData.material = material;
                })
                lessonUserdataPromise.then(function (userdata) {
                    lessonTotalData.userdata = userdata;
                })

                //continue logic after both lessonMaterial and lessonUserdata have been loaded
                var lessonPromise = $q.all([lessonMaterialPromise, lessonUserdataPromise]);
                lessonPromise.then(function () {
                    var lessonData = lessonTotalData.material;
                    var lessonUserdata = lessonTotalData.userdata;

                    //initialize ng-models
                    $scope.title = lessonData.title;
                    $scope.summary = lessonData.summary;
                    $scope.activities = lessonData.activities;
                    if (typeof lessonUserdata.current_activity === "undefined") {
                        $scope.buttonMsg = "开始学习";
                    } else {
                        $scope.buttonMsg = "继续学习";
                    }
                    $scope.showLessonDialogue = function () {
                        $scope.lessonDialogue = true;
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
                    $scope.enterActivity = function (id) {
                        if (typeof lessonUserdata.current_activity === "undefined") {
                            lessonUserdata.current_activity = lessonData.activities[0].id;
                            FSM.enter(id, lessonData.activities[0].id);
                        } else {
                            FSM.resume(id, lessonUserdata.current_activity);

                        }
                    }
                    $scope.reviewActivity = function (lessonId, activityId) {
                        if (typeof lessonUserdata.activities[activityId].current_problem !== "undefined") {
                            lessonUserdata.activities[activityId].current_problem = undefined;
                        }
                        lessonUserdata.current_activity = activityId;
                        FSM.resume(lessonId, activityId);
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
                        //check if the student has completed the condition to complete the lesson
                        if ((typeof lessonUserdata.summary.correctPercent == "undefined")) {
                            lessonUserdata.summary.correctPercent = 100;
                            lessonUserdata.is_complete = true;
                        } else {
                            if (typeof lessonData.pass_score != "undefined") {
                                if (lessonSandbox.parseCompleteCondition(lessonData.pass_score, lessonUserdata.summary)) {
                                    lessonUserdata.is_complete = true;
                                }
                            } else {
                                lessonUserdata.is_complete = true;
                            }
                        }

                        if (args.should_transition) {
                            //give student badges if qualified
                            if ((typeof lessonData.badges != "undefined") &&
                                (typeof lessonUserdata.summary.correctCount != "undefined")) {
                                for (var i = 0; i < lessonData.badges.length; i++) {
                                    var badge = lessonData.badges[i].split(':');
                                    if (lessonSandbox.conditionParser(badge[1], lessonUserdata.summary.correctCount,
                                        lessonUserdata.summary.correctPercent)) {
                                        lessonUserdata.summary.badges.push(badge[0]);
                                    }
                                }
                            }

                            FSM.back();
                        }
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
                                    if (args.should_transition) {
                                        continueLesson(lessonData.id, args.activity);
                                    }
                                } else {
                                    lessonUserdata.current_activity = lessonData.activities[index + 1].id;
                                    if (args.should_transition) {
                                        continueLesson(lessonData.id, lessonData.activities[index + 1].id);
                                    }
                                }
                            } else {
                                //return to the lesson page;
                                lessonUserdata.current_activity = undefined;
                                //check if the student has completed the condition to complete the lesson
                                if ((typeof lessonUserdata.summary.correctPercent == "undefined")) {
                                    lessonUserdata.summary.correctPercent = 100;
                                    lessonUserdata.is_complete = true;
                                } else {
                                    if (typeof lessonData.pass_score != "undefined") {
                                        if (lessonSandbox.parseCompleteCondition(lessonData.pass_score, lessonUserdata.summary)) {
                                            lessonUserdata.is_complete = true;
                                        }
                                    } else {
                                        lessonUserdata.is_complete = true;
                                    }
                                }
                                console.log(lessonUserdata);
                                if (args.should_transition) {
                                    //give student badges if qualified
                                    if ((typeof lessonData.badges != "undefined") &&
                                        (typeof lessonUserdata.summary.correctCount != "undefined")) {
                                        for (var i = 0; i < lessonData.badges.length; i++) {
                                            var badge = lessonData.badges[i].split(':');
                                            if (lessonSandbox.conditionParser(badge[1], lessonUserdata.summary.correctCount,
                                                lessonUserdata.summary.correctPercent)) {
                                                lessonUserdata.summary.badges.push(badge[0]);
                                            }
                                        }
                                    }

                                    FSM.back();
                                }
                            }
                        })
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
                var activityUserdata = activitySandbox.getActivityUserdata($routeParams.aid);
                var activityData = activitySandbox.getActivityMaterial($routeParams.aid, activityUserdata.seed);

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

                //check if the activity has been previously completed. If yes, reset the activityUserdata
                if ((typeof activityUserdata.is_complete != "undefined") && (activityUserdata.is_complete)) {
                    activityUserdata = activitySandbox.resetUserdata("activity", activityData.id);
                }

                if (activityData.type === "quiz") {

                    //hide the activity continue button
                    //only wait for receiving the problem complete event
                    $scope.hideContinueButton = true;

                    //iterate all the problems and add listeners
                    angular.forEach(activityData.problems, function (problem, index) {

                        //listen to the complete event sent by a problem
                        $scope.$on("problemComplete_" + problem.id, function (event, args) {
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
                                    lessonSummary.correctPercent = parseInt(correctCount * 100 / activityData.problems.length);
                                }
                            }

                            if (args.should_transition) {
                                //check if the activity has a jump attribute and has reached the final problem
                                if (index == activityData.problems.length - 1) {
                                    //check if the activity need show the quiz result
                                    if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                                        ((activityData.show_summary) && ($scope.showQuizSummary))) {

                                        activitySandbox.completeQuizActivity(activityData, $scope, correctCount, lessonSummary);

                                    } else if ((typeof activityData.show_summary != "undefined") && (activityData.show_summary)) {
                                        //tell the lesson module to update the current_activity attribute
                                        activitySandbox.completeQuizActivity(activityData, $scope, correctCount, lessonSummary);

                                        $scope.showQuizSummary = true;
                                        $scope.hideContinueButton = true;
                                        $scope.quizCorrectCount = correctCount;
                                        $scope.quizCorrectPercent = parseInt(correctCount * 100 / activityData.problems.length) + "%";
                                        $scope.nextActivity = function () {
                                            activitySandbox.completeQuizActivity(activityData, $scope, correctCount, lessonSummary);
                                        }
                                    }
                                } else {
                                    //do a page transition and show the next problem
                                    PageTransitions.nextPage(24, $("#buttonContainer"));
                                }
                            } else {
                                //if the activity both shows snawers and shows summary, apply the same logic of the
                                // summary "back" button to the last problem's back button after showing explanations
                                if (index == activityData.problems.length - 1) {
                                    activitySandbox.completeQuizActivity(activityData, $scope, correctCount, lessonSummary);
                                }
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
                                activitySandbox.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1], should_transition: true});
                            }
                        } else {
                            //send activity complete event to lesson directive
                            activitySandbox.sendEvent("activityComplete_" + activityData.id, $scope, {should_transition: true});
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
                var parentActivityData = problemSandbox.getParentActivityData(currProblem.parent_id);

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

                        //problemSandbox.sendEvent("showAnswerBeforeContinue", $scope);
                        problemSandbox.sendEvent('problemComplete_' + currProblem.id, $scope, {should_transition: false});
                    } else {
                        //send problem complete event to activity directive
                        problemSandbox.sendEvent('problemComplete_' + currProblem.id, $scope, {should_transition: true});
                    }
                }

                //continue button if show_answer=true
                $scope.continueProblem = function () {
                    //send problem complete event to activity directive
                    problemSandbox.sendEvent('problemComplete_' + currProblem.id, $scope, {should_transition: true});
                }
            }
        }
    })



