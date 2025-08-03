import { useRef, useEffect, useState } from 'react';
import Auth from './Auth';
import { login, register } from '../../api';

const AuthContainer = ({ isOpen, onClose, mode }) => {
    const modalRef = useRef();
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    localStorage.setItem('user', JSON.stringify(response.user));
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
                    localStorage.setItem('user', JSON.stringify(response.user));
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
            handleLogin(email, password);
        } else {
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

            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />
    );
};

export default AuthContainer;
