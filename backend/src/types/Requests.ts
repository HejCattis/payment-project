export interface StartPaymentRequest {
    productId: string;
    paymentMethodId: string;
    stripeCustomerId: string;
    price: number;
    uid: string;    
}

export interface CreateFreePaymentRequest {
    price: number;
    uid: string;
}

export interface CreateSetupIntentRequest {
    productId: string;
    payment_method_types: string[];
    email: string;
    name?: string;
}