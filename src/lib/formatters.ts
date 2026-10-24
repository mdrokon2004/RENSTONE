// Utility formatters for RENSTONE (BDT Currency & Numbers)

export function formatBDT(amount: number): string {
  if (isNaN(amount)) return '৳0';
  return `৳${amount.toLocaleString('en-US')}`;
}

export function calculateDiscount(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function generateOrderReference(): string {
  const year = new Date().getFullYear();
  const randomHex = Math.floor(100000 + Math.random() * 900000);
  return `REN-${year}-${randomHex}`;
}

export function validateBDPhone(phone: string): boolean {
  // Matches Bangladeshi mobile numbers: 013, 014, 015, 016, 017, 018, 019 + 8 digits
  const cleanPhone = phone.replace(/[\s\-+]/g, '');
  const bdPattern = /^(?:8801|01)[3-9]\d{8}$/;
  return bdPattern.test(cleanPhone);
}

export function cleanPhoneForWhatsApp(phone: string): string {
  let clean = phone.replace(/[^\d]/g, '');
  if (clean.startsWith('01')) {
    clean = '88' + clean;
  }
  return clean;
}
