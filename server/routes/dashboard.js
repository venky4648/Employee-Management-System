import express from 'express';
import authMiddeleware from "../middleware/authMiddleware.js";
import { getSummary } from '../controllers/dashboardcontroller.js';
const router = express.Router()

router.get('/summary',authMiddeleware,getSummary);

export default router;