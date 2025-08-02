import { useRef, useEffect, useState } from 'react';
import Auth from './Auth';
import { login, register } from '../../api';

const AuthContainer = ({ isOpen, onClose, mode }) => {
    const modalRef = useRef();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleLogin = (email, password) => {
        // Call the login API with loginData
        login(email, password)
            .then(response => {
                if (response.success) {
                    // Handle successful login
                    localStorage.setItem('token', response.token);
                    onClose();
                } else {
                    // Handle login error
                    console.error('Login failed:', response.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    }

    const handleRegister = (firstName, lastName, email, password) => {
        // Call the register API with registration data
        register(firstName, lastName, email, password)
            .then(response => {
                if (response.success) {
                    // Handle successful registration
                    localStorage.setItem('token', response.token);
                    setMessage(response.message);
                    onClose();
                } else {
                    // Handle registration error
                    console.error('Registration failed:', response.message);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (mode === 'login') {
            const email = e.target.email.value;
            const password = e.target.password.value;
            handleLogin(email, password);
        } else {
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            handleRegister(firstName, lastName, email, password);
        }
    }

    return (
        <Auth
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            modalRef={modalRef}
            onLogin={handleLogin}
            onRegister={handleRegister}
            message={message}
            onSubmit={onSubmit}
        />
    );
};

export default AuthContainer;
