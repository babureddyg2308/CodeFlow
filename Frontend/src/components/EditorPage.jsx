// import React, { useEffect, useRef, useState } from "react";
// import Client from "./Client";
// import Editor from "./Editor";
// import { initSocket } from "../Socket";
// import { ACTIONS } from "../Actions";
// import {
//   useNavigate,
//   useLocation,
//   Navigate,
//   useParams,
// } from "react-router-dom";
// import { toast } from "react-hot-toast";

// function EditorPage() {
//   const [clients, setClients] = useState([]);
//   const codeRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { roomId } = useParams();

//   const socketRef = useRef(null);
//   useEffect(() => {
//     const handleErrors = (err) => {
//       console.log("Error", err);
//       toast.error("Socket connection failed, Try again later");
//       navigate("/room");
//     };

//     const init = async () => {
//       socketRef.current = await initSocket();
//       socketRef.current.on("connect_error", handleErrors);
//       socketRef.current.on("connect_failed", handleErrors);

//       socketRef.current.emit(ACTIONS.JOIN, {
//         roomId,
//         username: location.state?.username,
//       });

//       // Listen for new clients joining the chatroom
//       socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
//         // this ensures that new user connected message does not display to that user itself
//         if (username !== location.state?.username) {
//           toast.success(`${username} joined the room.`);
//         }
//         setClients(clients);
//         // also send the code to sync
//         socketRef.current.emit(ACTIONS.SYNC_CODE, {
//           code: codeRef.current,
//           socketId,
//         });
//       });

//       // listening for disconnected
//       socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//         toast.success(`${username} left the room`);
//         setClients((prev) => prev.filter((client) => client.socketId !== socketId));
//       });
//     };

//     init();

//     // cleanup
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current.off(ACTIONS.JOINED);
//         socketRef.current.off(ACTIONS.DISCONNECTED);
//       }
//     };
//   }, [location.state, navigate, roomId]);

//   if (!location.state) {
//     return <Navigate to="/room" />;
//   }

//   const copyRoomId = () => {
//     navigator.clipboard.writeText(roomId)
//       .then(() => {
//         toast.success(`Room ID is copied`);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Unable to copy the room ID");
//       });
//   };
  

//   const leaveRoom = async () => {
//     navigate("/room");
//   };

//   return (
    
//     <div style={{ width: '100%', height: '100vh'}}>
//       <div style={{ display: 'flex', height: '100%' }}>
//         {/* Client panel */}
//         <div
//           style={{
//             flex: '0 0 auto',
//             width: '16.666667%',
//             backgroundColor: '#343a40',
//             color: 'white',
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100%',
//             boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.1)',paddingLeft:'10px', paddingRight:"10px", paddingBottom:"10px"

//           }}
//         >
          
//           {/* <hr style={{ marginTop: '0rem' }} /> */}

//           {/* Client list container */}
//           <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto' }}>
//             <span style={{ marginBottom: '0.5rem', fontSize:"25px"}}>Members</span>
//             {clients.map((client) => (
//               <Client key={client.socketId} username={client.username} />
//             ))}
//           </div>

//           {/* <hr /> */}
//           {/* Buttons */}
//           <div style={{ marginTop: 'auto' }}>
//   <button
//     style={{
//       backgroundColor: '#28a745',
//       color: 'white',
//       padding: '0.5rem 1rem',
//       border: 'none',
//       borderRadius: '0.80rem',
//       cursor: 'pointer',
//       display: 'block',
//       width: '100%',
//       marginBottom: '0.5rem'
//     }}
//     onClick={copyRoomId}
//   >
//     Copy Room ID
//   </button>
//   <button
//     style={{
//       backgroundColor: '#dc3545',
//       color: 'white',
//       padding: '0.5rem 1rem',
//       border: 'none',
//       borderRadius: '0.80rem',
//       cursor: 'pointer',
//       display: 'block',
//       width: '100%'
//     }}
//     onClick={leaveRoom}
//   >
//     Leave Room
//   </button>
// </div>

//         </div>

//         {/* Editor panel */}
//         <div className="col-md-10 text-light d-flex flex-column h-100 ">
//           <Editor
//             socketRef={socketRef}
//             roomId={roomId}
//             onCodeChange={(code) => {
//               codeRef.current = code;
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditorPage;







import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Client from './Client';
import Editor from './Editor';
import { initSocket } from '../Socket';
import { ACTIONS } from '../Actions';

function EditorPage() {
  const [clients, setClients] = useState([]);
  const codeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    const handleErrors = (err) => {
      console.log('Error', err);
      toast.error('Socket connection failed, Try again later');
      navigate('/room');
    };

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', handleErrors);
      socketRef.current.on('connect_failed', handleErrors);

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [location.state, navigate, roomId]);

  if (!location.state) {
    return <Navigate to="/room" />;
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        toast.success('Room ID is copied');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Unable to copy the room ID');
      });
  };

  const leaveRoom = () => {
    navigate('/room');
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            flex: '0 0 auto',
            width: '16.666667%',
            backgroundColor: '#343a40',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.1)',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto' }}>
            <span style={{ marginBottom: '0.5rem', fontSize: '25px' }}>Members</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <button
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.80rem',
                cursor: 'pointer',
                display: 'block',
                width: '100%',
                marginBottom: '0.5rem',
              }}
              onClick={copyRoomId}
            >
              Copy Room ID
            </button>
            <button
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.80rem',
                cursor: 'pointer',
                display: 'block',
                width: '100%',
              }}
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className="col-md-10 text-light d-flex flex-column h-100">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
