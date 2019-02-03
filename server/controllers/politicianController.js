import db from '../models/users';

const { pool } = db;

class Politician {
  static contestInElection(req, res) {
    const id = Number(req.params.user_id);
    const { office, party, qualification } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'INSERT INTO candidates(office, party, createdBy, qualification) VALUES($1, $2, $3, $4) RETURNING*';
      const value = [office, party, id, qualification];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: `An error occured while trying to save contest, ${error}` });
        } else {
          if (result.rowCount > 1) {
            res.status(500).json({ staus: 500, message: 'The contest could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: {
              "office": result.rows[0].office,
              "user": result.rows[0].user_id
            }
          });
        }
      });
    });
  }

  static writePetition(req, res) {
    const { createdBy, office, body, evidence } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'INSERT INTO petitions(office, createdOn, createdBy, body, evidence) VALUES($1, NOW(), $2, $3, $4) RETURNING*';
      const value = [office, createdBy, body, evidence];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          res.status(500).json({ status: 500, message: `An error occured while trying to save petition, ${error}` });
        } else {
          if (result.rowCount > 1) {
            res.status(500).json({ staus: 500, message: 'Petition could not be saved' });
          }
          res.status(200).json({
            status: 200,
            data: result.rows[0]
          });
        }
      });
    });
  }

}


export default Politician;