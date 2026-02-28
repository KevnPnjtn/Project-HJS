import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback(
    (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  const add = useCallback((type, message, title, duration) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-4), { id, type, message, title, duration }]);
  }, []);

  return {
    toasts,
    remove,
    success: (msg, title) => add('success', msg, title),
    error:   (msg, title) => add('error',   msg, title, 5000),
    warning: (msg, title) => add('warning', msg, title),
    info:    (msg, title) => add('info',    msg, title),
  };
};