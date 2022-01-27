import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/verifyemail/:VRToken', userController.verifyEmail);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password/', userController.resetPassword);

export default router;
