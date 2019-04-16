'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bcrypt from 'bcrypt-nodejs';

var weeklySchema = new _mongoose2.default.Schema({
  weekID: { type: Object },
  best: { type: String },
  worst: { type: String },
  nextWeek: { type: String },
  weekAt: { type: String },
  year: { type: Number },
  week: { type: Number },
  habits: { type: Array },
  user_id: { type: String },
  weekStart: { type: String },
  weekEnd: { type: String },
  month: { type: Number }
});
// add association later

var Weekly = _mongoose2.default.model('Weekly', weeklySchema);

module.exports = Weekly;
//# sourceMappingURL=Weekly.js.map