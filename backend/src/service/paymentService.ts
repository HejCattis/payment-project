import { StripeSetupIntent } from '../payment/StripeSetupIntent';
import { StripeUtility } from '../payment/StripeUtility';
import type { CreateSetupIntent, LoggerType, PaymentStatus } from '../types/Generell';
import type { ClientPaymentMethod } from '../types/Reponse';
import type { CreateSetupIntentRequest } from '../types/Requests';

export class PaymentService {
    static async createSetupIntent(
        initData: CreateSetupIntentRequest,
        _log: LoggerType = console.log
    ): Promise<{ client_secret: string }> {
        const { productId, email, payment_method_types } = initData;
        const price = 900;
        const uid = '123xxx';
        const createData: CreateSetupIntent = {
            productId,
            price,
            payment_method_types,
            email,
            uid,
            name: 'John Doe',
        };
        return (
            await StripeSetupIntent.create(createData)
        ).toClientStripeSecret();
    }

    static async getAllPaymentMethods(
        _uid: string
    ): Promise<ClientPaymentMethod[]> {
        // return ( // no database connection
        //     (await PaymentMethod.getAll(uid))
        //         // .filter((method) => method.isCardPayment())
        //         .map((method) => method.toClientPaymentMethod())
        // );
        return [];
    }

    static async createPaymentMethod(
        _uid: string,
        data: { stripePaymentMethodId: string }
    ): Promise<ClientPaymentMethod> {
        // return (await PaymentMethod.create(uid, data)).toClientPaymentMethod();
        return {
            paymentMethodId: data.stripePaymentMethodId,
            lastDigits: '1234',
            cardBrand: 'Visa',
            expire_month: 12,
            expire_year: 2025,
            wallet: 'none',
        };
    }

    static async createPayment(
        data: { productId: string; paymentMethodId: string }
    ): Promise<PaymentStatus> {
        const fakeData = {
            price: 900,
            customerId: 'cus_Q5RYlrT0f9iIFN',
            payment_method: data.paymentMethodId,
            uid: '123xxx',
            productId: data.productId,
        }
        console.log(fakeData)
        const payment = await StripeUtility.createPaymentIntent(fakeData)
        if (!payment) {
            throw new Error('Payment not created');
        }
        if (payment.status !== 'succeeded') {
            throw new Error('Payment not succeeded');
        }
        return 'PAID';
    }
}
