import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem } from '../../types';

import { triggerFileDownload } from '../../utils/pdfHelpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderId = `ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderComplete(orderId);
      setIsCheckingOut(false);
      onClearCart();

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    }, 800);
  };

  const handleDownloadInvoice = () => {
    if (!orderComplete) return;
    const invoice = `================================================
GOVERNMENT ELECTRONICS PROCUREMENT INVOICE
================================================
Order ID: ${orderComplete}
Date: ${new Date().toLocaleDateString('en-IN')}
Merchant: OmniGov & TechNode Verified Store
Customer: Arun Sharma (VLE-4091)

Payment Status: SUCCESS (Bharat e-Payment)
Subtotal: ₹${subtotal.toLocaleString('en-IN')}
GST (18%): ₹${gst.toLocaleString('en-IN')}
Shipping: ₹0.00 (Govt IT Subsidy Free)
Grand Total: ₹${total.toLocaleString('en-IN')}
================================================
All hardware covered under direct manufacturer warranty.
Cryptographic Bill Token: BIS-VALID-${Math.random().toString(36).substring(2, 10).toUpperCase()}
================================================`;

    const blob = new Blob([invoice], { type: 'text/plain' });
    triggerFileDownload(blob, `Invoice_${orderComplete}.txt`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Procurement Cart</h3>
              <p className="text-[11px] text-slate-500">Verified Genuine Hardware</p>
            </div>
          </div>
          <button
            onClick={() => {
              setOrderComplete(null);
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          
          {orderComplete ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Procurement Order Placed!</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono font-semibold text-blue-600">
                  {orderComplete}
                </p>
              </div>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your order is confirmed with BIS genuine compliance certificates and will be dispatched to your registered address.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleDownloadInvoice}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Tax Invoice</span>
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
              <div>
                <div className="text-sm font-semibold text-slate-700">Your cart is empty</div>
                <p className="text-xs text-slate-400 mt-0.5">Explore our verified electronics catalog</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.title}
                    </h4>
                    <div className="text-[11px] font-semibold text-blue-600">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer & Checkout Breakdown */}
        {cartItems.length > 0 && !orderComplete && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (18% Statutory Rate):</span>
                <span className="font-semibold text-slate-800">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Shipping & Delivery:</span>
                <span className="font-bold">FREE (Govt Subsidy)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Grand Total:</span>
                <span className="text-blue-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCheckingOut ? (
                <span>Securing Order Payment...</span>
              ) : (
                <>
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600 text-center">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Bharat BillPay & GST Enterprise Invoiced</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
