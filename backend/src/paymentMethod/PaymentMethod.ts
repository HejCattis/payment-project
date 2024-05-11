// import { ClientPaymentMethod } from '../types/client/Response';
// import { StripePaymentMethodData } from '../types/db/PaymentMethodData';
// import {
//     StripeInfoPaymentMethod,
//     StripePaymentMethodId,
// } from 'src/types/client/Request';
// import { StripeUtility } from '../payment/StripeUtility';
// import Stripe from 'stripe';
// import { PaymentMethodDatabaseCollection, OutputPaymentMethod } from '../database/PaymentMethodDatabaseCollection';

// const walletMap = (wallet: Stripe.PaymentMethod.Card.Wallet | null) => {
//     if (!wallet) return 'none';
//     switch (wallet.type) {
//         case 'google_pay':
//             return 'google-pay';
//         case 'apple_pay':
//             return 'apple-pay';
//         default:
//             return 'none';
//     }
// };

// const db = new PaymentMethodDatabaseCollection();

// export class PaymentMethod {
//     private db: PaymentMethodDatabaseCollection;
//     private data: OutputPaymentMethod;
//     constructor(initData: OutputPaymentMethod) {
//         this.db = new PaymentMethodDatabaseCollection();
//         this.data = initData;
//     }

//     getData(): OutputPaymentMethod {
//         return this.data;
//     }

//     archive(): void {
//         this.data = {
//             ...this.data,
//             archived: true,
//         };
//     }

//     updateStripePaymentMethodId(data: StripePaymentMethodId): void {
//         this.data = {
//             ...this.data,
//             ...data,
//         };
//     }

//     isOwnedBy(userId: string): boolean {
//         return this.data.userId === userId;
//     }

//     async store(): Promise<void> {
//         await this.db.update(this.data);
//     }

//     isCardPayment(): boolean {
//         return this.data.type === 'card' && this.data.card?.wallet === 'none';
//     }

//     static async hasPaymentMethod(
//         userId: string,
//         fingerprint: string
//     ): Promise<null | PaymentMethod> {
//         const paymentMethod =
//             await db.hasPaymentMethod(
//                 userId,
//                 fingerprint 
//             );
//         if (!paymentMethod || paymentMethod.length === 0) return null;

//         const document = paymentMethod[0];

//         return new PaymentMethod(document);
//     }

//     toClientPaymentMethod(): ClientPaymentMethod {
//             return {
//                 paymentMethodId: this.data.id,
//                 lastDigits: this.data.card.last4,
//                 cardBrand: this.data.card.brand,
//                 expire_month: this.data.card.exp_month,
//                 expire_year: this.data.card.exp_year,
//                 wallet: this.data.card.wallet,
//             };
//     }

//     getStripeInfo(): StripeInfoPaymentMethod {
//         return {
//             stripePaymentMethodId: this.data.stripePaymentMethodId,
//             stripeCustomerId: this.data.stripeCustomerId,
//         };
//     }

//     getId = (): string => this.data.id;

//     static async create(
//         uid: string,
//         data: StripePaymentMethodId
//     ): Promise<PaymentMethod> {
//         const { stripePaymentMethodId } = data;
//         const stripePaymentMethod = await StripeUtility.retrievePaymentMethod(
//             stripePaymentMethodId
//         );

//         if (!['card'].includes(stripePaymentMethod.type)) {
//             throw new Error('No valid type found');
//         }

//         if (
//             !stripePaymentMethod.customer ||
//             typeof stripePaymentMethod.customer !== 'string'
//         ) {
//             throw new Error('No customer found');
//         }
//         if (stripePaymentMethod.type !== 'card' || !stripePaymentMethod.card) {
//             throw new Error('No card found');
//         }

//         const fingerprint = stripePaymentMethod.card?.fingerprint;
//         if (!fingerprint) throw new Error('No fingerprint found');

//         const existingPaymentMethod = await this.hasPaymentMethod(
//             uid,
//             fingerprint
//         );
//         if (existingPaymentMethod) return existingPaymentMethod;


//         const card = stripePaymentMethod.card;
//         const createData: StripePaymentMethodData = {
//             stripePaymentMethodId,
//             stripeCustomerId: stripePaymentMethod.customer,
//             userId: uid,
//             type: stripePaymentMethod.type,
//             card: {
//                 ...card,
//                 wallet: walletMap(card.wallet), 
//             },
//             archived: false,
//             createdAt: new Date(),
//         };
//         const paymentMethodData = await PaymentMethodDatabaseCollection.create(
//             createData
//         );

//         const paymentMethod = new PaymentMethod(paymentMethodData);
//         console.log('Payment method created with ID: ', paymentMethodData.id);

//         return paymentMethod;
//     }

//     static async retrieve(paymentMethodId: string): Promise<PaymentMethod> {
//         const document = await db.findFirst({ where: { id: paymentMethodId } });

//         if (!document) throw new NoSuchPaymentMethod();

//         return new PaymentMethod(document);
//     }

//     static async retrieveSafe(
//         uid: string,
//         paymentMethodId: string
//     ): Promise<PaymentMethod> {
//         const paymentMethod = await this.retrieve(paymentMethodId);
//         if (!paymentMethod.isOwnedBy(uid))
//             throw new InvalidPaymentMethodUser();
//         return paymentMethod;
//     }

//     static async getAll(uid: string): Promise<PaymentMethod[]> {
//         const paymentMethods =
//             await db.getAllPaymentMethods(uid);

//         if (!paymentMethods || paymentMethods.length === 0)
//             return [];

//         return paymentMethods.map((o) => new PaymentMethod(o));
//     }
// }

// export class NoSuchPaymentMethod extends Error { }
// export class InvalidPaymentMethodUser extends Error { }