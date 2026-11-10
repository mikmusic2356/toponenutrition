/**
 * MiPaquete Logistics API Service (Version 2)
 * Handles location matching, shipping quotes, and automated guide generation
 */

export interface MiPaqueteLocation {
  _id?: string;
  locationName: string;
  departmentOrStateName: string;
  locationCode: string;
  departmentOrStateCode?: string;
  departmentCode?: string;
}

export interface QuoteOption {
  id: string;
  deliveryCompanyId: string;
  deliveryCompanyName: string;
  deliveryCompanyImgUrl?: string;
  shippingCost: number;
  shippingTime: number; // in minutes or hours
  pickupService: boolean;
}

export interface ShippingGuideResult {
  success: boolean;
  trackingNumber?: string;
  guideUrl?: string;
  deliveryCompanyName?: string;
  error?: string;
  rawResponse?: any;
}

const API_KEY = import.meta.env.VITE_MIPAQUETE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWVlMzdlNzJiNTQ0ODRmNGYzMDQ0YTYiLCJuYW1lIjoiSkVTVVMiLCJzdXJuYW1lIjoiQU5UT05JTyIsImVtYWlsIjoiamVzdXMubWFycXVlejFAaG90bWFpbC5jb20iLCJjZWxsUGhvbmUiOiIzMTc0MzM5NDczIiwiY3JlYXRlZEF0IjoiMjAyNi0xMS0wNlQyMDoyNjoxNS4xMDBaIiwiZGF0ZSI6IjIwMjYtMTEtMDkgMjE6MzQ6NDciLCJpYXQiOjE3OTQyNzgwODd9.NHk6TMSypP41_ZAIOiQK3Av7ZjACDr9WSow0F3CEto4';
const BASE_URL = import.meta.env.VITE_MIPAQUETE_BASE_URL || 'https://api-v2.mpr.mipaquete.com';

const SENDER_CONFIG = {
  name: import.meta.env.VITE_SENDER_NAME || 'JESUS',
  surname: import.meta.env.VITE_SENDER_SURNAME || 'MARQUEZ',
  cellPhone: import.meta.env.VITE_SENDER_PHONE || '3174339473',
  email: import.meta.env.VITE_SENDER_EMAIL || 'jesus.marquez1@hotmail.com',
  daneCode: import.meta.env.VITE_SENDER_DANE || '11001000', // Bogota default
  address: import.meta.env.VITE_SENDER_ADDRESS || 'Calle 100 # 15-20',
  nit: import.meta.env.VITE_SENDER_NIT || '10000000',
  nitType: import.meta.env.VITE_SENDER_NIT_TYPE || 'CC',
};

// Common Colombian city DANE mappings for rapid client-side lookup
export const COMMON_DANE_CITIES: Record<string, string> = {
  bogota: '11001000',
  'bogota d.c.': '11001000',
  medellin: '05001000',
  cali: '76001000',
  barranquilla: '08001000',
  bucaramanga: '68001000',
  cartagena: '13001000',
  cucuta: '54001000',
  pereira: '66001000',
  manizales: '17001000',
  ibague: '73001000',
  villavicencio: '50001000',
  santamarta: '47001000',
  'santa marta': '47001000',
  valledupar: '20001000',
  monteria: '23001000',
  pasto: '52001000',
  neiva: '41001000',
  armenia: '63001000',
  popayan: '19001000',
  sincelejo: '70001000',
  tunja: '15001000',
  riohacha: '44001000',
  florencia: '18001000',
  quibdo: '27001000',
  soacha: '25754000',
  bello: '05088000',
  envigado: '05266000',
  itagui: '05360000',
  floridablanca: '68276000',
  giron: '68307000',
  piedecuesta: '68547000',
  dosquebradas: '66170000',
  palmira: '76520000',
  tulua: '76834000',
  buenaventura: '76109000',
};

/**
 * Normalizes text to match city names without accents
 */
function cleanText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Resolves a city name to an 8-digit DANE code
 */
export function resolveDaneCode(city: string): string {
  const clean = cleanText(city);
  if (COMMON_DANE_CITIES[clean]) {
    return COMMON_DANE_CITIES[clean];
  }
  for (const [key, dane] of Object.entries(COMMON_DANE_CITIES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return dane;
    }
  }
  return '11001000'; // Default to Bogota D.C.
}

