import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/LoginPage';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
      <Router>
        <NavigationBar />
      </Router>
  );
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;