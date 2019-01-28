"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pool
} = _users.default;

class UserControllers {
  static createUser(req, res) {
    const {
      firstname,
      lastname,
      othernames,
      username,
      email,
      phonenumber,
      password,
      passportUrl
    } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = `INSERT INTO users(firstname, lastname, othernames, username,
                email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
      const value = [firstname, lastname, othernames, username, email, phonenumber, password, false, passportUrl];
      client.query(query, value, (error, result) => {
        done();

        if (error) {
          res.status(500).json({
            "status": 500,
            "message": "An error occured while trying to save user"
          });
        } else {
          if (result.rowCount > 1) {
            res.status(500).json({
              "staus": 500,
              "message": "The user could not be saved"
            });
          }

          res.status(200).json({
            "status": 200,
            "data": [{
              "token": 34567,
              "user": result.rows[0]
            }]
          });
        }
      });
    });
  }

  static loginUser(req, res) {
    const {
      email,
      password
    } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = `SELECT * FROM users WHERE email=${email} AND password=${password}`;
      client.query(query, (error, result) => {
        done();

        if (error) {
          res.status(500).json({
            "status": 500,
            "message": "An error occured while trying to fetch user"
          });
        } else {
          if (result.rowCount > 1) {
            res.status(500).json({
              "staus": 500,
              "message": "The user could not be saved"
            });
          }

          res.status(200).json({
            "status": 200,
            "data": [{
              "token": 34567,
              "user": result.rows[0]
            }]
          });
        }
      });
    });
  }

}

var _default = UserControllers;
exports.default = _default;