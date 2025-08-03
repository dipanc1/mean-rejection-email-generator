import { useRef, useEffect } from 'react';
import ErrorPopup from './ErrorPopup';

const ErrorPopupContainer = ({ message, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (message) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [message, onClose]);

    return (
        <ErrorPopup 
            message={message}
            onClose={onClose}
            modalRef={modalRef}
        />
    );
};

export default ErrorPopupContainer;
