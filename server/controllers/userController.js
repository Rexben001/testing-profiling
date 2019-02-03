import db from '../models/users';

const { pool } = db;

class UserControllers {
  static createUser(req, res) {
    const {
      firstname, lastname, othernames, username, email, phonenumber, password, passportUrl
    } = req.body;

    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = `INSERT INTO users(firstname, lastname, othernames, username,
                email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
      const value = [firstname, lastname, othernames, username,
        email, phonenumber, password, false, passportUrl];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: 'An error occured while trying to save user' });
        } else {
          if (result.rowCount === 0) {
            res.status(500).json({ staus: 500, message: 'The user could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: [{
              token: 34567,
              user: result.rows[0]
            }]
          });
        }
      });
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'SELECT * FROM users WHERE email=$1 AND password=$2';
      const value = [email, password];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: 'An error occured while trying to fetch user' });
        } else {
          if (result.rowCount === 0) {
            res.status(500).json({ staus: 500, message: 'The user could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: [{
              token: 34567,
              user: result.rows[0]
            }]
          });
        }
      });
    });
  }

  static userVote(req, res) {
    const { office, createdBy, candidate } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'INSERT INTO votes(office, createdBy, createdOn, candidate) VALUES($1, $2, NOW(), $3) RETURNING*';
      const value = [office, createdBy, candidate];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: `An error occured while trying to save contest, ${error}` });
        } else {
          if (result.rowCount === 0) {
            res.status(500).json({ staus: 500, message: 'The contest could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: {
              "office": result.rows[0].office,
              "candidate": result.rows[0].candidate,
              "voter": result.rows[0].createdBy
            }
          });
        }
      });
    });
  }

  static resetPassword(req, res) {
    const { email } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'SELECT * FROM users WHERE email=$1';
      const value = [email];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: 'An error occured while trying to fetch user' });
        } else {
          if (result.rowCount === 0) {
            res.status(500).json({ staus: 500, message: 'The user could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: [{
              message: 'Check your email for password reset link',
              email: result.rows[0].email
            }]
          });
        }
      });
    });
  }
}

export default UserControllers;
