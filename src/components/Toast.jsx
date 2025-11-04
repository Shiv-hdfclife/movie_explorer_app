import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;