import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongTable from './pages/SongTable';
import HomePage  from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/SongTable" Component={SongTable} />
      <Route  path="/" Component={HomePage} />
        <Route path="/statistics" Component={HomePage} />
      </Routes>
        
    </Router>
  );
}

export default App;