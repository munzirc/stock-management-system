import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import analyticsController from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/overview', authenticate, analyticsController.overviewAnalytics)


export default router;