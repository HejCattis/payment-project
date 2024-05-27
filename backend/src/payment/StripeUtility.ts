import { Stripe } from 'stripe';
import type { CreateSetupIntent, CreateStripeCustomer, StripePaymentIntent, StripePaymentLoad } from '../types/Generell';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'test-project-stripe',
        version: '0.0.1',
    },
});


export class StripeUtility {
    private static async retrieveCustomer(
        uid: string
    ): Promise<Stripe.Customer | null> {
        try {
            console.log('retrieve stripe customer');
            // if (!isValidUid(uid)) {
            //     throw new Error('Invalid uid');
            // }
            const customer = await stripe.customers.search({
                query: `metadata["uid"]:"${uid}"`,
                limit: 1,
            });
            if (!customer.data[0]) {
                console.log('no stripe customer found');
                return null;
            }
            console.log('retrieved stripe customer:', customer.data[0]);
            return customer.data[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private static async createCustomer(
        initData: CreateStripeCustomer
    ): Promise<Stripe.Customer> {
        try {
            const { uid, email, name } = initData;

            console.log('create stripe customer');
            const customer = await stripe.customers.create({
                email,
                metadata: {
                    uid,
                },
                ...(name && { name }),
            });
            console.log('created stripe customer:', customer);
            return customer;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private static async ensureCustomer(
        initData: CreateStripeCustomer
    ): Promise<Stripe.Customer> {
        return (
            (await StripeUtility.retrieveCustomer(initData.uid)) ??
            (await StripeUtility.createCustomer(initData))
        );
    }


    static async createSetupIntent(
        initData: CreateSetupIntent
    ): Promise<Stripe.SetupIntent> {
        try {
            const { email, uid, name } = initData;

            const { id: customerId } = await StripeUtility.ensureCustomer(
                { uid, email, name }
            );
            console.log('Retrieved stripe customer: ' + customerId);


            console.log('create setup payment intent');

            const setupIntent = await stripe.setupIntents.create({
                customer: customerId
            });


            if (!setupIntent) {
                throw new Error('No setup intent created');
            }
            return setupIntent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createPaymentIntent({ price, customerId, payment_method, uid, productId }: StripePaymentLoad): Promise<StripePaymentIntent> {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: price,
                currency: 'SEK',
                customer: customerId,
                metadata: {
                    uid,
                    productId,
                },
                payment_method,
                off_session: true,
                confirm: true,
            });
            return paymentIntent;
        } catch (err: any) {
            // Error code will be authentication_required if authentication is needed
            console.log('Error is: ', err);
            const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
            console.log('PaymentIntent retrieved: ', paymentIntentRetrieved.id);
            return paymentIntentRetrieved;
        }
    }
}