import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Auth from '../Auth';

const NavbarContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [user, setUser] = useState(null);

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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
