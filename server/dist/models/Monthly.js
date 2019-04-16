'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bcrypt from 'bcrypt-nodejs';


var monthlySchema = new _mongoose2.default.Schema({
  remember: { type: String },
  start: { type: String },
  stop: { type: String },
  monthAt: { type: String },
  user_id: { type: String },
  habits: { type: Array },
  year: { type: Number },
  month: { type: Number },
  week: { type: Number }

});
// add association later


var Monthly = _mongoose2.default.model('Monthly', monthlySchema);

module.exports = Monthly;
//# sourceMappingURL=Monthly.js.map