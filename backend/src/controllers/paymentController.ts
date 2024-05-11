import { Controller, Route, SuccessResponse, Post, Body, Get } from 'tsoa';
import { PaymentService } from '../service/paymentService';
import type { CreateSetupIntentRequest } from '../types/Requests';
import type { ClientPaymentMethod } from '../types/Reponse';
import type { PaymentStatus } from '../types/Generell';

@Route('api/v1/payment')
export class PaymentController extends Controller {
    // @Security('firebase') - A middleware that checks if the user is authenticated, example: firebase
    @SuccessResponse('200', 'OK')
    @Post('/setup-intent')
    async newSetupIntent(
        @Body() requestBody: CreateSetupIntentRequest
    ): Promise<{ client_secret: string }> {
        return PaymentService.createSetupIntent(requestBody);
    }

    // @Security('firebase') - A middleware that checks if the user is authenticated, example: firebase
    @SuccessResponse('200', 'OK')
    @Get('/payment-method')
    async getPaymentMethods(): Promise<ClientPaymentMethod[]> {
        const uid = '123xxx';
        return PaymentService.getAllPaymentMethods(uid);
    }

    // @Security('firebase') - A middleware that checks if the user is authenticated, example: firebase
    @SuccessResponse('201', 'Created')
    @Post('/payment-method')
    async createPaymentMethod(
        @Body() requestBody: { stripePaymentMethodId: string }
    ): Promise<ClientPaymentMethod> {
        const uid = '123xxx';
        return PaymentService.createPaymentMethod(uid, requestBody);
    }

    // @Security('firebase') - A middleware that checks if the user is authenticated, example: firebase
    @SuccessResponse('200', 'OK')
    @Post('/payment')
    async createPayment(
        @Body() requestBody: { productId: string; paymentMethodId: string }
    ): Promise<{status: PaymentStatus}> {
        const status = await PaymentService.createPayment(requestBody);
		return {status};
    }
}
