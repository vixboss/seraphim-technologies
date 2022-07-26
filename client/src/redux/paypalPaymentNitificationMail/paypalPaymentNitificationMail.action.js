import paypalPaymentNitificationMailActionType from './paypalPaymentNitificationMail.types';

export const paypalPaymentNitificationMailStart = title => ({
    type: paypalPaymentNitificationMailActionType.SEND_PAYPAL_PAYMENT_NOTIFICATION_MAIL_START,
    payload: title
});

export const paypalPaymentNitificationMailSuccess = productTitle => ({
    type: paypalPaymentNitificationMailActionType.SEND_PAYPAL_PAYMENT_NOTIFICATION_MAIL_SUCCESS,
    payload: productTitle
});

export const paypalPaymentNitificationMailFailure = error => ({
    type: paypalPaymentNitificationMailActionType.SEND_PAYPAL_PAYMENT_NOTIFICATION_MAIL_FAILURE,
    payload: error
})