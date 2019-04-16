'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bcrypt from 'bcrypt-nodejs';

var dailySchema = new _mongoose2.default.Schema({

  highlights: { type: String },
  positive: { type: String },
  negative: { type: String },
  wakeup: { type: String },
  sleep: { type: String },
  habit1: { type: String },
  habit2: { type: String },
  habit3: { type: String },
  selectedDate: { type: Date },
  user_id: { type: String },
  year: { type: Number },
  week: { type: Number },
  month: { type: Number },
  weekRange: { type: String },
  fullDate: { type: String }

});
// add association later

var Daily = _mongoose2.default.model('Daily', dailySchema);

module.exports = Daily;
//# sourceMappingURL=Daily.js.map