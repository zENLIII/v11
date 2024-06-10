// CustomAlert.tsx
import React, { useEffect, useState } from 'react';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error';
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const alertStyles = {
    success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    error: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400'
  };

  return (
    <div
      className={`fixed bottom-4 left-4 mb-4 ml-4 p-4 rounded-lg shadow-lg transition-transform duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'} ${alertStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">{type === 'error' ? 'Error' : 'Success'}</span>
        <div>
          <span className="font-medium">{type === 'error' ? 'Error alert!' : 'Success alert!'}</span> {message}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
