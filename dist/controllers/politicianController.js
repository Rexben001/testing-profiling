"use strict";

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  candidate,
  petition
} = _db.default;

class Politician {
  static contestInElection(req, res) {
    const {
      id,
      office,
      candidate,
      qualification
    } = req.body;
  }

}