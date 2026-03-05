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

export const useConfirm = () => {
  const [state, setState] = useState({
    isOpen:       false,
    title:        '',
    message:      '',
    confirmText:  'Hapus',
    confirmColor: 'red',
    icon:         null,
    resolve:      null,
  });

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setState({
        isOpen:       true,
        title:        options.title       ?? 'Konfirmasi',
        message:      options.message     ?? 'Apakah Anda yakin?',
        confirmText:  options.confirmText ?? 'Hapus',
        confirmColor: options.confirmColor ?? 'red',
        icon:         options.icon        ?? null,
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state]);

  const ConfirmModalPortal = useCallback(() => {
    if (!state.isOpen) return null;
    return {
      isOpen:       state.isOpen,
      onClose:      handleCancel,
      onConfirm:    handleConfirm,
      title:        state.title,
      message:      state.message,
      confirmText:  state.confirmText,
      confirmColor: state.confirmColor,
      icon:         state.icon,
    };
  }, [state, handleCancel, handleConfirm]);

  return { confirm, confirmProps: ConfirmModalPortal() };
};