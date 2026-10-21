export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
  BankTransfer = 'BankTransfer',
  Check = 'Check',
  NedarimPlus = 'NedarimPlus',
  Other = 'Other'
}

export type Currency = 'USD' | 'NIS';

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  currency: Currency;
  donationDate: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
  receiptNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationRequest {
  amount: number;
  currency: Currency;
  donationDate: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
}

export interface UpdateDonationRequest {
  amount: number;
  currency: Currency;
  donationDate: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
}
