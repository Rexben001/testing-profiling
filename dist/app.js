"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./routes/route"));

var _route2 = _interopRequireDefault(require("./routes/route2"));

var _users = _interopRequireDefault(require("./models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  users,
  contest
} = _users.default;
const app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());

const createTable = async () => {
  await users();
  await contest();
};

createTable();
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Politico Xpress'
})); // app.use('/api/v1', router);

app.use('/api/v1', _route2.default);
app.listen(process.env.PORT || 8080, () => {
  console.log('Working');
});
var _default = app;
exports.default = _default;