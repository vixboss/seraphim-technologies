import { put, all, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { host } from "../../api.config";
import UserPurchaseActionType from './user-purchase.type';
import {unAuthorized} from '../../factory';
import {
    getAllUserPurchaseSuccess,
    getAllUserPurchaseFailure,
} from './user-purchase.action';

const MySwal = withReactContent(Swal);

export function* getUserPurchaseStart() {
    try {
        const userPurchase = yield axios.get(`${host}/api/user-purchase`);
        yield put(getAllUserPurchaseSuccess(userPurchase));
    } catch (error) {
        let err = error.response.data;
        yield put(getAllUserPurchaseFailure(error));

        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(unAuthorized(error));
    }
}

export function* onUserPurchaseGetStart () {
    yield takeLatest(UserPurchaseActionType.GET_USER_PURCHASE_START, getUserPurchaseStart);
}


export function* UserPurchaseSaga() {
    yield all([
        call(onUserPurchaseGetStart)
    ]);
}