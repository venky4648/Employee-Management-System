import express from 'express';
import authMiddeleware from "../middleware/authMiddleware.js";
import { addleave,getLeaves,getLeave ,getLeaveDetails,updateLeaveStatus} from '../controllers/leavecontroller.js';

const route = express.Router();
route.post("/add", authMiddeleware, addleave);
route.get("/:id",authMiddeleware,getLeaves);
route.get("/", authMiddeleware, getLeave);
route.get("/details/:id", authMiddeleware, getLeaveDetails);
route.put("/status/:id", authMiddeleware, updateLeaveStatus);


export default route;