function generateSessionTracker(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Fetch available delivery rates / carriers from MiPaquete
 */
export async function quoteShipping(
  destinyCity: string,
  declaredValue: number = 85000,
  weightKg: number = 1
): Promise<QuoteOption[]> {
  const destinyLocationCode = resolveDaneCode(destinyCity);

  const payload = {
    originLocationCode: SENDER_CONFIG.daneCode,
    destinyLocationCode,
    height: 15,
    width: 15,
    length: 15,
    weight: weightKg,
    declaredValue,
    quantity: 1,
  };

  try {
    const res = await fetch(`${BASE_URL}/quoteShipping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
        'session-tracker': generateSessionTracker(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn('Error al cotizar en MiPaquete:', await res.text());
      return [];
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.id || item.deliveryCompanyId,
        deliveryCompanyId: item.deliveryCompanyId,
        deliveryCompanyName: item.deliveryCompanyName || 'Transportadora Nacional',
        deliveryCompanyImgUrl: item.deliveryCompanyImgUrl,
        shippingCost: item.shippingCost || 0,
        shippingTime: item.shippingTime || 2880,
        pickupService: !!item.pickupService,
      }));
    }
    return [];
  } catch (err) {
    console.error('Fallo de red en quoteShipping:', err);
    return [];
  }
}

/**
 * Generates an official shipping guide with MiPaquete API
 * Supports paymentType: 101 (Prepagado/ePayco) and 102 (Contraentrega / Cobro al recibir)
 */
export async function createSendingGuide(params: {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  totalAmount: number;
  productDescription: string;
  isCod: boolean; // Contraentrega
  deliveryCompanyId?: string;
  preferCheapest?: boolean; // Por defecto true para maximizar margen
}): Promise<ShippingGuideResult> {
  const nameParts = params.customerName.trim().split(' ');
  const firstName = nameParts[0] || 'Cliente';
  const lastName = nameParts.slice(1).join(' ') || 'TopOne';
  const cleanPhone = params.customerPhone.replace(/[^0-9]/g, '').slice(-10);

  const destinyDaneCode = resolveDaneCode(params.customerCity);

  // Si no se especificó transportadora o preferCheapest es true, cotizar en tiempo real y elegir la más barata
  let chosenDeliveryCompany = params.deliveryCompanyId;

  if (!chosenDeliveryCompany || params.preferCheapest !== false) {
    try {
      const quotes = await quoteShipping(params.customerCity, params.totalAmount, 1);
      if (quotes && quotes.length > 0) {
        // Ordenar por menor costo
        quotes.sort((a, b) => a.shippingCost - b.shippingCost);
        chosenDeliveryCompany = quotes[0].deliveryCompanyId;
        console.log(`Transportadora óptima seleccionada: ${quotes[0].deliveryCompanyName} ($${quotes[0].shippingCost} COP)`);
      }
    } catch (e) {
      console.warn('No se pudo cotizar antes de enviar, usando fallback Servientrega');
    }
  }

  // Fallback seguro si la cotización fallara
  if (!chosenDeliveryCompany) {
    chosenDeliveryCompany = '5fceb46c8229797cb139a7aa'; // Servientrega
  }

  const payload = {
    channel: 'ecommerce',
    description: `Orden ${params.orderId} - ${params.productDescription.slice(0, 100)}`,
    paymentType: params.isCod ? 102 : 101, // 102 = Contraentrega, 101 = Pago anticipado
    deliveryCompany: chosenDeliveryCompany,
    requestPickup: false,
    adminTransactionData: {
      saleValue: Math.round(params.totalAmount),
    },
    locate: {
      originDaneCode: SENDER_CONFIG.daneCode,
      destinyDaneCode,
    },
    sender: {
      name: SENDER_CONFIG.name,
      surname: SENDER_CONFIG.surname,
      prefix: '+57',
      cellPhone: SENDER_CONFIG.cellPhone,
      email: SENDER_CONFIG.email,
      pickupAddress: SENDER_CONFIG.address,
      nit: SENDER_CONFIG.nit,
      nitType: SENDER_CONFIG.nitType,
    },
    receiver: {
      name: firstName,
      surname: lastName,
      prefix: '+57',
      cellPhone: cleanPhone || '3000000000',
      email: params.customerEmail || 'cliente@toponenutrition.com',
      destinationAddress: params.customerAddress,
      nit: '10000000',
      nitType: 'CC',
    },
    productInformation: {
      quantity: 1,
      height: 15,
      width: 15,
      large: 15,
      weight: 1,
      declaredValue: Math.round(params.totalAmount),
      productReference: params.productDescription.slice(0, 50),
      forbiddenProduct: false,
    },
  };

  try {
    const res = await fetch(`${BASE_URL}/createSending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
        'session-tracker': generateSessionTracker(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data) {
      return {
        success: true,
        trackingNumber: data.guideNumber || data.shippingNumber || data.id,
        guideUrl: data.guideUrl || data.urlPdf,
        deliveryCompanyName: data.deliveryCompanyName,
        rawResponse: data,
      };
    } else {
      console.warn('MiPaquete createSending respuesta:', data);
      return {
        success: false,
        error: data?.message?.detail || data?.message || 'No se pudo generar la guía automática.',
        rawResponse: data,
      };
    }
  } catch (err: any) {
    console.error('Error al conectar con API MiPaquete:', err);
    return {
      success: false,
      error: err.message || 'Error de conexión con el servicio logístico.',
    };
  }
}
