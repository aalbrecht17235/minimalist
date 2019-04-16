'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _Weekly = require('../models/Weekly');

var _Weekly2 = _interopRequireDefault(_Weekly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dailyController from './dailyController'


exports.default = {

    getWeekly: function getWeekly(req, res, next) {
        _user2.default.findById({ _id: req.user._id }).populate({ path: 'weekly', options: { sort: { 'week': 1 } } }).populate('daily').then(function (data) {
            res.send(data);
        }).catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    },
    //     createWeekly: (req, res, next) => {
    // //         

    //         User.findById({_id: req.user._id})
    //         .populate({path: 'weekly', options: { sort: { 'week': 1 } } })
    //         .then(weekly => {

    //         })
    //          const {
    //             best,
    //             worst,
    //             nextWeek,
    //         } = req.body;
    //         let newDate = new Date()
    //         const weekly = new Weekly({

    //             week:  parseInt(Moment(newDate).format('w') - 1),
    //             year: parseInt(Moment(newDate).format('YYYY')),
    //             month: parseInt(Moment(newDate).format('MM')),
    //             best: best,
    //             worst: worst,
    //             nextWeek: nextWeek,
    //             user_id: req.user._id
    //                 })

    //                 weekly.save(function (err, savedWeekly) {
    //                     if (err) {
    //                         return next(err)
    //                     }
    //                 }).then(newWeekly => {
    //                     User.findByIdAndUpdate({_id:req.user._id},{ $push: {weekly: newWeekly._id}})
    //                     .then((data)=> res.sendStatus(200))
    //                     .catch(err=>console.log(err))

    //                     res.sendStatus(200);
    //                 })
    //                 .catch(next)
    //     },

    deleteWeekly: function deleteWeekly(req, res, next) {
        var weeklyID = req.params.id;
        _user2.default.update({ _id: req.user._id }, { $pull: { weekly: { $in: [weeklyID] } } }).then(_Weekly2.default.findByIdAndRemove(weeklyID, function (err, data) {
            if (err) return res.status(500).send(err);

            res.sendStatus(200);
        })).catch(next);
    },

    updateWeekly: function updateWeekly(req, res, next) {

        var weeklyId = req.params.id;
        var newWeekly = _extends({}, req.body);

        _Weekly2.default.findByIdAndUpdate(weeklyId, newWeekly, {
            new: true
        }).then(function (newWeekly) {
            res.sendStatus(200);
        }).catch(next);
    }

};
//# sourceMappingURL=weeklyController.js.map