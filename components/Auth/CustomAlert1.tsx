import React, { useEffect } from 'react';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-5 p-4 bg-red-500 text-white rounded shadow-lg transition-transform transform-gpu animate-slide-in-bottom-left">
      {message}
    </div>
  );
};

export default CustomAlert;
