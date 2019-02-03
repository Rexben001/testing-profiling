import express from 'express';
import Admin from '../controllers/adminController';


const router = express.Router();

router.get('/parties', Admin.getParties);
router.post('/parties', Admin.createParty);
router.get('/parties/:party_id', Admin.getParty);
router.patch('/parties/:party_id/name', Admin.editParty);
router.delete('/parties/:party_id', Admin.deleteParty);

router.post('/offices', Admin.createOffice);
router.get('/offices', Admin.getOffices);
router.get('/offices/:office_id', Admin.getOffice);


export default router;
