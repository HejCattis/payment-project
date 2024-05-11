import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
} from '@stripe/react-stripe-js';
import creditCard from '../../assets/icons/credit-card.svg';
import type { PaymentMethodSelected } from '../PaymentMethodSelector';
import { useState } from 'react';

interface StripeCardProps {
    newPayment: boolean;
    paymentMethod: PaymentMethodSelected;
    handlePaymentChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    cardStatus: {
        cardNumberComplete: boolean;
        cardExpiryComplete: boolean;
        cardCvcComplete: boolean;
    };
    setCardStatus: (status: {
        cardNumberComplete: boolean;
        cardExpiryComplete: boolean;
        cardCvcComplete: boolean;
    }) => void;
}

const StripeCard = ({
    newPayment,
    cardStatus,
    setCardStatus,
    handlePaymentChange,
    paymentMethod,
}: StripeCardProps) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClick = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const syntheticEvent: React.ChangeEvent<HTMLInputElement> = {
            target: {
                value: 'card',
                name: 'paymentMethodId',
                type: 'radio',
                checked: true,
            },
            currentTarget: {
                value: 'card',
                name: 'paymentMethodId',
                type: 'radio',
                checked: true,
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        try {
            await handlePaymentChange(syntheticEvent);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div 
        onClick={!isProcessing ? handleClick : undefined}
            className={`border cursor-pointer ${
                paymentMethod === 'card'
                    ? 'border-2 border-primary-900'
                    : 'border-gray-300'
            } rounded p-3`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-700 disabled:accent-primary-500 accent-primary-500">
                    <input
                        type="radio"
                        id="card"
                        name="paymentMethodId"
                        value="card"
                        onChange={handleClick}
                        checked={paymentMethod === 'card'}
                        disabled={isProcessing}
                    />
                    <label htmlFor="card" className="text-sm cursor-pointer">
                        {newPayment ? 'Kort' : 'Annat kort'}
                    </label>
                </div>
                <img className='h-6' src={creditCard} alt='card icon' />
            </div>

            {paymentMethod === 'card' && (
                <div className="my-2 flex flex-col" id="payment-form">
                    <label htmlFor="cardNumber" className="text-sm font-medium">
                        Kortnummer
                    </label>
                    <CardNumberElement
                        className="rounded border border-gray-300 p-2"
                        id="cardNumber"
                        onChange={(event) => {
                            setCardStatus({
                                ...cardStatus,
                                cardNumberComplete: !event.empty,
                            });
                        }}
                    />

                    <div className="mt-4 flex gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="expiry"
                                className="text-sm font-medium"
                            >
                                Giltighetstid
                            </label>
                            <CardExpiryElement
                                id="expiry"
                                className="rounded border border-gray-300 p-2"
                                onChange={(event) => {
                                    setCardStatus({
                                        ...cardStatus,
                                        cardExpiryComplete: !event.empty,
                                    });
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="cvc"
                                className="text-sm font-medium"
                            >
                                Säkerhetskod
                            </label>
                            <CardCvcElement
                                id="cvc"
                                className="rounded border border-gray-300 p-2"
                                onChange={(event) => {
                                    setCardStatus({
                                        ...cardStatus,
                                        cardCvcComplete: !event.empty,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StripeCard;
