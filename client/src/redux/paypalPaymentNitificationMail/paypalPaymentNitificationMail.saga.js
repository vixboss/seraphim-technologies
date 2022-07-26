import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { host } from '../../api.config';
import paypalPaymentNitificationMailActionType from './paypalPaymentNitificationMail.types';

import { paypalPaymentNitificationMailSuccess, paypalPaymentNitificationMailFailure } from './paypalPaymentNitificationMail.action';

export function* paypalPaymentNitificationMailSaga({payload}){
    try {
        console.log(payload);
        const data = {
            email: payload.payer.email_address,
            name: payload.payer.name.given_name + ' ' + payload.payer.name.surname,
            price: payload.purchase_units[0].amount.value
        }
        yield axios.post(`${host}/api/paypal-notification-mail`, data);
        yield put(paypalPaymentNitificationMailSuccess("Mail Sent Successfully."));
    } catch (error) {
        yield put(paypalPaymentNitificationMailFailure(error));
    }
}

export function* onPaypalPaymentNitificationMailSaga() {
    yield takeLatest(paypalPaymentNitificationMailActionType.SEND_PAYPAL_PAYMENT_NOTIFICATION_MAIL_START, paypalPaymentNitificationMailSaga)
}
export function* PaypalNotificationMailSaga(){
    yield all([
        call(onPaypalPaymentNitificationMailSaga),
    ]);
}

