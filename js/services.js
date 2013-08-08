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
                "title": "走一步，再走一步",
                "keywords": ["现代文", "略读课文", "叙事"],
                "summary": "课文写的是“我”童年时一次“脱险”的经历，其中蕴含着生活的哲理。在人生道路上常常会遇到意想不到的困难，“我”的脱险对你也会有宝贵的启示。：",
                "cover_image": "悬崖.jpg",
                "objectives": ["让熊孩子们了解本文难点字词，学会熟练运用。"],
                "intended_audience": ["宝宝们"],
                "level": "easy",
                "activities": [
                    {
                        "id": "activity1",
                        "parent_id": "lesson1",
                        "title": "字词讲解第一部分",
                        "type": "lecture",
                        "redoable": true,
                        "body": "走一步，再走一步字词讲解<video src='走一步，再走一步-1.mp4'></video>",
                        "level": "easy",
                        "badges": [
                            "complete_video"
                        ]
                    },
                    {
                        "id": "activity2",
                        "parent_id": "lesson1",
                        "title": "走一步，再走一步-字词测试第一部分",
                        "type": "quiz",
                        "show_answer": true,
                        "show_summary": true,
                        "redoable": true,
                        "jump": ["to_activity_if_correctness:activity4:>60%"],
                        "level": "easy",
                        "badges": [
                            "excellent_quiz:=3",
                            "good_quiz:>=2"
                        ],
                        "problems": [
                            {
                                "id": "a2p1",
                                "parent_id": "activity2",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "雨季开始时， 我们预料有“闷热”的天气。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a2p1c1",
                                        "body": "Mēn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p1c2",
                                        "body": "Mén",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p1c3",
                                        "body": "Měn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p1c4",
                                        "body": "Mèn",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a2p2",
                                "parent_id": "activity2",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "士兵在打完子弹之后用石头把敌人击毙。",
                                "level": "normal",
                                "choices": [
                                    {
                                        "id": "a2p2c1",
                                        "body": "Dān",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p2c2",
                                        "body": "Dàn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p2c3",
                                        "body": "Tán",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p2c4",
                                        "body": "Dǎn",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a2p3",
                                "parent_id": "activity2",
                                "title": "下面哪一个句子的括号里最适合填入‘心惊肉跳’：",
                                "type": "singlechoice",
                                "body": "下面哪一个句子的括号里最适合填入‘心惊肉跳’：",
                                "level": "normal",
                                "choices": [
                                    {
                                        "id": "a2p3c1",
                                        "body": "高速公路上出了车祸，现场十分惨烈，一片()。",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p3c2",
                                        "body": "我并不害怕胆小的鳄鱼，但是饥饿的缅甸蟒蛇使我（）。",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a2p3c3",
                                        "body": "但这座城市的居民们却远非那么（）。",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a2p3c4",
                                        "body": "我们听到那间屋子里的小孩在哭的（）。",
                                        "is_correct": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "activity3",
                        "parent_id": "lesson1",
                        "title": "字词讲解第二部分",
                        "type": "lecture",
                        "redoable": true,
                        "body": "走一步，再走一步字词讲解<video src='走一步，再走一步-2.mp4'></video>",
                        "level": "easy",
                        "badges": [
                            "complete_video"
                        ]
                    },
                    {
                        "id": "activity4",
                        "parent_id": "lesson1",
                        "title": "走一步，再走一步-字词测试第二部分",
                        "type": "quiz",
                        "show_summary": true,
                        "redoable": true,
                        "jump": [
                            "to_activity_if_correctness:activity3:<50%",
                            "end_of_lesson_if_correctness:=100%",
                            "force_to_activity:activity6"
                        ],
                        "level": "easy",
                        "badges": [
                            "excellent_quiz:=3",
                            "good_quiz:>=2"
                        ],
                        "problems": [
                            {
                                "id": "a4p1",
                                "parent_id": "activity4",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "他们团结一致以应付紧急情况。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a4p1c1",
                                        "body": "Yīng",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p1c2",
                                        "body": "Yìng",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a4p1c3",
                                        "body": "Yíng",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p1c4",
                                        "body": "Yǐng",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a4p2",
                                "parent_id": "activity4",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "这场戏我们还没尽情欣赏就结束了。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a4p2c1",
                                        "body": "Jīn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p2c2",
                                        "body": "Jǐn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p2c3",
                                        "body": "Jìn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a4p2c4",
                                        "body": "Jìng",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a4p3",
                                "parent_id": "activity4",
                                "title": "下面词语解释有误的是：",
                                "type": "singlechoice",
                                "body": "下面词语解释有误的是：",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a4p3c1",
                                        "body": "悬崖：高而陡的山崖 凝视：长久的望着",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p3c2",
                                        "body": "嶙峋：形容人瘦削 灌木：灌溉树木",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a4p3c3",
                                        "body": "目眩：眼睛昏花 抽泣：抽噎，抽抽搭搭地哭",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a4p3c4",
                                        "body": "纳罕：惊奇，诧异 小心翼翼：谨慎小心，丝毫不敢疏忽的样子。",
                                        "is_correct": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "activity5",
                        "parent_id": "lesson1",
                        "title": "字词巩固讲解",
                        "type": "lecture",
                        "redoable": true,
                        "body": "走一步，再走一步字词巩固<pdf src='走一步，再走一步-1.pdf'></pdf><pdf src='走一步，再走一步-2.pdf'></pdf>",
                        "level": "normal",
                        "badges": [
                            "complete_pdf"
                        ]
                    },
                    {
                        "id": "activity6",
                        "parent_id": "lesson1",
                        "title": "走一步，再走一步-字词终测",
                        "type": "quiz",
                        "is_final": true,
                        "pool_count": 4,
                        "randomize_choices": true,
                        "randomize_problems": true,
                        "show_answer": false,
                        "show_summary": true,
                        //"redoable": false,
                        "level": "normal",
                        "badges": [
                            "excellent_quiz:=4",
                            "good_quiz:>=3"
                        ],
                        "problems": [
                            {
                                "id": "a6p1",
                                "parent_id": "activity6",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "雨季开始时， 我们预料有“闷热”的天气。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a6p1c1",
                                        "body": "Mēn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p1c2",
                                        "body": "Mén",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p1c3",
                                        "body": "Měn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p1c4",
                                        "body": "Mèn",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a6p2",
                                "parent_id": "activity6",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "士兵在打完子弹之后用石头把敌人击毙。",
                                "level": "normal",
                                "choices": [
                                    {
                                        "id": "a6p2c1",
                                        "body": "Dān",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p2c2",
                                        "body": "Dàn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p2c3",
                                        "body": "Tán",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p2c4",
                                        "body": "Dǎn",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a6p3",
                                "parent_id": "activity6",
                                "title": "下面哪一个句子的括号里最适合填入‘心惊肉跳’：",
                                "type": "singlechoice",
                                "body": "下面哪一个句子的括号里最适合填入‘心惊肉跳’：",
                                "level": "normal",
                                "choices": [
                                    {
                                        "id": "a6p3c1",
                                        "body": "高速公路上出了车祸，现场十分惨烈，一片()。",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p3c2",
                                        "body": "我并不害怕胆小的鳄鱼，但是饥饿的缅甸蟒蛇使我（）。",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p3c3",
                                        "body": "但这座城市的居民们却远非那么（）。",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p3c4",
                                        "body": "我们听到那间屋子里的小孩在哭的（）。",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a6p4",
                                "parent_id": "activity6",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "他们团结一致以应付紧急情况。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a6p4c1",
                                        "body": "Yīng",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p4c2",
                                        "body": "Yìng",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p4c3",
                                        "body": "Yíng",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p4c4",
                                        "body": "Yǐng",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a6p5",
                                "parent_id": "activity6",
                                "title": "选出下面加引号多音字的正确读音：",
                                "type": "singlechoice",
                                "body": "这场戏我们还没尽情欣赏就结束了。",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a6p5c1",
                                        "body": "Jīn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p5c2",
                                        "body": "Jǐn",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p5c3",
                                        "body": "Jìn",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p5c4",
                                        "body": "Jìng",
                                        "is_correct": false
                                    }
                                ]
                            },
                            {
                                "id": "a6p6",
                                "parent_id": "activity6",
                                "title": "下面词语解释有误的是：",
                                "type": "singlechoice",
                                "body": "下面词语解释有误的是：",
                                "level": "easy",
                                "choices": [
                                    {
                                        "id": "a6p6c1",
                                        "body": "悬崖：高而陡的山崖 凝视：长久的望着",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p6c2",
                                        "body": "嶙峋：形容人瘦削 灌木：灌溉树木",
                                        "is_correct": true
                                    },
                                    {
                                        "id": "a6p6c3",
                                        "body": "目眩：眼睛昏花 抽泣：抽噎，抽抽搭搭地哭",
                                        "is_correct": false
                                    },
                                    {
                                        "id": "a6p6c4",
                                        "body": "纳罕：惊奇，诧异 小心翼翼：谨慎小心，丝毫不敢疏忽的样子。",
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
        for (var i = 0; i < Material.length; i++) {
            for (var j = 0; j < Material[i].activities.length; j++) {
                //if randomize problems, shuffle all the problems in all activities
                if ((typeof Material[i].activities[j].randomize_problems != "undefined") &&
                    (Material[i].activities[j].randomize_problems)) {
                    Material[i].activities[j].problems = _.shuffle(Material[i].activities[j].problems);
                }
                //if randomize choices, shuffle all the choices in all problems
                if ((typeof Material[i].activities[j].randomize_choices != "undefined") &&
                    (Material[i].activities[j].randomize_choices)) {
                    for (var k = 0; k < Material[i].activities[j].problems[k].choices.length; k++) {
                        Material[i].activities[j].problems[k].choices = _.shuffle(Material[i].activities[j].problems[k].choices);
                    }
                }
                materialMap[Material[i].activities[j].id] = Material[i].activities[j];
            }
            materialMap[Material[i].id] = Material[i];
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
            getActivityMaterial: getActivityMaterial,
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
            }
            return USERDATA[lessonId];
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

            Sandbox.prototype.getLessonMaterial = function (lessonId) {
                return MaterialProvider.getMaterial(lessonId);
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

