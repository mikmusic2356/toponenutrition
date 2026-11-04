import React from 'react';
import { CustomerOrder } from '../../types/product';
import {
  Clock, AlertCircle, MessageCircle, ArrowRight,
  ShieldCheck, RefreshCw, FileText
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface PaymentPendingPageProps {
  order?: CustomerOrder | null;
  transactionData?: {
    refPayco?: string;
    amount?: number;
    currency?: string;
    description?: string;
  };
  onCheckStatus?: () => void;
  onBackToStore: () => void;
}

export const PaymentPendingPage: React.FC<PaymentPendingPageProps> = ({
  order,
  transactionData,
  onCheckStatus,
  onBackToStore,
}) => {
  const totalAmount = order?.total || transactionData?.amount || 0;
  const orderRef = order?.id || transactionData?.refPayco || 'TOP1-ORDEN';

  const whatsappMessage = encodeURIComponent(
    `¡Hola TopOneNutrition! Mi pago en ePayco está en estado PENDIENTE (Ref: ${orderRef}). ¿Me confirman si ya les figura en el sistema?`
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Pending Header Card */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 animate-spin-slow">
            <Clock className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
            Pago en Validación / Pendiente
          </span>

          <h1 className="text-2xl sm:text-4xl font-normal text-slate-900 font-gunplay uppercase tracking-wide">
            Tu Pago está Pendiente de Aprobación
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Tu transacción está siendo verificada por la entidad financiera o red de pagos (PSE / Efecty / Baloto / Bancolombia). Esto suele tardar entre unos minutos y pocas horas.
          </p>

          {/* Transaction Summary Info */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-500">
              <span>Referencia de pedido:</span>
              <span className="font-mono font-bold text-slate-800">{orderRef}</span>
            </div>
            {totalAmount > 0 && (
              <div className="flex justify-between text-slate-500">
                <span>Monto de la orden:</span>
                <span className="font-mono font-black text-slate-900">{formatCOP(totalAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Estado ePayco:</span>
              <span className="font-bold text-amber-600">Pendiente de Acreditación</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/573000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Verificar con un Asesor WhatsApp</span>
            </a>

            <button
              onClick={onBackToStore}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Volver a la Tienda</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* What to expect card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-normal text-slate-900 font-gunplay uppercase tracking-wide flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#7cb20b]" />
            <span>¿Qué debo hacer a continuación?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Si pagaste por PSE o Tarjeta</strong>
              <p className="text-slate-600">El banco enviará la confirmación automática a ePayco. Tan pronto se acredite, prepararemos tu paquete de inmediato.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Si elegiste Efectivo (Efecty / Baloto)</strong>
              <p className="text-slate-600">Recuerda realizar el pago en el punto con el pin o convenio asignado antes de que venza el plazo.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
