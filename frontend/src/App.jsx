import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PersonasPage from './pages/PersonasPage/PersonasPage';
import GeneratePage from './pages/GeneratePage/GeneratePage';
import ContentPage from './pages/ContentPage/ContentPage';
import LogoutPage from './pages/LogoutPage';
import store from './redux/store';
import './App.css'
import ResolverPage from './pages/ResolverPage';
import LinkedInAuthHandler from './pages/LinkedInAuthHandler';


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
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/resolver" element={<ResolverPage />} />
        <Route path="/linkedinauthhandler" element={<LinkedInAuthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
