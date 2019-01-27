"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CheckFields {
  static checkIfBodyIsEmpty(req, res, nect) {
    if (!party_id || !name || !hqAddress || !logoUrl) {
      req.redFlag = true;
      return res.status(400).json({
        status: 400,
        error: 'Make sure you enter the fields correctly'
      });
      next();
    }
  }

}

var _default = CheckFields;
exports.default = _default;