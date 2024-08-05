import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ResolverPage from './pages/ResolverPage';
import { ThemeProvider, createTheme } from '@mui/material/';
import { themeOptions } from './style';
import CustomParticles from './components/CustomParticles';

const theme = createTheme(themeOptions);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <MainApp />
                    </Router>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}

function ProtectedRoute() {
    const user = useSelector((state) => state.user.user);
    return user ? <Outlet /> : <Navigate to='/' />;
}

function MainApp() {
    const location = useLocation();

    return (
        <div className='App'>
            <CustomParticles />
            {location.pathname !== '/' && location.pathname !== '/login' && <NavigationBar />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' element={<HomePage />} />
                    <Route path='/personas' element={<PersonasPage />} />
                    <Route path='/generate' element={<GeneratePage />} />
                    <Route path='/content' element={<ContentPage />} />
                    <Route path='/logout' element={<LogoutPage />} />
                    <Route path='/resolver' element={<ResolverPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
