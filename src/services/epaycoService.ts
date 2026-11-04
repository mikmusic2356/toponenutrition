/**
 * ePayco Payment Gateway Integration Service
 * Credentials configured for TOP ONE NUTRITION
 */

export interface EpaycoPaymentData {
  orderId: string;
  name: string;
  description: string;
  amount: number;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAddress: string;
  customerCity?: string;
  currency?: string;
}

declare global {
  interface Window {
    ePayco?: {
      checkout: {
        configure: (config: { key: string; test: boolean }) => {
          open: (data: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export const EPAYCO_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_EPAYCO_PUBLIC_KEY || '5abd29133e90741846ce0905f8f8d08f',
  CLIENT_ID: import.meta.env.VITE_EPAYCO_CLIENT_ID || '1596933',
  TEST_MODE: import.meta.env.VITE_EPAYCO_TEST_MODE === 'true',
};

/**
 * Ensures the ePayco Checkout.js script is dynamically loaded if not yet present in DOM
 */
export async function loadEpaycoScript(): Promise<boolean> {
  if (typeof window !== 'undefined' && window.ePayco) {
    return true;
  }

  return new Promise((resolve) => {
    const existing = document.querySelector('script[src*="checkout.epayco.co/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      // Give short delay in case it already finished
      setTimeout(() => resolve(!!window.ePayco), 500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('No se pudo cargar el script de ePayco');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Triggers the ePayco checkout modal (Cards, PSE, Nequi, Daviplata, Efecty, Baloto, etc.)
 */
export async function openEpaycoCheckout(data: EpaycoPaymentData): Promise<boolean> {
  const isLoaded = await loadEpaycoScript();
  if (!isLoaded || !window.ePayco) {
    alert('No se pudo iniciar la pasarela de ePayco. Por favor verifica tu conexión.');
    return false;
  }

  try {
    const handler = window.ePayco.checkout.configure({
      key: EPAYCO_CONFIG.PUBLIC_KEY,
      test: EPAYCO_CONFIG.TEST_MODE,
    });

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const responseUrl = `${currentOrigin}/?epayco_response=true`;
    const confirmationUrl = `${currentOrigin}/api/epayco/confirmation`;

    const cleanAmount = Math.round(data.amount);
    const invoiceNumber = data.orderId.replace(/[^a-zA-Z0-9_-]/g, '');

    const checkoutData: Record<string, unknown> = {
      // Información de la transacción
      name: data.name,
      description: data.description.slice(0, 255),
      invoice: invoiceNumber,
      currency: (data.currency || 'cop').toLowerCase(),
      amount: cleanAmount.toString(),
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',

      // Tipo de integración: false = Onpage modal, true = Redirección estándar
      external: 'false',

      // Atributos del cliente (Billing)
      name_billing: data.customerName,
      address_billing: data.customerAddress,
      mobilephone_billing: data.customerPhone.replace(/[^0-9]/g, ''),
      email_billing: data.customerEmail || 'cliente@toponenutrition.com',

      // Parámetros adicionales
      extra1: data.orderId,
      extra2: data.customerCity || '',

      // URLs de retorno
      response: responseUrl,
      confirmation: confirmationUrl,
    };

    handler.open(checkoutData);
    return true;
  } catch (err) {
    console.error('Error al inicializar ePayco checkout:', err);
    alert('Ocurrió un error al abrir ePayco. Intenta de nuevo.');
    return false;
  }
}
