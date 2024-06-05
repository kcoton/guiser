import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css'
import NavigationBar from './components/NavigationBar';

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path='/dashboard' element={<NavigationBar />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;