// import { io } from "socket.io-client";

// export const initSocket = async () => {
//   return io("https://room-dj2c.onrender.com", options);
// };

import {io} from 'socket.io-client';

export const initSocket = async () =>{
    const options = {
        'force new connection': true,
        reconnectionAttempts : 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("https://room-dj2c.onrender.com", options);
}