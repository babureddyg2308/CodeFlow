const express=require('express');
const app=express();
const http=require('http');
const {Server} =require('socket.io');
const dotenv = require('dotenv');

const server=http.createServer(app);
const io=new Server(server);

io.on('connection',(socket)=>{
    console.log(`User connected : ${socket.id}`);
    console.log('user Connected')
})
const PORT=process.env.PORT ||5000;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));