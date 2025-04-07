import express from 'express';
import authController from '../controllers/auth.controller.js';
import authenticate from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/create-user', authController.createUser);

router.get("/check-auth", authenticate, (req, res) => {
    res.status(200).json({ message: "Login successful" });
});

export default router;