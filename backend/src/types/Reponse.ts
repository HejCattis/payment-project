export interface ClientPayment {
    price: number;
    customerId: string;
    payment_method: string;
    uid: string;
}

export interface ClientFreePayment {
    price: number;
    customerId: string;
    payment_method: string;
    uid: string;
}

export interface ClientPaymentMethod {
    paymentMethodId: string;
    lastDigits: string;
    cardBrand: string;
    expire_month: number;
    expire_year: number;
    wallet: string;
}