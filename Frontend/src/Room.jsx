import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeRoom from './components/HomeRoom';
import EditorPage from './components/EditorPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const Room = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoom />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </Router>
  )
}

export default Room
