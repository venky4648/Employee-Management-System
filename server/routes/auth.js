import express from 'express';
import { login,verify } from '../controllers/authcontroller.js';
import authMiddeleware from "../middleware/authMiddleware.js";
const route= express.Router();

route.post("/login",login)
route.get("/verify",authMiddeleware,verify);

export default route;