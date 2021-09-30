import React, { useCallback, useState, useEffect, createContext } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((toasts) => toasts.slice(1));
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    function (toast) {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toast toastList={toasts} />
    </ToastContext.Provider>
  );
}
