import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast, setIsCartOpen, setIsWishlistOpen } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-[#5C7F67]';
        let bgTag = 'bg-[#FAF3F0]';

        if (toast.type === 'cart') {
          Icon = ShoppingBag;
          iconColor = 'text-[#A46358]';
        } else if (toast.type === 'wishlist') {
          Icon = Heart;
          iconColor = 'text-[#C4877D]';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-[#786F6A]';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#EDE2D8] p-3.5 flex items-center space-x-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt=""
                className="w-11 h-11 rounded-lg object-cover bg-[#FAF0EC] shrink-0 border border-[#EBE1DA]"
              />
            ) : (
              <div className={`w-10 h-10 rounded-xl ${bgTag} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            )}

            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2D2825]">{toast.title}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-[#9E948E] hover:text-[#2D2825] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-[#786F6A] truncate mt-0.5">{toast.message}</p>

              {toast.type === 'cart' && (
                <button
                  onClick={() => {
                    removeToast(toast.id);
                    setIsCartOpen(true);
                  }}
                  className="text-[10px] font-bold text-[#A46358] hover:underline uppercase tracking-wider mt-1 block"
                >
                  View Bag &rarr;
                </button>
              )}

              {toast.type === 'wishlist' && (
                <button
                  onClick={() => {
                    removeToast(toast.id);
                    setIsWishlistOpen(true);
                  }}
                  className="text-[10px] font-bold text-[#A46358] hover:underline uppercase tracking-wider mt-1 block"
                >
                  View Saved &rarr;
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
