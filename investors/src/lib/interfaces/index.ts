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
