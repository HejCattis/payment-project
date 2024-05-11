import WalletCheckoutButton from './WalletCheckoutButton';
import type { PaymentMethodSelected } from '../PaymentMethodSelector';
import StandardButton from '../shared/StandardButton';

interface ButtonProps {
    submitText: string;
    paymentMethod: PaymentMethodSelected;
    loading: boolean;
    cardStatus: {
        cardNumberComplete: boolean;
        cardExpiryComplete: boolean;
        cardCvcComplete: boolean;
    };
    handleSubmit: () => Promise<void>;
}

const SubmitButton = ({
    submitText,
    cardStatus,
    loading,
    paymentMethod,
    handleSubmit,
}: ButtonProps) => {
    const { cardNumberComplete, cardExpiryComplete, cardCvcComplete } =
        cardStatus;
    const isSubmitDisabled =
        !cardNumberComplete || !cardExpiryComplete || !cardCvcComplete;

    if (paymentMethod === 'express-checkout')
        return (
            <WalletCheckoutButton
                handleSubmit={handleSubmit}
            />
        );

    return (
        <StandardButton
            text={submitText}
            onClick={() => {}}
            type="submit"
            loading={loading}
            disabled={
                !paymentMethod || (paymentMethod === 'card' && isSubmitDisabled)
            }
        />
    );
};
export default SubmitButton;
