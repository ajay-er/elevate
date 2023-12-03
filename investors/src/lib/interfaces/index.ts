export const investmentAmountVariants = [
    '50000-500000',
    '500000-1000000',
    '1000000-5000000',
    '5000000-10000000',
    '10000000-50000000',
];

export interface ISuccessRazorpay {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface IrazorpayOrderData {
  amount: number;
  currency?: string;
  receipt?: string;
}

export interface IPaymentDetails {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export enum IRole {
  FOUNDER = 'FOUNDER',
  INVESTOR = 'INVESTOR',
}
