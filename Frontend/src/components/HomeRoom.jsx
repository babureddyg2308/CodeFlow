

import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from '../../public/ImageLogo/NEM104-logo.png'
import "../pages/pageStyles/grid.css";
function HomeRoom() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Room is created");
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };


  return (
    <div className="__login grid-bg w-full h-[calc(100vh-60px)] flex justify-center items-center flex-col gap-3 ">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto mb-4 w-20"
            />
            <h4 className="text-white text-xl mb-4">Enter the ROOM ID</h4>
            <div className="mb-4">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                placeholder="ROOM ID"
                onKeyUp={handleInputEnter}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                placeholder="USERNAME"
                onKeyUp={handleInputEnter}
              />
            </div>
            <button
              onClick={joinRoom}
              className="w-full bg-green-500 text-white py-2 rounded-lg mb-4"
            >
              JOIN
            </button>
            <p className="text-white">
              Don't have a room ID? create{" "}
              <span
                onClick={generateRoomId}
                className="text-green-500 cursor-pointer"
              >
                New Room
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRoom;

