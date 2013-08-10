/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 13-8-1
 * Time: 下午9:27
 * To change this template use File | Settings | File Templates.
 */
angular.module('LessonDemo.services', [])
    //provide lesson data
    .factory("MaterialProvider", function ($http, $q) {

        var Material = {};
        var materialMap = {};

        var getChapterMaterial = function (chapterId) {
            return {
                "lessons": [
                    {
                        "id": "lesson1"
                    },
                    {
                        "id": "lesson2"
                    }
                ]}
        }

        var getLessonMaterial = function (lessonId) {
            var deferred = $q.defer();
            var getLessonPromise = deferred.promise;

            var promise = $http.jsonp("http://127.0.0.1:3000/lesson/" + lessonId + "?callback=JSON_CALLBACK");

            promise.success(function (data) {
                Material = data;
                for (var j = 0; j < Material.activities.length; j++) {
                    //if randomize problems, shuffle all the problems in all activities
                    if ((typeof Material.activities[j].randomize_problems != "undefined") &&
                        (Material.activities[j].randomize_problems)) {
                        Material.activities[j].problems = _.shuffle(Material.activities[j].problems);
                    }
                    //if randomize choices, shuffle all the choices in all problems
                    if ((typeof Material.activities[j].randomize_choices != "undefined") &&
                        (Material.activities[j].randomize_choices)) {
                        for (var k = 0; k < Material.activities[j].problems[k].choices.length; k++) {
                            Material.activities[j].problems[k].choices = _.shuffle(Material.activities[j].problems[k].choices);
                        }
                    }
                    materialMap[Material.activities[j].id] = Material.activities[j];
                }
                materialMap[Material.id] = Material;

                deferred.resolve(Material);
            })
            promise.error(function (data, err) {
                console.log("Load Lesson Data Error: " + err);
            })

            return getLessonPromise;
        }

        //random select pool_count problems from problems pool
        var getShuffledProblems = function (activityData, seed) {
            var problemsIndex = [];
            for (var j = 0, max = activityData.problems.length; j < max; j++) {
                problemsIndex.push(j);
            }
            var problemsShuffled = [];
            for (var k = 0, len = seed.length; k < len; k++) {
                var r = parseInt(seed[k] * (len - k));
                problemsShuffled.push(activityData.problems[problemsIndex[r]]);
                problemsIndex.splice(r, 1);
            }
            return problemsShuffled;
        }

        var getActivityMaterial = function (activityId, seed) {
            var activityData = this.getMaterial(activityId);
            //check if problems should be chosen from pool
            if (typeof activityData.pool_count != "undefined") {
                //clone a new copy of the original activity material
                activityData = _.clone(this.getMaterial(activityId));
                //resume a previous activity
                if (typeof seed != "undefined") {
                    var shuffledProblems = getShuffledProblems(activityData, seed);
                    activityData.problems = shuffledProblems;
                    activityData.seed = seed;
                    //enter or review activity
                } else {
                    var newSeed = [];
                    for (var i = 0; i < activityData.pool_count; i++) {
                        newSeed.push(Math.random());
                    }
                    var shuffledProblems = getShuffledProblems(activityData, newSeed);
                    activityData.problems = shuffledProblems;
                    activityData.seed = newSeed.slice();
                }
                return activityData;
            } else {
                return activityData;
            }
        }

        //APIs
        var getMaterial = function (moduleId) {
            return materialMap[moduleId];
        }

        return {
            getLessonMaterial: getLessonMaterial,
            getChapterMaterial: getChapterMaterial,
            getActivityMaterial: getActivityMaterial,
            getMaterial: getMaterial
        }
    })

    .factory("UserdataProvider", function (MaterialProvider, $q) {
        var USERDATA = {};
        var userdataMap = {};

        var getLessonUserdata = function (lessonId) {
            var deferred = $q.defer();
            var lessonPromise = deferred.promise;

            if (typeof USERDATA[lessonId] == "undefined") {
                USERDATA[lessonId] = {
                    is_complete: false,
                    activities: {},
                    summary: {}
                };
                userdataMap[lessonId] = USERDATA[lessonId];

                var promise = MaterialProvider.getLessonMaterial(lessonId);
                promise.then(function (material) {
                    var lessonData = material;
                    for (var i = 0; i < lessonData.activities.length; i++) {
                        if (lessonData.activities[i].type === 'quiz') {
                            USERDATA[lessonId].activities[lessonData.activities[i].id] = {
                                is_complete: false,
                                problems: {},
                                summary: {}
                            };
                            if (typeof lessonData.activities[i].pool_count != "undefined") {
                                USERDATA[lessonId].activities[lessonData.activities[i].id].seed = [];
                            }
                            userdataMap[lessonData.activities[i].id] = USERDATA[lessonId].
                                activities[lessonData.activities[i].id];
                        } else {
                            USERDATA[lessonId].activities[lessonData.activities[i].id] = {
                                summary: {}
                            };
                            userdataMap[lessonData.activities[i].id] = USERDATA[lessonId].
                                activities[lessonData.activities[i].id];
                        }
                    }
                    deferred.resolve(USERDATA[lessonId]);
                })
            } else {
                deferred.resolve(USERDATA[lessonId])
            }

            return lessonPromise;
        }

        var getActivityUserdata = function (activityId) {
            var activityData = MaterialProvider.getMaterial(activityId);
            if (typeof activityData.pool_count != "undefined") {
                //enter or review activity, write chosen problems' map in the userdataMap
                if ((typeof userdataMap[activityId].seed != "undefined") && (userdataMap[activityId].seed.length == 0)) {
                    activityData = MaterialProvider.getActivityMaterial(activityId);
                    userdataMap[activityId].seed = activityData.seed;
                    for (var i = 0; i < activityData.problems.length; i++) {
                        userdataMap[activityId].problems[activityData.problems[i].id] = {
                            is_correct: false,
                            answer: []
                        };
                        userdataMap[activityData.problems[i].id] =
                            userdataMap[activityId].problems[activityData.problems[i].id];
                    }
                    return userdataMap[activityId];
                    //resume activity, userdataMap has already recorded the chosen problems
                } else {
                    return userdataMap[activityId];
                }
            } else if (activityData.type === "quiz") {
                for (var i = 0; i < activityData.problems.length; i++) {
                    userdataMap[activityId].problems[activityData.problems[i].id] = {
                        is_correct: false,
                        answer: []
                    };
                    userdataMap[activityData.problems[i].id] =
                        userdataMap[activityId].problems[activityData.problems[i].id];
                }
                return userdataMap[activityId];
                //activity is a lecture
            } else {
                return userdataMap[activityId];
            }
        }

        var getUserdata = function (moduleId) {
            return userdataMap[moduleId];
        }

        var resetUserdata = function (moduleName, moduleId) {
            if (moduleName === "lesson") {
                this.getLessonUserdata(moduleId);
            } else if (moduleName === "activity") {
                var activityData = MaterialProvider.getMaterial(moduleId);
                userdataMap[moduleId] = {
                    is_complete: true,
                    problems: {},
                    summary: {}
                };
                userdataMap[activityData.parent_id].activities[moduleId] = userdataMap[moduleId];

                for (var i = 0; i < activityData.problems.length; i++) {
                    userdataMap[moduleId].problems[activityData.problems[i].id] = {
                        is_correct: false,
                        answer: []
                    }
                    userdataMap[activityData.problems[i].id] = userdataMap[moduleId].
                        problems[activityData.problems[i].id];
                }
                return userdataMap[moduleId];
            } else {
                userdataMap[moduleId] = {
                    is_correct: false,
                    answer: []
                }
                return userdataMap[moduleId];
            }
        }

        return{
            getLessonUserdata: getLessonUserdata,
            getActivityUserdata: getActivityUserdata,
            getUserdata: getUserdata,
            resetUserdata: resetUserdata
        }

    })

    .factory("LessonService", function () {

        var emitEvent = function (eventName, scope, args) {
            scope.$emit(eventName, args);
        }

        return {
            emitEvent: emitEvent
        };
    })

    .factory("SandboxProvider", function (MaterialProvider, UserdataProvider, LessonService) {

        function Sandbox() {

            Sandbox.prototype.getChapterMaterial = function (chapterId) {
                return MaterialProvider.getChapterMaterial(chapterId);
            }

            Sandbox.prototype.getLessonMaterial = function (lessonId) {
                return MaterialProvider.getLessonMaterial(lessonId);
            }

            Sandbox.prototype.getActivityMaterial = function (activityId, seed) {
                return MaterialProvider.getActivityMaterial(activityId, seed);
            }

            Sandbox.prototype.getLessonUserdata = function (lessonId) {
                return UserdataProvider.getLessonUserdata(lessonId);
            }

            Sandbox.prototype.getActivityUserdata = function (activityId) {
                return UserdataProvider.getActivityUserdata(activityId);
            }

            Sandbox.prototype.getUserdata = function (moduleId) {
                return UserdataProvider.getUserdata(moduleId);
            }

            Sandbox.prototype.resetUserdata = function (moduleName, moduleId) {
                return UserdataProvider.resetUserdata(moduleName, moduleId);
            }

            Sandbox.prototype.sendEvent = function (eventName, scope, args) {
                LessonService.emitEvent(eventName, scope, args);
            }

            Sandbox.prototype.getLessonData = function (moduleName, parentId) {

                if (moduleName === "activity") {
                    MaterialProvider.getMaterial(parentId);
                } else if (moduleName === "module") {
                    //get the activity material first, then get the lesson material
                    var activityMaterial = MaterialProvider.getMaterial(parentId);
                    return MaterialProvider.getMaterial(activityMaterial.parent_id);
                } else {
                    return false;
                }
            }

            Sandbox.prototype.getActivityData = function (parentId) {
                return MaterialProvider.getMaterial(parentId);
            }

            Sandbox.prototype.parseJumpCondition = function (condition, correctCount, totalCount) {
                var is_percent = false;
                var targetNum = 0;

                if (condition.slice(condition.length - 1) === "%") {
                    var correctPercent = parseInt((correctCount * 100) / totalCount);
                    is_percent = true;
                }

                if (condition.slice(1, 2) === "=") {
                    if (is_percent) {
                        targetNum = condition.slice(2, condition.length - 1);
                    } else {
                        targetNum = condition.slice(2);
                    }
                    if (condition.slice(0, 1) === ">") {
                        return ((is_percent && (correctPercent >= targetNum)) ||
                            (!is_percent && (correctCount >= targetNum)));
                    } else {
                        return ((is_percent && (correctPercent <= targetNum)) ||
                            (!is_percent && (correctCount <= targetNum)));
                    }
                } else {
                    if (is_percent) {
                        targetNum = condition.slice(1, condition.length - 1);
                    } else {
                        targetNum = condition.slice(1);
                    }
                    if (condition.slice(0, 1) === ">") {
                        return ((is_percent && (correctPercent > targetNum)) ||
                            (!is_percent && (correctCount > targetNum)));
                    } else if (condition.slice(0, 1) === "<") {
                        return ((is_percent && (correctPercent < targetNum)) ||
                            (!is_percent && (correctCount < targetNum)));
                    } else {
                        return ((is_percent && (correctPercent == targetNum)) ||
                            (!is_percent && (correctCount == targetNum)));
                    }
                }
            }

            //all jump logic for a quiz activity
            Sandbox.prototype.completeQuizActivity = function (activityData, $scope, correctCount, lessonSummary) {

                if (typeof activityData.jump !== "undefined") {
                    var jump = [];
                    for (var i = 0; i < activityData.jump.length; i++) {
                        jump = activityData.jump[i].split(':');
                        if (((jump[0] === "end_of_lesson_if_correctness") &&
                            (this.parseJumpCondition(jump[1], correctCount, activityData.problems.length))) ||
                            ((jump[0] === "to_activity_if_correctness") &&
                                (this.parseJumpCondition(jump[2], correctCount, activityData.problems.length))) ||
                            (jump[0] === "force_to_activity")) {
                            break;
                        }
                    }
                    //split the third parameter and apply the jump logic
                    if (i < activityData.jump.length) {
                        if (jump[0] !== "end_of_lesson_if_correctness") {
                            if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                                ((activityData.show_summary) && ($scope.showQuizSummary))) {
                                this.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1], summary: lessonSummary, should_transition: true});
                            } else {
                                this.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1], summary: lessonSummary, should_transition: false});
                            }
                        } else {
                            if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                                ((activityData.show_summary) && ($scope.showQuizSummary))) {
                                this.sendEvent("endOfLesson", $scope, {summary: lessonSummary, should_transition: true});
                            } else {
                                this.sendEvent("endOfLesson", $scope, {summary: lessonSummary, should_transition: false});
                            }
                        }
                        //the student does not complete the jump condition
                    } else {
                        if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                            ((activityData.show_summary) && ($scope.showQuizSummary))) {
                            this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary, should_transition: true});
                        } else {
                            //send activity complete event to lesson directive without jump
                            this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary, should_transition: false});
                        }
                    }
                } else {
                    if ((typeof activityData.show_summary == "undefined") || (!activityData.show_summary) ||
                        ((activityData.show_summary) && ($scope.showQuizSummary))) {
                        this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary, should_transition: true});
                    } else {
                        //send activity complete event to lesson directive without jump
                        this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary, should_transition: false});
                    }
                }
            }

            //grader for three types of questions
            Sandbox.prototype.problemGrader = function (currProblem, userAnswer) {
                if (currProblem.type === "singlechoice") {
                    if (typeof userAnswer[currProblem.id] !== "undefined") {
                        for (var i = 0; i < currProblem.choices.length; i++) {
                            if (userAnswer[currProblem.id] === currProblem.choices[i].id) {
                                break;
                            }
                        }
                        return (currProblem.choices[i].is_correct);
                    }

                    //single filling question grader
                } else if (currProblem.type === "singlefilling") {
                    return ((typeof userAnswer[currProblem.id] !== "undefined") &&
                        (userAnswer[currProblem.id] === currProblem.correct_answer));

                    //multi-choice question grader
                } else {
                    var isCorrect = true;
                    for (var i = 0; i < currProblem.choices.length; i++) {
                        if (currProblem.choices[i].is_correct) {
                            if ((typeof userAnswer[currProblem.choices[i].id] === "undefined") ||
                                (!userAnswer[currProblem.choices[i].id])) {
                                isCorrect = false;
                                break;
                            }
                        }
                    }
                    return isCorrect;
                }
            }

        }

        var getSandbox = function () {
            return new Sandbox();
        }

        return {
            getSandbox: getSandbox
        }

    })

