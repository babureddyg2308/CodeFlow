import React, { useState } from 'react';
import logo from '../../../public/image/logo.jpg';
import Client from './Client';

const Editor = () => {
    const [clients, setClient] = useState([
        { socketId: 1, username: "Gaurav" },
        { socketId: 2, username: "Akhil" } // Changed socketId to be unique
    ]);

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
