import React from 'react';
import { CustomerOrder } from '../../types/product';
import {
  XCircle, AlertTriangle, ArrowRight, RotateCcw,
  MessageCircle, ShoppingBag, ShieldAlert, Phone
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface PaymentStatusPageProps {
  order?: CustomerOrder | null;
  transactionData?: {
    refPayco?: string;
    amount?: number;
    currency?: string;
    description?: string;
    errorMessage?: string;
  };
  onRetry: () => void;
  onBackToStore: () => void;
}

export const PaymentRejectedPage: React.FC<PaymentStatusPageProps> = ({
  order,
  transactionData,
  onRetry,
  onBackToStore,
}) => {
  const totalAmount = order?.total || transactionData?.amount || 0;
  const orderRef = order?.id || transactionData?.refPayco || 'TOP1-ORDEN';

  const whatsappMessage = encodeURIComponent(
    `¡Hola TopOneNutrition! Mi pago en ePayco fue rechazado (Ref: ${orderRef}). Deseo pagar por transferencia bancaria directa o Nequi. ¿Me ayudan?`
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Rejected Header Card */}
        <div className="bg-white rounded-2xl border border-red-200 p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <XCircle className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full mb-3">
            Transacción Rechazada o No Completada
          </span>

          <h1 className="text-2xl sm:text-4xl font-normal text-slate-900 font-gunplay uppercase tracking-wide">
            Pago Rechazado en ePayco
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            La entidad bancaria o pasarela ePayco no pudo procesar tu transacción. No te preocupes, <strong className="text-slate-900">no se ha realizado ningún cobro en tu cuenta</strong>.
          </p>

          {/* Transaction Summary Info */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-500">
              <span>Referencia de pedido:</span>
              <span className="font-mono font-bold text-slate-800">{orderRef}</span>
            </div>
            {totalAmount > 0 && (
              <div className="flex justify-between text-slate-500">
                <span>Monto a pagar:</span>
                <span className="font-mono font-black text-slate-900">{formatCOP(totalAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Estado en pasarela:</span>
              <span className="font-bold text-red-600">Rechazada / Cancelada</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onRetry}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-black text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[3]" />
              <span>Intentar Pago de Nuevo</span>
            </button>

            <a
              href={`https://wa.me/573000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pagar por Nequi / Asesor WhatsApp</span>
            </a>
          </div>

          <div className="mt-4">
            <button
              onClick={onBackToStore}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold transition-colors"
            >
              Volver a la tienda
            </button>
          </div>
        </div>

        {/* Why this happened guide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-normal text-slate-900 font-gunplay uppercase tracking-wide flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>¿Por qué puede ser rechazada una transacción?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">1. Fondos o límite diario</strong>
              <p className="text-slate-600">Verifica que tu tarjeta o cuenta Nequi/Daviplata tenga saldo suficiente o permisos de compras virtuales.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">2. Validación de seguridad</strong>
              <p className="text-slate-600">Muchos bancos solicitan confirmación por SMS o Token digital que puede haber expirado.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">3. Medio alternativo</strong>
              <p className="text-slate-600">Puedes probar con otro medio de pago (PSE, tarjeta o transferencia por WhatsApp directa).</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
