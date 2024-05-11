import React, { useEffect, useState } from 'react';
import ApplePay from './ApplePay';
import GooglePay from './GooglePay';

export interface WalletCheckoutProps {
    handleSubmit: () => Promise<void>;
}

const WalletCheckoutButton = ({
    handleSubmit,
}: WalletCheckoutProps) => {
    const [applePay, setApplePay] = useState(false);
    const checkApplePay = () => {
        if (
            (window as any).ApplePaySession         
            ) {
            setApplePay(true);
        } else setApplePay(false);
    };

    useEffect(() => {
        checkApplePay();
    }, []);
    // FIXME - finns det något sätt att se om google pay är tillgängligt?

    return (
        <React.Fragment>
            {applePay ? (
                <ApplePay
                    handleSubmit={handleSubmit}
                />
            ) : (
                <GooglePay
                    handleSubmit={handleSubmit}
                />
            )}
        </React.Fragment>
    );
};
export default WalletCheckoutButton;
