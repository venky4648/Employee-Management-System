import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {changePassword} from '../controllers/settingcontroller.js';
const route = express.Router();

route.put("/change-password", authMiddleware, changePassword);

export default route;