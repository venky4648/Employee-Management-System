import express from 'express';
import authMiddeleware from "../middleware/authMiddleware.js";

import { addSalary ,getSalary} from '../controllers/salarycontroller.js';

const route= express.Router();
route.post("/add",authMiddeleware,addSalary)
route.get("/:id",authMiddeleware,getSalary)



export default route;

