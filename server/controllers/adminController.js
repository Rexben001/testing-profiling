import db from '../models/db';

const { party, office } = db;

class Admin {
    static createParty(req, res) {
        const { party_id, name, hqAddress, logoUrl } = req.body;

        const newParty = {
            party_id, name, hqAddress, logoUrl
        };

        party.push(newParty);
        return res.status(201).json({
            status: 201,
            data: newParty
        });
    }

    static getParties(req, res) {
        return res.status(201).json({
            status: 201,
            data: party
        });

    }

    static getParty(req, res) {
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
    }

    static editParty(req, res) {
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
            data: [
                {
                    id: singleParty.party_id,
                    name: singleParty.name
                }
            ]
        });
    }
    static deleteParty(req, res) {
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
            data: [
                {
                    message: `You have successfully deleted ${singleParty.name}`
                }
            ]
        });
    }

    static createOffice(req, res) {

        const { office_id, type, name, region } = req.body;

        const newOffice = {
            office_id, type, name, region
        };

        office.push(newOffice);
        return res.status(201).json({
            status: 201,
            data: newOffice
        });
    }
    static getOffices(req, res) {
        return res.status(201).json({
            status: 201,
            data: office
        });

    }
    static getOffice(req, res) {
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
    }
}

export default Admin;