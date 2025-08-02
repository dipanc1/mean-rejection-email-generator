import { useState } from 'react';
import Navbar from './Navbar';

const NavbarContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <Navbar 
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
        />
    );
};

export default NavbarContainer;
