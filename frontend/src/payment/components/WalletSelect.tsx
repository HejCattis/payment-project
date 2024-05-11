import { useEffect, useState } from 'react';
import applepay from '../../assets/icons/apple-pay.svg';
import googlepay from '../../assets/icons/google-pay.svg';
import { PaymentMethodSelected } from '../PaymentMethodSelector';

const WalletSelect = ({
    setPayment,
    paymentMethod,
}: {
    setPayment: (paymentMethod: PaymentMethodSelected) => void;
    paymentMethod: PaymentMethodSelected;
}) => {
    const [applePay, setApplePay] = useState(false);
    const checkApplePay = () => {
        if ((window as any).ApplePaySession) {
            setApplePay(true);
        } else setApplePay(false);
    };

    useEffect(() => {
        checkApplePay();
    }, []);

    return (
        <div
            onClick={() => {
                setPayment('express-checkout');
            }}
            className={`cursor-pointer rounded  border border-gray-300 p-3 ${
                paymentMethod === 'express-checkout'
                    ? 'border-2 border-primary-900'
                    : 'border-gray-300'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-700">
                    <input
                        className='accent-primary-500'
                        type="radio"
                        id="express-checkout"
                        name="express-checkout"
                        value="express-checkout"
                        onChange={() => {
                            setPayment('express-checkout');
                        }}
                        checked={paymentMethod === 'express-checkout'}
                    />
                    <label htmlFor="express-checkout" className="text-sm cursor-pointer">
                        {applePay ? 'Apple Pay' : 'Google Pay'}
                    </label>
                </div>
                <div className="flex h-fit items-center justify-center">
                    {applePay ? (
                        <img
                            className="h-6"
                            src={applepay}
                            alt="ApplePay icon"
                        />
                    ) : (
                        <img
                            className="h-6"
                            src={googlepay}
                            alt="GooglePay icon"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default WalletSelect;
