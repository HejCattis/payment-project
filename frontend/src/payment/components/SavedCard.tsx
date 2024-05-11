import { ClientPaymentMethod } from '../../../../lib/generated-client';
import React from 'react';
import { PaymentMethodSelected } from '../PaymentMethodSelector';
import { getCardBrand } from '../utils/getCardBrand';

interface SavedCardProps {
    card: ClientPaymentMethod;
    setPaymentMethod: (paymentMethod: PaymentMethodSelected) => void;
    paymentMethod: PaymentMethodSelected;
}

const SavedCard = ({
    card,
    setPaymentMethod,
    paymentMethod,
}: SavedCardProps) => {
    
    if (card.wallet === 'apple-pay' || card.wallet === 'google-pay') return null;

    return (
        <React.Fragment>
            {card.cardBrand && card.lastDigits ? (
                <div
                onClick={() => {
                    setPaymentMethod(card.paymentMethodId);
                }}
                    className={`rounded cursor-pointer border border-gray-300 p-3 ${
                        paymentMethod === card.paymentMethodId
                            ? 'border-2 border-primary-900'
                            : 'border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-gray-700">
                            <input
                                className='accent-primary-500'
                                type="radio"
                                id={card.paymentMethodId.toString()}
                                name="paymentMethodId"
                                value={card.paymentMethodId}
                                onChange={() => {
                                    setPaymentMethod(card.paymentMethodId);
                                }}
                                checked={paymentMethod === card.paymentMethodId}
                            />
                            <label
                                htmlFor={card.paymentMethodId.toString()}
                                className="text-sm cursor-pointer"
                            >
                                **** {card.lastDigits}
                            </label>
                        </div>
                        <img src={getCardBrand(card.cardBrand)} alt="card brand" className='h-2' />
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
};
export default SavedCard;
