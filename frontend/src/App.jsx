import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PersonasPage from './pages/PersonasPage/PersonasPage';
import GeneratePage from './pages/GeneratePage/GeneratePage';
import ContentPage from './pages/ContentPage/ContentPage';
import LogoutPage from './pages/LogoutPage';
import { store, persistor } from './redux/store';
import './App.css';
import ResolverPage from './pages/ResolverPage';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <MainApp />
                </Router>
            </PersistGate>
        </Provider>
    );
}

function MainApp() {
    const location = useLocation();

    return (
        <div className='App'>
            {location.pathname !== '/' && location.pathname !== '/login' && <NavigationBar />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={<HomePage />} />
                <Route path='/personas' element={<PersonasPage />} />
                <Route path='/generate' element={<GeneratePage />} />
                <Route path='/content' element={<ContentPage />} />
                <Route path='/logout' element={<LogoutPage />} />
                <Route path='/resolver' element={<ResolverPage />} />
            </Routes>
        </div>
    );
}

export default App;
