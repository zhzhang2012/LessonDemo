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
                        "title": "a1",
                        "type": "lecture",
                        "body": "aaaaaaaaaaaaaaaaaaaaaa",
                        //"jump": "force_to_activity:activity3",
                        "is_final": false
                    },
                    {
                        "id": "activity2",
                        "title": "a2",
                        "type": "quiz",
                        "body": "aaaaaa",
                        "is_final": false,
                        "randomize_problems": true,
                        "randomize_choices": true,
                        "show_answer": true,
                        "jump": "to_activity_if_correctness:activity1:<=40%",
                        "problems": [
                            {
                                "id": "a2p1",
                                "parent_id": "activity2",
                                "title": "a2p1",
                                "type": "singlechoice",
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
                        "title": "a3",
                        "type": "quiz",
                        "body": "aaaaaa",
                        "is_final": true,
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
                    "is_complete": false,
                    "activities": {}
                };
                userdataMap[lessonId] = USERDATA[lessonId];

                for (var i = 0; i < lessonData.activities.length; i++) {
                    if (lessonData.activities[i].type === 'quiz') {
                        USERDATA[lessonId].activities[lessonData.activities[i].id] = {
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

        return{
            getLessonUserdata: getLessonUserdata,
            getUserdata: getUserdata
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

        };

        var getSandbox = function () {
            return new Sandbox();
        }

        return {
            getSandbox: getSandbox
        }

    })

