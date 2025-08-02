import { useState } from 'react';
import Navbar from './Navbar';
import Auth from '../Auth';

const NavbarContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');

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

    return (
        <>
            <Navbar 
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
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
