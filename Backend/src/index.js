const express=require('express');
const app=express();
const http=require('http');
const {Server} =require('socket.io');
const dotenv = require('dotenv');

const server=http.createServer(app);
const io=new Server(server);

const userSocketMap={};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
      (socketId) => {
        return {
          socketId,
          username: userSocketMap[socketId],
        };
      }
    );
  };

io.on('connection',(socket)=>{
    // console.log(`User connected : ${socket.id}`);

    socket.on('join',({roomId,username})=>{
        userSocketMap[socket.id]=username;
        socket.join(roomId);
        const clients=getAllConnectedClients(roomId);
        console.log(clients);
    });
    
})
const PORT=process.env.PORT ||5000;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));