import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Auth from '../Auth';

const NavbarContainer = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();

    const handleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            return;
        }
        setAuthMode('login');
        setShowAuth(true);
    };

    const handleRegister = () => {
        setAuthMode('register');
        setShowAuth(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.setItem('demoCount', '0');
        setAuthMode('login');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, [showAuth]);


    return (
        <>
            <Navbar
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                handleLogout={handleLogout}
                user={user}
            />
            <Auth
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                mode={authMode}
            />
        </>
    );
};

export default NavbarContainer;
