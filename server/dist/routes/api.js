'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _dailyController = require('../controllers/dailyController');

var _dailyController2 = _interopRequireDefault(_dailyController);

var _weeklyController = require('../controllers/weeklyController');

var _weeklyController2 = _interopRequireDefault(_weeklyController);

var _monthlyController = require('../controllers/monthlyController');

var _monthlyController2 = _interopRequireDefault(_monthlyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
    res.send('connected');
});

router.get('/userProfile', function (req, res) {
    res.send(req.user);
});

router.post('/userProfile', _authentication2.default.updateProfile);

router.get('/daily', _dailyController2.default.getDaily);
router.post('/daily/new', _dailyController2.default.createDaily);
router.delete('/daily/:id', _dailyController2.default.deleteDaily);
router.put('/daily/:id', _dailyController2.default.updateDaily);

router.get('/weekly', _weeklyController2.default.getWeekly);
// router.post('/weekly/new', weeklyController.createWeekly)
router.put('/weekly/:id', _weeklyController2.default.updateWeekly);
router.delete('/weekly/:id', _weeklyController2.default.deleteWeekly);

router.get('/monthly', _monthlyController2.default.getMonthly);
// router.post('/monthly/new', monthlyController.createMonthly)
router.put('/monthly/:id', _monthlyController2.default.updateMonthly);
router.delete('/monthly/:id', _monthlyController2.default.deleteMonthly);

exports.default = router;
//# sourceMappingURL=api.js.map