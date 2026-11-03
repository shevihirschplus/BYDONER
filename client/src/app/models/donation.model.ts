export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
  BankTransfer = 'BankTransfer',
  Check = 'Check',
  NedarimPlus = 'NedarimPlus',
  Other = 'Other'
}

export enum DonationType {
  OneTime = 'OneTime',
  Annual = 'Annual'
}

export type Currency = 'USD' | 'NIS' |'GPB';

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  currency: Currency;
  donationDate: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
  donationType: DonationType;
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
  donationType: DonationType;
}

export interface UpdateDonationRequest {
  amount: number;
  currency: Currency;
  donationDate: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
  donationType: DonationType;
}
