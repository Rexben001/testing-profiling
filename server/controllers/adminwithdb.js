import db from '../models/users';

const { pool } = db;

class AdminController {
    static createParty(req, res) {
        try {
            const {
                name, hqAddress, logoUrl
            } = req.body;

            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING *';
                const value = [name, hqAddress, logoUrl];
                client.query(query, value, (error, result) => {
                    done();
                    if (error) {
                        return res.status(500).json({ status: 500, message: `An error occured while trying to create party, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            return res.status(500).json({ staus: 500, message: 'The party could not be saved' });
                        }
                        return res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {

        }
    }


    static getParties(req, res) {
        try {
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'SELECT * FROM parties';
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get parties, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'The list of parties could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getParty(req, res) {
        try {
            const id = Number(req.params.party_id);
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = `SELECT * FROM parties WHERE party_id=${id}`;
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get a party, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'Party could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static editParty(req, res) {
        try {
            const id = Number(req.params.party_id);
            const { name, hqAddress, logoUrl } = req.body;
            try {
                pool.connect((err, client) => {
                    const query = 'UPDATE parties SET name=$1, hqAddress=$2, logoUrl=$3 WHERE party_id=$4 RETURNING *';
                    const value = [name, hqAddress, logoUrl, id];
                    client.query(query, value, (error, result) => {
                        if (error) {
                            res.status(500).json({ status: 500, message: `An error occured while trying to updating a party, ${error}` });
                        } else {
                            if (result.rowCount === 0) {
                                res.status(500).json({ staus: 500, message: 'Party could not be updated' });
                            }
                            res.status(200).json({
                                status: 200,
                                data: result.rows[0]
                            });
                        }
                    });
                });
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    error
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static deleteParty(req, res) {
        try {
            const id = Number(req.params.party_id);
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = `DELETE FROM parties WHERE party_id=${id}`;
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get a party, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'Party could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static createOffice(req, res) {
        try {
            const { type, name } = req.body;

            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'INSERT INTO offices(name, type) VALUES($1,$2) RETURNING *';
                const value = [name, type];
                client.query(query, value, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: 'An error occured while trying to create office' });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'The office could not be saved' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {

        }
    }


    static getOffices(req, res) {
        try {
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'SELECT * FROM offices';
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get offices, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'The list of offices could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }


    static getOffice(req, res) {
        try {
            const id = Number(req.params.office_id);
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = `SELECT * FROM offices WHERE office_id=${id}`;
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get a office, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'office could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static editOffice(req, res) {
        try {
            const id = Number(req.params.office_id);
            const { name, type } = req.body;
            try {
                pool.connect((err, client) => {
                    const query = 'UPDATE offices SET name=$1, type=$2 WHERE office_id=$3 RETURNING *';
                    const value = [name, type, id];
                    client.query(query, value, (error, result) => {
                        if (error) {
                            res.status(500).json({ status: 500, message: `An error occured while trying to updating a office, ${error}` });
                        } else {
                            if (result.rowCount === 0) {
                                res.status(500).json({ staus: 500, message: 'office could not be updated' });
                            }
                            res.status(200).json({
                                status: 200,
                                data: result.rows[0]
                            });
                        }
                    });
                });
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    error
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getTotalVotes(req, res) {
        try {
            const id = Number(req.params.office_id);
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = `SELECT * FROM votes WHERE office=${id}`;
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get the votes for the office, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'total votes could not be fetched' });
                        }
                        res.status(200).json({
                            status: 200,
                            data: result.rows[0]
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getAllUsers(req, res) {
        try {
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'SELECT * FROM users';
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get a user, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'User could not be fetched' });
                        }
                        console.log(result.rowCount);
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getAllPetitions(req, res) {
        try {
            pool.connect((err, client, done) => {
                if (err) throw err;
                const query = 'SELECT * FROM petitions';
                client.query(query, (error, result) => {
                    done();
                    if (error) {
                        res.status(500).json({ status: 500, message: `An error occured while trying to get a user, ${error}` });
                    } else {
                        if (result.rowCount === 0) {
                            res.status(500).json({ staus: 500, message: 'User could not be fetched' });
                        }
                        console.log(result.rowCount);
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getAllResults(req, res) {
        try {
            const id = Number(req.params.office_id);
            pool.connect((err, client, done) => {
                if (err) throw err; 
                const query = `SELECT COUNT(votes.candidate) AS result, candidates.candidate_id, candidates.office FROM votes JOIN candidates ON candidates.candidate_id =votes.candidate  WHERE votes.candidate = candidates.candidate_id GROUP BY candidates.candidate_id, candidates.createdBy, candidates.office`;
                client.query(query, (error, result) => {
                    done();
                    if (error || result.rowCount === 0) {
                        return res.status(500).json({ staus: 500, message: 'Vote could not be fetched' });
                    }
                    return res.status(200).json({
                        status: 200,
                        data: result.rows
                    });
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }
}

export default AdminController;
