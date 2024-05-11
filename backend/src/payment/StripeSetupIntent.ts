import type { CreateSetupIntent, SetupIntent } from "../types/Generell";
import { StripeUtility } from "./StripeUtility";

export class StripeSetupIntent {
    // private db: SetupIntentDatabaseCollection; // no databas connection
    private data: SetupIntent;
    constructor(initData: SetupIntent) {
        this.data = initData;
    }

    get id() { return this.data.id }

    isVerifiedByUserId(userId: string): boolean {
        return this.data.uid === userId;
    }

    getStatus = (): string => this.data.fullSetupIntent.status;

    toClientStripeSecret(): { client_secret: string }{
        if (!this.data.fullSetupIntent.client_secret) throw new Error('No client secret');
        return {
            client_secret: this.data.fullSetupIntent.client_secret,
        };
    }

    toClientStripePaymentMethod(): {    payment_method: string;    } {
        if (!this.data.fullSetupIntent) throw new Error('No setup intent');
        if (typeof this.data.fullSetupIntent.payment_method !== 'string')
            throw new Error('No payment method');

        return {
            payment_method: this.data.fullSetupIntent.payment_method,
        };
    }

    static async create(data: CreateSetupIntent): Promise<StripeSetupIntent> {
        const setupIntent = await StripeUtility.createSetupIntent(data);
        const { uid, productId, price } = data;
        const createData = {
            id: '123xxx',
            uid,
            price,
            productId,
            fullSetupIntent: setupIntent,
        };

        return new StripeSetupIntent(createData);
    }
}
