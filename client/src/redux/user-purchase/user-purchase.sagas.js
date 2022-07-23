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
    addUserPurchaseSuccess,
    addUserPurchaseFailure,
    updateUserPurchaseDeliveryStatusFailure,
    updateUserPurchaseDeliveryStatusSuccess,
    searchUserPurchaseSuccess,
    searchUserPurchaseFailure
} from './user-purchase.action';

const MySwal = withReactContent(Swal);

export function* getUserPurchaseStart() {
    try {
        const userPurchase = yield axios.get(`${host}/api/user-purchase`);
        yield put(getAllUserPurchaseSuccess(userPurchase.data));
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

export function* searchUserPurchaseStart({payload}){
    try {
        const userPurchase = yield axios.post(`${host}/api/search-user-purchase`, payload);
        if(userPurchase.status === 200 || userPurchase.status === 201){
            yield put(searchUserPurchaseSuccess(userPurchase.data));
        }
    } catch (error) {
        let err = error.response.data;
        yield put(searchUserPurchaseFailure(error));

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

export function* addUserPurchaseStart({payload}) {
    try {
        const userPurchase = yield axios.post(`${host}/api/user-purchase`, payload);
        yield put(addUserPurchaseSuccess(userPurchase));
    } catch (error) {
        let err = error.response.data;
        yield put(addUserPurchaseFailure(error));

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

export function* updateUserPurchaseDeliveryStatusStart({payload}) {
    try {
        const userPurchase = yield axios.put(`${host}/api/user-purchase-delivery-status/${payload.id}`, payload);
        yield put(updateUserPurchaseDeliveryStatusSuccess(userPurchase));
        yield getUserPurchaseStart();
    } catch (error) {
        let err = error.response.data;
        yield put(updateUserPurchaseDeliveryStatusFailure(error));

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

export function* onUserPurchaseAddStart () {
    yield takeLatest(UserPurchaseActionType.ADD_USER_PURCHASE_START, addUserPurchaseStart);
}

export function* onUserPurchaseDeliveryStatusUpdateStart () {
    yield takeLatest(UserPurchaseActionType.UPDATE_USER_PURCHASE_DELIVERY_STATUS_START, updateUserPurchaseDeliveryStatusStart);
}

export function* onUserPurchaseSearchStart () {
    yield takeLatest(UserPurchaseActionType.SEARCH_USER_PURCHASE_START, searchUserPurchaseStart);
}

export function* UserPurchaseSaga() {
    yield all([
        call(onUserPurchaseGetStart),
        call(onUserPurchaseAddStart),
        call(onUserPurchaseDeliveryStatusUpdateStart),
        call(onUserPurchaseSearchStart)
    ]);
}