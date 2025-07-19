import express from 'express'
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './Data_Base/dbconnect.js';
import router from './Routes/route.js';
import messageRouter from './Routes/messageRoute.js'
import cookieParser from 'cookie-parser';
connectDB();



// middleware
app.use(express.json());
app.use(cookieParser());



// route
app.use('/user', router);
app.use('/message', messageRouter);



app.get('/', (req, res)=>{
    res.send('chat aplication ')
})

const PORT=process.env.PORT || 2000;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`);
})