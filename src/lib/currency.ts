/**
 * Utility functions for currency and numeric formatting in Colombian Pesos (COP)
 */

export const formatCOP = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0 COP';
  }
  // If amounts are in thousands (e.g. 149000 or 89000), format with Colombian dot separator
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} COP`;
};
