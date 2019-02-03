"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/auth/signup', _userController.default.createUser);
router.post('/auth/login', _userController.default.loginUser);
router.post('/office/:user_id/register', _userController.default.userContest);
var _default = router;
exports.default = _default;