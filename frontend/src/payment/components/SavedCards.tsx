import React from 'react';
import { ClientPaymentMethod } from '../../../../lib/generated-client';
import SavedCard from './SavedCard';
import { PaymentMethodSelected } from '../PaymentMethodSelector';

interface SavedCardsProps {
    savedCards: ClientPaymentMethod[] | [];
    setPaymentMethod: (paymentMethod: PaymentMethodSelected) => void;
    paymentMethod: PaymentMethodSelected;
}

const SavedCards = ({
    savedCards,
    setPaymentMethod,
    paymentMethod,
}: SavedCardsProps) => {
    if (savedCards.length === 0) return null;

    return (
        <React.Fragment>
            {savedCards.map((card) => (
                <SavedCard
                    key={card.paymentMethodId}
                    card={card}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                />
            ))}
        </React.Fragment>
    );
};
export default SavedCards;
