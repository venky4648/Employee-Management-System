import User from "./models/User.js";
import { connectDB } from "./db/db.js";
import bcrypt from "bcrypt";

const userRegister =  async()=>{
    await connectDB();
    
    try{
        const hashpasswords = await bcrypt.hash("admin",10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password:hashpasswords,
            role: "admin"

        })
        await newUser.save()
    }
    catch(error){
        console.log(error);
    }
}

userRegister();