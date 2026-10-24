import React, { useState } from 'react';
import { CartItem, CustomerOrder } from '../../types/product';
import { SupplementVisual } from '../common/SupplementVisual';
import {
  X, Trash2, Plus, Minus, ShieldCheck, Truck, Check, Smartphone,
  CreditCard, Package, ArrowRight, MessageCircle, FileText
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onCompleteOrder: (order: CustomerOrder) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'epayco' | 'cod' | 'card' | 'bizum' | 'whatsapp'>('cod');

  // Customer form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.bundle.price * item.quantity, 0);
  const freeShippingThreshold = 39.0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.90;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      alert('Por favor completa todos los campos requeridos para la entrega.');
      return;
    }

    const orderId = `TOP1-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: CustomerOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'en_preparacion',
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        notes: notes.trim() || undefined,
      },
      items: [...cartItems],
      subtotal,
      shippingCost,
      total,
      paymentMethod,
    };

    // If WhatsApp payment selected, open WhatsApp directly with formatted invoice
    if (paymentMethod === 'whatsapp') {
      const summaryText = cartItems
        .map(
          (item) =>
            `• ${item.product.name} (${item.bundle.name}, ${item.selectedFlavor}, ${item.selectedSize}) x${item.quantity} = ${formatCOP(
              item.bundle.price * item.quantity
            )}`
        )
        .join('%0A');

      const message = `¡Hola TopOneNutrition! Deseo confirmar mi pedido:%0A%0A*Pedido:* ${orderId}%0A*Cliente:* ${name}%0A*Tel:* ${phone}%0A*Dirección:* ${address}, ${postalCode} ${city}%0A${
        notes ? `*Notas de entrega:* ${notes}%0A` : ''
      }%0A*Productos:*%0A${summaryText}%0A%0A*Total:* ${formatCOP(total)}`;

      window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
    }

    onCompleteOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal tracking-wide text-slate-900 font-gunplay uppercase">
              {step === 'cart' ? 'Tu Pedido TopOne' : 'Completar Datos de Envío'}
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} {cartItems.length === 1 ? 'ítem' : 'ítems'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>¡Genial! Cobertura con envíos a toda Colombia</span>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">Tu carrito está vacío</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Selecciona tu suplemento favorito y elige el pack de ahorro para comenzar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="mt-4 py-2 px-4 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Volver a la tienda
              </button>
            </div>
          ) : step === 'cart' ? (
            /* CART ITEM LIST WITH PRODUCT IMAGES */
            <div className="space-y-3.5">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3.5 relative shadow-xs"
                >
                  {/* PRODUCT IMAGE IN CART */}
                  <div className="w-16 h-20 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative">
                    {item.product.customImageUrl && item.product.customImageUrl.trim() !== '' ? (
                      <img
                        src={item.product.customImageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center scale-[0.6] origin-center">
                        <SupplementVisual product={item.product} size="sm" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="truncate pr-1">
                        <h4 className="text-xs font-normal text-slate-900 font-gunplay uppercase tracking-wide truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {item.bundle.name} · {item.selectedFlavor} · {item.selectedSize}
                        </div>
                        {item.bundle.freeGift && (
                          <div className="text-[10px] text-emerald-700 font-medium mt-0.5 truncate">
                            🎁 Regalo: {item.bundle.freeGift}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 shrink-0 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <div className="text-sm font-mono font-black text-slate-900 tabular-nums">
                          {formatCOP(item.bundle.price * item.quantity)}
                        </div>
                        {item.bundle.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through font-mono tabular-nums">
                            {formatCOP(item.bundle.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* CHECKOUT SHIPPING & PAYMENT FORM */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Mini Item summary preview in checkout */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {cartItems.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-white overflow-hidden shadow-xs flex items-center justify-center">
                        {item.product.customImageUrl && item.product.customImageUrl.trim() !== '' ? (
                          <img src={item.product.customImageUrl} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <div className="scale-[0.4] origin-center">
                            <SupplementVisual product={item.product} size="sm" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} productos en tu pedido
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-[#659208] hover:underline font-bold"
                >
                  Ver ítems
                </button>
              </div>

              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Datos de Entrega a Domicilio
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Roberto Gómez"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono Móvil (Avisos de reparto) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 612 345 678"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dirección de Envío Completa *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, piso y puerta"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Madrid"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="28001"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notas para el repartidor (Opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Dejar en portería o llamar al timbre 2B"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Método de Pago Seguro
                </div>

                <div className="space-y-2">
                  {/* Option 1: Contraentrega (Default) */}
                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#7cb20b] bg-[#7cb20b]/5 font-semibold ring-1 ring-[#7cb20b]/40'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#7cb20b] focus:ring-[#7cb20b]"
                      />
                      <Package className="w-4 h-4 text-[#7cb20b]" />
                      <span>Pago Contraentrega (Paga en efectivo al recibir)</span>
                    </div>
                    <span className="text-[10px] text-slate-700 font-mono bg-slate-100 px-2 py-0.5 rounded font-bold">En casa</span>
                  </label>

                  {/* Option 2: ePayco (Próximamente / Seleccionable) */}
                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'epayco'
                        ? 'border-[#7cb20b] bg-[#7cb20b]/5 font-semibold ring-1 ring-[#7cb20b]/40'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'epayco'}
                        onChange={() => setPaymentMethod('epayco')}
                        className="text-[#7cb20b] focus:ring-[#7cb20b]"
                      />
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span>ePayco (Tarjetas, PSE, Nequi, Daviplata)</span>
                        <div className="text-[10px] text-slate-500 font-normal">Pasarela de pagos en línea en Colombia</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ePayco
                    </span>
                  </label>

                  {/* Option 3: WhatsApp Direct */}
                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50 font-semibold ring-1 ring-emerald-500/40'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={() => setPaymentMethod('whatsapp')}
                        className="text-emerald-600 focus:ring-emerald-600"
                      />
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Confirmar pedido con asesor por WhatsApp</span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-mono font-bold">Chat</span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer with Animated Buy Button */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal productos:</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gastos de envío:</span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-700">GRATIS</strong>
                  ) : (
                    formatCOP(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total a Pagar:</span>
                <span className="font-mono text-base font-black text-slate-950 tabular-nums">
                  {formatCOP(total)}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="btn-buy-animated w-full py-3.5 rounded-lg bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-black text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tramitar Pedido</span>
                <span className="font-mono tabular-nums">({formatCOP(total)})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="py-3 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="btn-buy-animated flex-1 py-3.5 rounded-lg bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-black text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirmar Pedido Seguro</span>
                  <span className="font-mono tabular-nums">({formatCOP(total)})</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantía 30 días · Pago protegido con cifrado SSL</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
