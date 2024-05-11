import visa from '../../assets/icons/visa.svg';
import mastercard from '../../assets/icons/mastercard.svg';
import amex from '../../assets/icons/amex.svg';
import creditCard from '../../assets/icons/credit-card.svg';
import applePay from '../../assets/icons/apple-pay.svg'
import googlePay from '../../assets/icons/google-pay.svg'

const cardBrandMap = new Map<string, typeof visa | typeof mastercard | typeof amex | typeof creditCard>([
    ['visa', visa],
    ['mastercard', mastercard],
    ['amex', amex],
]);

export const getCardBrand = (brand: string) => {
    const normalizedBrand = brand.toLowerCase();
    return cardBrandMap.get(normalizedBrand) || creditCard;
};

export const getWallet = (cardWallet: string) => {
    if (cardWallet === 'apple-pay') return applePay
    if (cardWallet === 'google-pay') return googlePay
};
