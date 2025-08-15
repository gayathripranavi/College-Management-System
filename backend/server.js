const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const authController=require('./controllers/authController');
//import routes
const studentRoutes=require('./routes/studentRoutes');
const authRoutes=require('./routes/authRoutes');
const courseRoutes=require('./routes/courseRoutes');
const subjectRoutes=require('./routes/subjectRoutes');
const addSubRoutes=require('./routes/addSubRoutes');
const facultyRoutes=require('./routes/facultyRoutes');
dotenv.config();
const app=express();
app.use(cors(),express.json());
app.use(express.urlencoded({ extended: true }));

//connect db
connectDB();

//define routes

//app.use('/',authController);

app.use("/student",studentRoutes);
app.use("/auth",authRoutes);
app.use("/course",courseRoutes);
app.use("/subject",subjectRoutes);
app.use("/addSubject",addSubRoutes);
app.use("/faculty",facultyRoutes);
//listen port

app.listen(process.env.PORT,()=>{
    console.log("server running on port",process.env.PORT)
})
