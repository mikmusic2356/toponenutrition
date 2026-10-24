import React from 'react';
import { CartItem } from '../../types/product';
import { CheckCircle, Package, Truck, Clock, ArrowRight } from 'lucide-react';

interface OrderConfirmationModalProps {
  orderData: {
    orderId: string;
    items: CartItem[];
    customer: {
      name: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
    };
    paymentMethod: string;
    total: number;
  } | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderData,
  onClose,
}) => {
  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b]">
            Pedido Confirmado
          </div>
          <h3 className="text-2xl font-normal text-slate-900 font-gunplay uppercase tracking-wide mt-1">
            ¡Gracias por tu compra, {orderData.customer.name.split(' ')[0]}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hemos recibido tu pedido <span className="font-mono font-bold text-slate-900">{orderData.orderId}</span> y nuestro equipo ya está preparando el paquete.
          </p>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-3">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              En preparación en almacén
            </span>
            <span className="font-mono text-slate-700">24/48h estimado</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Envío a: <strong>{orderData.customer.address}, {orderData.customer.postalCode} {orderData.customer.city}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Contacto: {orderData.customer.phone}</span>
            </div>
          </div>
        </div>

        {/* Itemized summary */}
        <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50 mb-6 max-h-40 overflow-y-auto divide-y divide-slate-100 text-xs">
          {orderData.items.map((item, idx) => (
            <div key={idx} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">{item.product.name}</div>
                <div className="text-[11px] text-slate-500">
                  {item.bundle.name} x{item.quantity} · {item.selectedFlavor}
                </div>
              </div>
              <div className="font-mono font-bold text-slate-900">
                {(item.bundle.price * item.quantity).toFixed(2)}€
              </div>
            </div>
          ))}
          <div className="pt-2 flex justify-between items-center font-bold text-slate-900 text-sm">
            <span>Total Pagado:</span>
            <span className="font-mono text-base font-black text-slate-950">
              {orderData.total.toFixed(2)}€
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Seguir Explorando Productos</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
