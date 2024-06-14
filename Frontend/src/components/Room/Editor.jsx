import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../public/image/logo.jpg';
import Client from './Client';
import { initSocket } from '../../socket';
import {useNavigate,useLocation,useParams, Navigate} from 'react-router-dom'
import toast from 'react-hot-toast';
const Editor = () => {

    const socketRef=useRef(null);
    const location=useLocation();
    const {roomId}=useParams();
    const navigate=useNavigate
    useEffect(()=>{
        const init =async()=>
            {
                socketRef.current=await initSocket();
                socketRef.current.on('connect_error',(err)=>handleError(err));
                socketRef.current.on('connect_failed',(err)=>handleError(err));

                const handleError=(e)=>{
                    console.log('socket error=>',e);
                    toast.error('Socket connection failed');
                    navigate("/");
                }
                socketRef.current.emit('join',{
                    roomId,
                    username:location.state?.username,
                })
            }
            init();
    },[])
    const [clients, setClient] = useState([
        { socketId: 1, username: "Gaurav" },
        { socketId: 2, username: "Akhil" }, 
        // Changed socketId to be unique
    ]);
    if(!location.state)
        {
            return <Navigate to ="/"/>
        }
    return (
        <div className='container-fluid vh-100'>
            <div className="row h-100">
                <div className="col-md-2 bg-dark text-light d-flex flex-column h-100" style={{ boxShadow: "2px 0px 4px rgba(0,0,0,0.1)" }}>
                    <img src={logo} alt="logo" className='img-fluid mx-auto' style={{ maxWidth: '150px', marginTop: '30px' }} />
                    <hr style={{ marginTop: '25px' }} />
                    {/* client list container */}
                    <div className="d-flex flex-column overflow-auto">
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>
                    <div className="mt-auto">
                        <hr />
                        <button className='btn btn-success mb-3' style={{ marginLeft: "50px" }}>
                            Copy Room Id
                        </button>
                        <button className='btn btn-danger mb-5 px-3 btn-block' style={{ marginLeft: "50px" }}>
                            Leave Room
                        </button>
                    </div>
                </div>
                {/* editor second page */}
            </div>
        </div>
    );
}

export default Editor;
