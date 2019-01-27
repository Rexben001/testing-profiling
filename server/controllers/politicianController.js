import db from '../models/db';

const { candidate, petition } = db;

class Politician {
    static contestInElection(req, res) {
        const { id, office, candidate, qualification } = req.body;
    }
}