import express from 'express'
import authenticate from '../middleware/auth.middleware.js';
import stockController from '../controllers/stock.controller.js';

const router = express.Router();

router.get('/overview', authenticate, stockController.getStockOverview);


export default router;