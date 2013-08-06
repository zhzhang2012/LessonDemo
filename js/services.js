/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 13-8-1
 * Time: 下午9:27
 * To change this template use File | Settings | File Templates.
 */
angular.module('LessonDemo.services', [])
    //provide lesson data
    .factory("MaterialProvider", function () {

        var Material = [
            {
                "id": "lesson1",
                "title": "1",
                "summary": "11111111",
                "activities": [
                    {
                        "id": "activity1",
                        "parent_id": "lesson1",
                        "title": "a1",
                        "type": "lecture",
                        "body": "aaaaaaaaaaaaaaaaaaaaaa",
                        //"jump": "force_to_activity:activity3",
                        "is_final": false
                    },
                    {
                        "id": "activity2",
                        "parent_id": "lesson1",
                        "title": "a2",
                        "type": "quiz",
                        "body": "aaaaaa",
                        "is_final": true,
                        "randomize_problems": true,
                        "randomize_choices": true,
                        "show_answer": true,
                        //"jump": "end_of_lesson_if_correctness:=3",
                        "jump": "to_activity_if_correctness:activity1:<2",
                        "problems": [
                            {
                                "id": "a2p1",
                                "parent_id": "activity2",
                                "title": "a2p1",
                                "type": "singlechoice",
                                "hint": "I don't know",
                                "explanation": "explaina2p1",
                                "choices": [
                                    {
                                        "id": "a2p1c1",
                                        "body": "2ya1",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p1c2",
                                        "body": "2ya2",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p1c3",
                                        "body": "2ya3",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p1c4",
                                        "body": "2ya4",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a2p2",
                                "parent_id": "activity2",
                                "title": "a2p2",
                                "type": "multichoice",
                                "explanation": "explaina2p2",
                                "choices": [
                                    {
                                        "id": "a2p2c1",
                                        "body": "2ya1",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p2c2",
                                        "body": "2ya2",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p2c3",
                                        "body": "2ya3",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p2c4",
                                        "body": "2ya4",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a2p3",
                                "parent_id": "activity2",
                                "title": "a2p3",
                                "type": "singlefilling",
                                "correct_answer": "iampig",
                                "explanation": "explaina2p3"
                            }
                        ]
                    },
                    {
                        "id": "activity3",
                        "parent_id": "lesson1",
                        "title": "a3",
                        "type": "quiz",
                        "body": "aaaaaa",
                        "is_final": false,
                        "redoable": false,
                        "show_summary": true,
                        "problems": [
                            {
                                "id": "a3p1",
                                "parent_id": "activity3",
                                "title": "a3p1",
                                "type": "singlechoice",
                                "choices": [
                                    {
                                        "id": "a3p1c1",
                                        "body": "2ya1",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p1c2",
                                        "body": "2ya2",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p1c3",
                                        "body": "2ya3",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a3p1c4",
                                        "body": "2ya4",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a3p2",
                                "title": "a3p2",
                                "parent_id": "activity3",
                                "type": "singlechoice",
                                "choices": [
                                    {
                                        "id": "a3p2c1",
                                        "body": "2ya1",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p2c2",
                                        "body": "2ya2",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p2c3",
                                        "body": "2ya3",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a3p2c4",
                                        "body": "2ya4",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a3p3",
                                "title": "a3p3",
                                "parent_id": "activity3",
                                "type": "singlechoice",
                                "choices": [
                                    {
                                        "id": "a3p3c1",
                                        "body": "2ya1",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p3c2",
                                        "body": "2ya2",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a3p3c3",
                                        "body": "2ya3",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a3p3c4",
                                        "body": "2ya4",
                                        "is_correct": false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        var materialMap = {};
        materialMap['lesson1'] = Material;
        for (var i = 0; i < Material.length; i++) {
            materialMap[Material[i].id] = Material[i];
            for (var j = 0; j < Material[i].activities.length; j++) {
                materialMap[Material[i].activities[j].id] = Material[i].activities[j];
            }
        }

        var getMaterial = function (moduleId) {
            return materialMap[moduleId];
        }

        return {
            getMaterial: getMaterial
        }
    })

    .factory("UserdataProvider", function (MaterialProvider) {
        var USERDATA = {};
        var userdataMap = {};

        var getLessonUserdata = function (lessonId) {
            if (typeof USERDATA[lessonId] == "undefined") {
                var lessonData = MaterialProvider.getMaterial(lessonId);

                USERDATA[lessonId] = {
                    is_complete: false,
                    activities: {},
                    summary: {}
                };
                userdataMap[lessonId] = USERDATA[lessonId];

                for (var i = 0; i < lessonData.activities.length; i++) {
                    if (lessonData.activities[i].type === 'quiz') {
                        USERDATA[lessonId].activities[lessonData.activities[i].id] = {
                            is_complete: false,
                            problems: {},
                            summary: {}
                        };
                        userdataMap[lessonData.activities[i].id] = USERDATA[lessonId].
                            activities[lessonData.activities[i].id];
                        for (var j = 0; j < lessonData.activities[i].problems.length; j++) {
                            USERDATA[lessonId].activities[lessonData.activities[i].id].
                                problems[lessonData.activities[i].problems[j].id] = {
                                is_correct: false,
                                answer: []
                            }
                            userdataMap[lessonData.activities[i].problems[j].id] =
                                USERDATA[lessonId].activities[lessonData.activities[i].id].
                                    problems[lessonData.activities[i].problems[j].id];
                        }
                    } else {
                        USERDATA[lessonId].activities[lessonData.activities[i].id] = {
                            summary: {}
                        };
                        userdataMap[lessonData.activities[i].id] = USERDATA[lessonId].
                            activities[lessonData.activities[i].id];
                    }
                }
            }
            return USERDATA[lessonId];
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

            Sandbox.prototype.getMaterial = function (moduleId) {
                return MaterialProvider.getMaterial(moduleId);
            }

            Sandbox.prototype.getLessonUserdata = function (lessonId) {
                return UserdataProvider.getLessonUserdata(lessonId);
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

            //all jump logic for a quiz activity
            Sandbox.prototype.completeQuizActivity = function (activityData, $scope, lessonSummary) {

                var parseJumpCondition = function (condition, correctCount, totalCount) {
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

                if (typeof activityData.jump !== "undefined") {
                    var jump = activityData.jump.split(':');
                    //split the third parameter and apply the jump logic
                    if (jump[0] === 'to_activity_if_correctness') {
                        if (parseJumpCondition(jump[2], lessonSummary.correctCount, activityData.problems.length)) {
                            this.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1]});
                        } else {
                            this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary});
                        }
                    } else if (jump[0] === 'force_to_activity') {
                        this.sendEvent("activityComplete_" + activityData.id, $scope, {activity: jump[1]});
                    } else {
                        if (parseJumpCondition(jump[1], lessonSummary.correctCount, activityData.problems.length)) {
                            this.sendEvent("endOfLesson", $scope, {summary: lessonSummary});
                        } else {
                            this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary});
                        }
                    }
                } else {
                    //send activity complete event to lesson directive without jump
                    this.sendEvent("activityComplete_" + activityData.id, $scope, {summary: lessonSummary});
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

