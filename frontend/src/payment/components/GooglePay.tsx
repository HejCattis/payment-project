import { ExpressCheckoutElement, useElements } from '@stripe/react-stripe-js';
import { StripeExpressCheckoutElementOptions } from '@stripe/stripe-js';
import { WalletCheckoutProps } from './WalletCheckoutButton';

const GooglePay = ({
    handleSubmit,
}: WalletCheckoutProps) => {
    const elements = useElements();
    if (!elements) return null;

    elements.update({
        mode: 'setup',
        currency: 'sek',
    });

    const option: StripeExpressCheckoutElementOptions = {
        wallets: {
            googlePay: 'always',
            applePay: 'never',
        },
    };

    return (
        <div>
            <ExpressCheckoutElement
                options={option}
                onConfirm={handleSubmit}
            />
        </div>
    );
};
export default GooglePay;
