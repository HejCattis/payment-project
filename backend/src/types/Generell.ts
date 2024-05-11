import type Stripe from "stripe";

export interface SetupIntent {
    id: string;
    uid: string;
    price: number;
    productId: string;
    fullSetupIntent: Stripe.SetupIntent;
}

export interface CreateSetupIntent {
    productId: string;
    price: number;
    payment_method_types: string[];
    email: string;
    uid: string;
    name?: string;
}

export interface CreateStripeCustomer {
    uid: string;
    email: string;
    name: string | undefined;
}

export interface StripePaymentLoad {
    uid: string;
    price: number;
    customerId: string;
    payment_method: string;
    productId: string;
}

export type PaymentStatus  = 'PAID' | 'DECLINED' | 'ERROR' | 'CANCELLED' | 'CREATED';

export interface PaymentMethodId {
    id: string;
    uid: string;
    stripePaymentMethodId: string;
    stripeCustomerId: string;
}

export type LoggerType = (...args: any[]) => void;

export type StripePaymentIntent = Stripe.PaymentIntent;