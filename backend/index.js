import express from 'express'
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './Data_Base/dbconnect.js';
import router from './Routes/route.js';
import messageRouter from './Routes/messageRoute.js'
connectDB();



// middleware
app.use(express.json());



// route
app.use('/', router);
app.use('/message', messageRouter);





app.get('/', (req, res)=>{
    res.send('chat app ')
})

const PORT=process.env.PORT || 2000;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`);
})