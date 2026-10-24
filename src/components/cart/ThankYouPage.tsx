import React from 'react';
import { CustomerOrder } from '../../types/product';
import { SupplementVisual } from '../common/SupplementVisual';
import {
  CheckCircle, Package, Truck, Clock, ArrowRight, ShieldCheck,
  MessageCircle, Printer, Download, MapPin, Phone, CreditCard, ChevronRight
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface ThankYouPageProps {
  order: CustomerOrder;
  onBackToStore: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onBackToStore }) => {
  const handlePrint = () => {
    window.print();
  };

  const paymentLabels: Record<string, string> = {
    card: 'Tarjeta de Crédito / Débito',
    bizum: 'Nequi / Bancolombia / Transferencia',
    cod: 'Pago Contraentrega (al recibir)',
    whatsapp: 'Pedido Directo por WhatsApp',
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola TopOneNutrition! Acabo de realizar el pedido ${order.id} a nombre de ${order.customer.name}. ¿Me confirmáis la salida del almacén? ¡Gracias!`
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Celebration Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] bg-[#7cb20b]/10 px-3 py-1 rounded-full mb-2">
            ¡Pago y Pedido Confirmados con Éxito!
          </span>

          <h1 className="text-2xl sm:text-4xl font-normal text-slate-900 font-gunplay uppercase tracking-wide">
            ¡Gracias por confiar en TopOneNutrition, {order.customer.name.split(' ')[0]}!
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Hemos registrado tu pedido <strong className="text-slate-900 font-mono">{order.id}</strong>. Nuestro equipo de laboratorio y logística ya está preparando tu paquete para entrega urgente 24/48 horas.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/34600000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Envío por WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Recibo</span>
            </button>
          </div>
        </div>

        {/* Live Delivery Status Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Estado del Envío</span>
              <h2 className="text-lg font-normal text-slate-900 font-gunplay uppercase tracking-wide">Seguimiento en Tiempo Real</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                24-48h Laborables
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">1. Pedido Aceptado</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Validado en sistema central</div>
                <div className="text-[10px] text-emerald-700 font-mono mt-1 font-semibold">Completado ahora</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#7cb20b] text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                2
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">2. En Preparación en Almacén</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Control de precinto y lote QA</div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">En curso</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl opacity-75">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">3. Reparto a Domicilio</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Entrega express en mano</div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Aviso SMS previo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Split Details: Customer Info (Left) + Itemized Receipt (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customer & Shipping Details (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-normal uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 font-gunplay">
              Datos del Destinatario
            </h3>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7cb20b] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{order.customer.name}</div>
                  <div className="text-slate-600 mt-0.5">{order.customer.address}</div>
                  <div className="text-slate-600">{order.customer.postalCode} {order.customer.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                <Phone className="w-4 h-4 text-[#7cb20b] shrink-0" />
                <div>
                  <span className="text-slate-500">Teléfono:</span>{' '}
                  <strong className="text-slate-900 font-mono">{order.customer.phone}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                <CreditCard className="w-4 h-4 text-[#7cb20b] shrink-0" />
                <div>
                  <span className="text-slate-500">Método de pago:</span>{' '}
                  <strong className="text-slate-900">{paymentLabels[order.paymentMethod] || order.paymentMethod}</strong>
                </div>
              </div>

              {order.customer.notes && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">Notas para el repartidor:</span>
                  {order.customer.notes}
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía de Satisfacción 30 Días incluida</span>
            </div>
          </div>

          {/* Itemized Order Products (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                <h3 className="text-sm font-normal uppercase tracking-wider text-slate-800 font-gunplay">
                  Resumen de Productos Comprados
                </h3>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  {order.items.reduce((acc, i) => acc + i.quantity, 0)} unidades
                </span>
              </div>

              {/* Products list with images */}
              <div className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4">
                    {/* Visual supplement canister thumbnail */}
                    <div className="w-16 h-20 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative">
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

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="text-xs font-normal text-slate-900 font-gunplay uppercase tracking-wide">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.bundle.name} · {item.selectedFlavor} · {item.selectedSize}
                      </div>
                      {item.bundle.freeGift && (
                        <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                          🎁 Regalo: {item.bundle.freeGift}
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-500 font-mono">
                        {item.quantity} x {formatCOP(item.bundle.price)}
                      </div>
                      <div className="text-sm font-black text-slate-900 font-mono tabular-nums">
                        {formatCOP(item.bundle.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total calculation panel */}
            <div className="pt-4 border-t border-slate-200 mt-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal productos:</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {formatCOP(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío express nacional:</span>
                <span className="font-mono tabular-nums">
                  {order.shippingCost === 0 ? (
                    <strong className="text-emerald-700">GRATIS</strong>
                  ) : (
                    formatCOP(order.shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Abonado:</span>
                <span className="font-mono text-lg font-black text-slate-950 tabular-nums">
                  {formatCOP(order.total)}
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onBackToStore}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Volver a la Tienda de Suplementos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
