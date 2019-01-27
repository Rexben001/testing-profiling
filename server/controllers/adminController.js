import db from '../models/db';

const { party, office } = db;

class Admin {
    static createParty(req, res) {
        try {
            const {
                party_id, name, hqAddress, logoUrl
            } = req.body;

            const newParty = {
                party_id, name, hqAddress, logoUrl
            };
            party.push(newParty);

            return res.status(201).json({
                status: 201,
                data: newParty
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getParties(req, res) {
        try {
            return res.status(200).json({
                status: 200,
                data: party
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
            const singleParty = party.find(p => p.party_id == id);
            if (!singleParty) {
                return res.status(404).json({
                    status: 404,
                    error: 'Unable to retrieve party'
                });
            }
            return res.status(200).json({
                status: 200,
                data: singleParty,
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
            const { name } = req.body;
            const singleParty = party.find(p => p.party_id == id);
            if (!singleParty) {
                return res.status(404).json({
                    status: 404,
                    error: 'Unable to retrieve party'
                });
            }
            singleParty.name = name;
            return res.status(200).json({
                status: 200,
                data: [{
                        id: singleParty.party_id,
                        name: singleParty.name
                    }]
            });
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
            const singleParty = party.find(p => p.party_id == id);
            if (!singleParty) {
                return res.status(404).json({
                    status: 404,
                    error: 'Unable to retrieve party'
                });
            }
            party.splice(singleParty, 1);
            return res.status(200).json({
                status: 200,
                data: [
                    {
                        message: `You have successfully deleted ${singleParty.name}`
                    }
                ]
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
            const {
                office_id, type, name, region
            } = req.body;

            const newOffice = {
                office_id, type, name, region
            };

            office.push(newOffice);
            return res.status(201).json({
                status: 201,
                data: newOffice
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }

    static getOffices(req, res) {
        try {
            return res.status(200).json({
                status: 200,
                data: office
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
            const singleOffice = office.find(o => o.office_id == id);
            if (!singleOffice) {
                return res.status(404).json({
                    status: 404,
                    error: 'Unable to retrieve party'
                });
            }
            return res.status(200).json({
                status: 200,
                data: singleOffice,
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        }
    }
}

export default Admin;
