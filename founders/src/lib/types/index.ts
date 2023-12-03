export interface ISuccessRazorpay {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface IrazorpayOrderData {
  amount: number;
  currency?: string;
  receipt?: string;
  email: string;
}

export interface IPaymentDetails {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export enum PlanType {
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
}
export enum PaymentStatus {
    SUCCESS = 'SUCCESS',
    PENDING =  'PENDING',
    FAILED = 'FAILED'
}

export enum SubscriptionStatus { 
    ACTIVE = 'ACTIVE', CANCELED ='CANCELED'
}


export interface RazorpayPlanBaseRequestBody {
  item: RazorpayItemBaseRequestBody;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
}

interface RazorpayItemBaseRequestBody {
  name: string;
  amount: number | string;
  currency: string;
  description?: string;
}