import { useEffect, useRef, useState } from 'react';
import {
    CreateSetupIntentRequest,
    DefaultService,
    type ClientPaymentMethod,
} from '../../../lib/generated-client';
import {
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import SavedCards from './components/SavedCards';
import StripeCard from './components/StripeCard';
import SubmitButton from './components/SubmitButton';
import WalletSelect from './components/WalletSelect';
import DisplayPrice from './shared/DisplayPrice';
import ErrorMessage from './shared/ErrorMessage';

export type PaymentMethodSelected = "card" | "express-checkout" | string;
interface PaymentMethodSelectorProps {
    submitText: string;
    handleSubmit: (paymentMethodId: string) => Promise<void>;
    onError: (error: string) => void;
    errorMessage: string | null;
}



const PaymentMethodSelector = ({
    submitText,
    handleSubmit,
    onError,
    errorMessage,
}: PaymentMethodSelectorProps) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodSelected>('express-checkout');
    const client_secret = useRef<Promise<string> | null>(null);
    const [savedCards, setSavedCards] = useState<ClientPaymentMethod[]>([]);

    const elements = useElements();
    const stripe = useStripe();

    const [cardStatus, setCardStatus] = useState({
        cardNumberComplete: false,
        cardExpiryComplete: false,
        cardCvcComplete: false,
    });

    useEffect(() => {

        DefaultService.getPaymentMethods()
            .then((paymentMethods) => {
                setSavedCards(paymentMethods);
            })
            .catch((error) => {
                console.error('Error:', error);
                onError('Testa gärna igen');
            });
    }, [])

    const getPaymentMethodId = async () => {
        switch (paymentMethod) {
            case 'express-checkout':
                const expressCheckoutMethod =
                    await handleSetupExpressCheckout();
                return expressCheckoutMethod.paymentMethodId;
            case 'card':
                const cardMethod = await handleSetupCard();
                return cardMethod.paymentMethodId;
            default:
                return paymentMethod;
        }
    };

    const startPayment = async () => {
        setLoading(true);
        try {
            const paymentMethodId = await getPaymentMethodId();
            await handleSubmit(paymentMethodId);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const startSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startPayment();
    };

    const handleSetupExpressCheckout = async () => {
        try {
            if (!stripe || !elements)
                throw new Error('Stripe error');

            const clientSecret = await getSetupIntent();

            if (clientSecret === '') {
                throw new Error('No client secret');
            }

            const { error: submitError } = await elements.submit();
            if (submitError) {
                console.error(submitError.message);
                throw new Error('Stripe error');
            }

            const { error: stripeError, setupIntent } =
                await stripe.confirmSetup({
                    elements,
                    clientSecret: clientSecret,
                    redirect: 'if_required',
                    confirmParams: {
                        return_url: `${
                            import.meta.env.VITE_FRONTEND_URL
                        }/confirm`,
                    },
                });

            if (stripeError) {
                console.error(stripeError);
                onError(stripeError.message!);
                throw new Error('Stripe error');
            }

            if (!setupIntent) throw new Error('Setup intent not created');
            if (typeof setupIntent.payment_method !== 'string')
                throw new Error('Payment method not created');
            const paymentMethod = await createPaymentMethod(
                setupIntent.payment_method
            );
            if (!paymentMethod) throw new Error('Payment method not created');
            return paymentMethod;
        } catch (error) {
            console.error(error);
            onError('Testa gärna igen');
            throw new Error('Stripe error');
        }
    };

    const getSetupIntent = async () => {
        if (client_secret.current) return client_secret.current;
        const setupPromise = (async () => {
            try {
                if (!stripe || !elements) {
                    throw new Error('Stripe or elements not loaded');
                }
                const data: CreateSetupIntentRequest = {
                    productId: '123xxx',
                    payment_method_types: ['card'],
                    email: 'test@test.com',
                    name: 'John Doe',
                };
                const { client_secret } = await DefaultService.newSetupIntent(data);
                if (!client_secret) throw new Error('No setup intent');
                return client_secret;
            } catch (error) {
                console.error(error);
                onError('Testa gärna igen');
                return '';
            }
        })()
        client_secret.current = setupPromise
        return setupPromise;
    };

    const createPaymentMethod = async (
        payment_method: string
    ): Promise<ClientPaymentMethod | undefined> => {
        try {
            const createData = {
                stripePaymentMethodId: payment_method,
            };
            const paymentMethod =
                await DefaultService.createPaymentMethod(createData);
            return paymentMethod;
        } catch (error) {
            console.error(error);
            onError('Testa gärna igen');
        }
    };

    const handleSetupCard = async () => {
        try {
            if (!stripe || !elements) {
                throw new Error('Stripe or elements not loaded');
            }

            const clientSecret = await getSetupIntent();
            if (clientSecret === '') {
                throw new Error('No client secret');
            }

            const { error: stripeError, setupIntent } =
                await stripe.confirmCardSetup(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement)!,
                        billing_details: {
                            name: 'John Doe',
                        },
                    },
                });

            if (stripeError) {
                console.error(stripeError);
                onError(stripeError.message!);
                throw new Error('Stripe error');
            }
            if (!setupIntent) throw new Error('Setup intent not created');
            if (typeof setupIntent.payment_method !== 'string')
                throw new Error('Payment method not created');
            const paymentMethod = await createPaymentMethod(
                setupIntent.payment_method
            );
            if (!paymentMethod) throw new Error('Payment method not created');
            return paymentMethod;
        } catch (error) {
            console.error(error);
            throw new Error('Internal error');
        }
    };

    const handlePaymentChange = async () => {
        setPaymentMethod('card');
        getSetupIntent();
    };

    return (
        <form onSubmit={startSubmit} className="flex flex-col gap-4">
            <WalletSelect
                setPayment={setPaymentMethod}
                paymentMethod={paymentMethod}
            />
            <SavedCards
                savedCards={savedCards}
                setPaymentMethod={setPaymentMethod}
                paymentMethod={paymentMethod}
            />
            <StripeCard
                newPayment={savedCards.length === 0}
                cardStatus={cardStatus}
                setCardStatus={setCardStatus}
                paymentMethod={paymentMethod}
                handlePaymentChange={handlePaymentChange}
            />
            <ErrorMessage error={errorMessage} />
            <DisplayPrice margin='0' />
            <SubmitButton
                submitText={submitText}
                loading={loading}
                paymentMethod={paymentMethod}
                cardStatus={cardStatus}
                handleSubmit={startPayment}
            />
        </form>
    );
};

export default PaymentMethodSelector;
