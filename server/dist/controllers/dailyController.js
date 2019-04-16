'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _token = require('../services/token');

var _token2 = _interopRequireDefault(_token);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _Daily = require('../models/Daily');

var _Daily2 = _interopRequireDefault(_Daily);

var _Weekly = require('../models/Weekly');

var _Weekly2 = _interopRequireDefault(_Weekly);

var _Monthly = require('../models/Monthly');

var _Monthly2 = _interopRequireDefault(_Monthly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Moment = require('moment');
// import dailyController from './dailyController'


exports.default = {

    // Daily functions
    getDaily: function getDaily(req, res, next) {
        _user2.default.findById({ _id: req.user._id }).populate({ path: 'daily', options: { sort: { 'fullDate': 1 } } }).then(function (data) {

            res.send(data);
        }).catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    },
    createDaily: function createDaily(req, res, next) {
        var _req$body = req.body,
            highlights = _req$body.highlights,
            positive = _req$body.positive,
            negative = _req$body.negative,
            wakeup = _req$body.wakeup,
            sleep = _req$body.sleep,
            habit1 = _req$body.habit1,
            habit2 = _req$body.habit2,
            habit3 = _req$body.habit3,
            selectedDate = _req$body.selectedDate;


        var daily = new _Daily2.default({
            highlights: highlights,
            positive: positive,
            negative: negative,
            wakeup: wakeup,
            sleep: sleep,
            habit1: habit1,
            habit2: habit2,
            habit3: habit3,
            selectedDate: selectedDate,
            user_id: req.user._id,
            week: parseInt(Moment(selectedDate).format('w') - 1),
            year: parseInt(Moment(selectedDate).format('YYYY')),
            month: parseInt(Moment(selectedDate).format('MM')),
            fullDate: Moment(selectedDate).format('MM-DD-YYYY')

        });

        daily.save(function (err, savedDaily) {
            if (err) {
                return next(err);
            }
        }).then(function (newDaily) {
            _user2.default.findByIdAndUpdate({ _id: req.user._id }, { $push: { daily: newDaily._id } }).then(function (data) {
                _Weekly2.default.findOneAndUpdate({ user_id: req.user._id, week: newDaily.week, year: newDaily.year }, { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } }).then(function (d) {
                    var habits = [];
                    habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3);
                    if (d === null) {

                        var weekly = new _Weekly2.default({
                            weekStart: Moment(req.body.selectedDate).startOf('week').format('MM/DD'),
                            weekEnd: Moment(req.body.selectedDate).endOf('week').format('MM/DD'),
                            week: newDaily.week,
                            year: newDaily.year,
                            month: newDaily.month,
                            user_id: req.user._id,
                            habits: habits,
                            best: '',
                            worst: '',
                            nextWeek: ''

                        });

                        weekly.save(function (err, savedWeekly) {
                            if (err) {
                                return next(err);
                            }
                        }).then(function (newWeekly) {
                            _user2.default.findByIdAndUpdate({ _id: req.user._id }, { $push: { weekly: newWeekly._id } }).then().catch(function (err) {
                                return console.log(err);
                            });
                        }).catch(next);
                    }
                }).catch(function (err) {
                    return console.log(err);
                });

                // res.
                _Monthly2.default.findOneAndUpdate({ user_id: req.user._id, month: newDaily.month, year: newDaily.year }, { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } }).then(function (d) {
                    var habits = [];
                    habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3);
                    if (d == null) {
                        var monthly = new _Monthly2.default({
                            monthAt: Moment(req.body.selectedDate).format('MMMM'),
                            month: newDaily.month,
                            week: newDaily.week,
                            year: newDaily.year,
                            user_id: req.user._id,
                            habits: habits,
                            remember: '',
                            start: '',
                            stop: ''

                        });

                        monthly.save(function (err, savedMonthly) {
                            if (err) {
                                return next(err);
                            }
                        }).then(function (newMonthly) {
                            _user2.default.findByIdAndUpdate({ _id: req.user._id }, { $push: { monthly: newMonthly._id } }).then().catch(function (err) {
                                return console.log(err);
                            });
                        }).catch(next);
                    }
                }).catch(function (err) {
                    return console.log(err);
                });
            }).catch(function (err) {
                return console.log(err);
            });
            res.sendStatus(200);
        }).catch(next);
    },

    deleteDaily: function deleteDaily(req, res, next) {
        var dailyID = req.params.id;
        _user2.default.update({ _id: req.user._id }, { $pull: { daily: { $in: [dailyID] } } }).then(_Daily2.default.findByIdAndRemove(dailyID, function (err, data) {
            res.sendStatus(200);
        })).catch(next);
    },

    updateDaily: function updateDaily(req, res, next) {

        var dailyId = req.params.id;
        var newDaily = _extends({}, req.body, {
            week: parseInt(Moment(req.body.selectedDate).format('w') - 1),
            year: parseInt(Moment(req.body.selectedDate).format('YYYY'))
        });

        _Daily2.default.findByIdAndUpdate(dailyId, newDaily).then(function (newDaily) {
            _Weekly2.default.findOne({ user_id: newDaily.user_id }).then(function (data) {
                _Weekly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit1 }, { $set: { "habits.$": req.body.habit1 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
                _Weekly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit2 }, { $set: { "habits.$": req.body.habit2 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
                _Weekly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit3 }, { $set: { "habits.$": req.body.habit3 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
            }).catch(function (err) {
                return console.log('err', err);
            });
            _Monthly2.default.findOne({ user_id: newDaily.user_id }).then(function (data) {
                _Monthly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit1 }, { $set: { "habits.$": req.body.habit1 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
                _Monthly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit2 }, { $set: { "habits.$": req.body.habit2 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
                _Monthly2.default.updateOne({ _id: data._id, habits: req.body.oldValues.habit3 }, { $set: { "habits.$": req.body.habit3 } }).then().catch(function (err) {
                    return console.log('err', err);
                });
            }).catch(function (err) {
                return console.log('err', err);
            });
            res.sendStatus(200);
        }).catch(next);
    }
};
//# sourceMappingURL=dailyController.js.map