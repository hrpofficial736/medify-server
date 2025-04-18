export interface CreateOrderDto {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentDto {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}