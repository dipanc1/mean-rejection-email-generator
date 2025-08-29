import { useRef, useEffect, useState } from 'react';
import Auth from './Auth';
import { login, register } from '../../api';

const AuthContainer = ({ isOpen, onClose, mode }) => {
    const modalRef = useRef();
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setMessage({ text: '', type: '' });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        onClose();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, onClose]);

    const handleLogin = (email, password) => {
        if (!email || !password) {
            setMessage({ text: 'Email and password are required', type: 'error' });
            return;
        }

        setIsLoading(true);

        login(email, password)
            .then(response => {
                if (response.success) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    onClose();
                } else {
                    setMessage({ text: response.error, type: 'error' });
                }
            })
            .catch(error => {
                setMessage({ text: 'Login failed', type: 'error' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleRegister = (firstName, lastName, email, password) => {
        if (!firstName || !lastName || !email || !password) {
            setMessage({ text: 'All fields are required', type: 'error' });
            return;
        }

        setIsLoading(true);

        register(firstName, lastName, email, password)
            .then(response => {
                if (response?.message?.length) {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setMessage({ text: response.message, type: 'success' });
                } else {
                    setMessage({ text: response.error, type: 'error' });
                }
            })
            .catch(error => {
                setMessage({ text: 'Error during registration:', type: 'error' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (mode === 'login') {
            handleLogin(email, password);
        } else {
            handleRegister(firstName, lastName, email, password);
        }
    }

    return (
        <Auth
            isOpen={isOpen}
            handleClose={handleClose}
            mode={mode}
            modalRef={modalRef}
            onLogin={handleLogin}
            onRegister={handleRegister}
            message={message}
            onSubmit={onSubmit}
            isLoading={isLoading}
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
