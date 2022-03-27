import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.type';
import { clearCart } from './cart.action';

export function* clearCArtOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess () {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCArtOnSignOut);
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}