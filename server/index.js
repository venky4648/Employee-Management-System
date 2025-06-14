import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import { connectDB } from './db/db.js';
import departmentRouter from './routes/department.js'
import salaryRouter from './routes/salary.js';
import employeeRouter from './routes/employee.js'  
import leaveRouter from './routes/leave.js'; 
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';

connectDB()
const app=express();
app.use(express.static('public/uploads')); // Correct static path

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
// console.log("Verify API Hit");
app.use('/api/department',departmentRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/setting',settingRouter);
app.use('/api/dashboard',dashboardRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});