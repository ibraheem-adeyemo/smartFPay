export const formatVitualCardContent = (cardNumber) => {
    const formattedCardNumber = cardNumber.slice(0, 4) + ' ' + cardNumber.slice(4, 8) + ' ' + '****' + ' ' + cardNumber.slice(12);
    return formattedCardNumber;
}