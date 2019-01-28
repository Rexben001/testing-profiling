import express from 'express';
import User from '../controllers/userController';



const router = express.Router();

router.post('/auth/signup', User.createUser);
router.post('/auth/login', User.loginUser);


export default router;
