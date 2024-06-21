import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PersonasPage from './pages/PersonasPage';
import ConnectPage from './pages/ConnectPage';
import GeneratePage from './pages/GeneratePage/GeneratePage';
import PostsPage from './pages/PostsPage/PostsPage';
import SettingsPage from './pages/SettingsPage';
import LogoutPage from './pages/LogoutPage';
import store from './redux/store';
import './App.css'

function App() {
  return (
      <Provider store={store}>
	  <Router>
	      <MainApp />
	  </Router>
      </Provider>
  );
}

function MainApp() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && location.pathname !== '/login' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<HomePage />} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
