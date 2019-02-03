import express from 'express';
import User from '../controllers/userController';
import Politician from '../controllers/politicianController';
import Admin from '../controllers/adminwithdb';


const router = express.Router();

router.post('/auth/signup', User.createUser);
router.post('/auth/login', User.loginUser);
router.post('/votes', User.userVote);
router.post('/auth/reset', User.resetPassword);

router.post('/office/:user_id/register', Politician.contestInElection);
router.post('/petitions', Politician.writePetition);

router.get('/parties', Admin.getParties);
router.post('/parties', Admin.createParty);
router.get('/parties/:party_id', Admin.getParty);
router.patch('/parties/:party_id/name', Admin.editParty);
router.delete('/parties/:party_id', Admin.deleteParty);

router.post('/offices', Admin.createOffice);
router.get('/offices', Admin.getOffices);
router.get('/offices/:office_id', Admin.getOffice);
router.patch('/offices/:office_id', Admin.editOffice);
router.get('/votes/:office_id', Admin.getTotalVotes);

router.get('/users', Admin.getAllUsers);
router.get('/petitions', Admin.getAllPetitions);


export default router;
