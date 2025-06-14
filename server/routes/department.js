import express from 'express';
import authMiddeleware from "../middleware/authMiddleware.js";
import {addDepartment,getDepartments,getDepartment,deleteDepartment, updateDepartment} from '../controllers/departmentcontroller.js';

const route= express.Router();
route.post("/add",authMiddeleware,addDepartment)
route.get('/all',authMiddeleware,getDepartments);
route.get('/:id',authMiddeleware,getDepartment)
route.put('/:id',authMiddeleware,updateDepartment)
route.delete('/:id',authMiddeleware,deleteDepartment)

export default route;