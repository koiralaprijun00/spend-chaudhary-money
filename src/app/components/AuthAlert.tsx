'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | null;

interface AuthAlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function AuthAlert({ 
  type, 
  message, 
  onClose, 
  autoClose = true,
  duration = 3000 
}: AuthAlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose && type) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for fade-out animation
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose, type]);

  if (!type || !message) return null;

  const alertStyles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };

  const AlertIcon = type === 'success' ? CheckCircle : AlertCircle;
  
  return (
    <div 
      className={`fixed top-20 right-4 z-50 max-w-xs w-full border-l-4 p-4 shadow-md rounded transition-opacity duration-300 ${alertStyles[type]} ${visible ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
    >
      <div className="flex items-start">
        <AlertIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div className="flex-grow">{message}</div>
        <button 
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-500 hover:text-gray-700 ml-2 focus:outline-none"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 