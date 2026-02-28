import React, { useEffect } from 'react';
import {
  X, Trash2,
  CheckCircle, AlertCircle, AlertTriangle, Info
} from 'lucide-react';

export const GlobalStyles = () => (
  <style>{`
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100%) scale(0.9); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes shrinkWidth {
      from { width: 100%; }
      to   { width: 0%; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.85) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `}</style>
);

const TOAST_CONFIG = {
  success: { Icon: CheckCircle,   bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500', bar: 'bg-emerald-400' },
  error:   { Icon: AlertCircle,   bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-800',     iconColor: 'text-red-500',     bar: 'bg-red-400'     },
  warning: { Icon: AlertTriangle, bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   iconColor: 'text-amber-500',   bar: 'bg-amber-400'   },
  info:    { Icon: Info,          bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-800',    iconColor: 'text-blue-500',    bar: 'bg-blue-400'    },
};

const ToastItem = ({ toast, onRemove }) => {
  const duration = toast.duration || 3500;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  const cfg        = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
  const ToastIcon  = cfg.Icon;

  return (
    <div
      className={`relative flex items-start gap-3 w-80 p-4 rounded-xl border shadow-lg overflow-hidden ${cfg.bg} ${cfg.border}`}
      style={{ animation: 'slideInRight 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
    >
      <div
        className={`absolute bottom-0 left-0 h-0.5 rounded-full ${cfg.bar}`}
        style={{ animation: `shrinkWidth ${duration}ms linear forwards` }}
      />

      <ToastIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cfg.iconColor}`} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className={`font-semibold text-sm ${cfg.text}`}>{toast.title}</p>
        )}
        <p className={`text-sm ${cfg.text} ${toast.title ? 'opacity-80 mt-0.5' : ''}`}>
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className={`flex-shrink-0 p-0.5 rounded-lg hover:bg-black/10 transition-colors ${cfg.text}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => (
  <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
    {toasts.map((t) => (
      <div key={t.id} className="pointer-events-auto">
        <ToastItem toast={t} onRemove={onRemove} />
      </div>
    ))}
  </div>
);

const CONFIRM_COLORS = {
  red:    { bar: 'bg-gradient-to-r from-red-400 to-red-600',    iconBg: 'bg-red-100',   iconText: 'text-red-600',   btn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'      },
  blue:   { bar: 'bg-gradient-to-r from-blue-400 to-blue-600',  iconBg: 'bg-blue-100',  iconText: 'text-blue-600',  btn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'   },
  yellow: { bar: 'bg-gradient-to-r from-amber-400 to-amber-600',iconBg: 'bg-amber-100', iconText: 'text-amber-600', btn: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400' },
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText  = 'Hapus',
  confirmColor = 'red',
  icon: Icon = Trash2,   // ← fix: gunakan `Icon` bukan `ModalIcon`
}) => {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const cfg = CONFIRM_COLORS[confirmColor] || CONFIRM_COLORS.red;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl flex-shrink-0 ${cfg.iconBg}`}>
              <Icon className={`w-6 h-6 ${cfg.iconText}`} />  {}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold text-sm"
            >
              Batal
            </button>
            <button
              onClick={() => { onConfirm?.(); onClose(); }}
              className={`flex-1 px-4 py-2.5 text-white rounded-xl transition-all font-semibold text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${cfg.btn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};