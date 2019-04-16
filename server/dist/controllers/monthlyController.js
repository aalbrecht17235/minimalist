'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _Monthly = require('../models/Monthly');

var _Monthly2 = _interopRequireDefault(_Monthly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    getMonthly: function getMonthly(req, res, next) {

        _user2.default.findById({ _id: req.user._id }).populate({ path: 'monthly', options: { sort: { 'month': 1 } } }).populate('daily').then(function (data) {
            res.send(data);
        }).catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    },
    //     createMonthly: (req, res, next) => {
    // //         

    //         User.findById({_id: req.user._id})
    //         .populate({path: 'monthly', options: { sort: { 'month': 1 } } })
    //         .then(monthly => {

    //         })
    //          const {
    //             best,
    //             worst,
    //             nextWeek,
    //         } = req.body;
    //         let newDate = new Date()
    //         const monthly = new Monthly({

    //             week:  parseInt(Moment(newDate).format('w') - 1),
    //             year: parseInt(Moment(newDate).format('YYYY')),
    //             month: parseInt(Moment(newDate).format('MM')),
    //             best: best,
    //             worst: worst,
    //             nextWeek: nextWeek,
    //             user_id: req.user._id
    //                 })

    //                 monthly.save(function (err, savedMonthly) {
    //                     if (err) {
    //                         return next(err)
    //                     }
    //                 }).then(newMonthly => {
    //                     User.findByIdAndUpdate({_id:req.user._id},{ $push: {monthly: newMonthly._id}})
    //                     .then((data)=> res.sendStatus(200))
    //                     .catch(err=>console.log(err))

    //                     res.sendStatus(200);
    //                 })
    //                 .catch(next)
    //     },
    // //     

    deleteMonthly: function deleteMonthly(req, res, next) {
        var monthlyID = req.params.id;
        _user2.default.update({ _id: req.user._id }, { $pull: { monthly: { $in: [monthlyID] } } }).then(_Monthly2.default.findByIdAndRemove(monthlyID, function (err, data) {
            if (err) return res.status(500).send(err);

            res.sendStatus(200);
        })).catch(next);
    },

    updateMonthly: function updateMonthly(req, res, next) {

        var monthlyId = req.params.id;
        var newMonthly = _extends({}, req.body);

        _Monthly2.default.findByIdAndUpdate(monthlyId, newMonthly).then(function (newMonthly) {
            res.sendStatus(200);
        }).catch(next);
    }

};
//# sourceMappingURL=monthlyController.js.map