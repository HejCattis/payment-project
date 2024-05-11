import { ExpressCheckoutElement, useElements } from '@stripe/react-stripe-js';
import {
    ClickResolveDetails,
    StripeExpressCheckoutElementClickEvent,
    StripeExpressCheckoutElementOptions,
} from '@stripe/stripe-js';
import { WalletCheckoutProps } from './WalletCheckoutButton';

const ApplePay = ({ handleSubmit }: WalletCheckoutProps) => {
    const elements = useElements();
    if (!elements) return null;

    elements.update({
        mode: 'setup',
        currency: 'sek',
    });

    const onClick = ({ resolve }: StripeExpressCheckoutElementClickEvent) => {
        const options: ClickResolveDetails = {
            applePay: {
                recurringPaymentRequest: {
                    paymentDescription: 'Prenumeration',
                    managementURL: 'https://hejdev.se',
                    regularBilling: {
                        amount:
                            900, // 9 SEK
                        label: 'Prenumeration',
                        recurringPaymentIntervalUnit: 'month',
                        recurringPaymentIntervalCount: 1,
                    },
                },
            },
        };

        resolve(options);
    };

    const option: StripeExpressCheckoutElementOptions = {
        wallets: {
            googlePay: 'never',
            applePay: 'always',
        },
    };

    return (
        <ExpressCheckoutElement
            options={option}
            onClick={onClick}
            onConfirm={handleSubmit}
        />
    );
};
export default ApplePay;
