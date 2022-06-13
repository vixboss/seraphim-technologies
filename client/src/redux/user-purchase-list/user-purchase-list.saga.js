import { put, all, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { host } from "../../api.config";
import UserPurchaseListActionType from './user-purchase-list.type';
import {unAuthorized} from '../../factory';
import {
    getAllUserPurchaseListSuccess,
    getAllUserPurchaseListFailure
} from './user-purchase-list.action';

const MySwal = withReactContent(Swal);


export function* getUserPurchaseListStart () {
    try {
        const userPurchase = yield axios.get(`${host}/api/current-user-purchase`);
        yield put(getAllUserPurchaseListSuccess(userPurchase));
    } catch (error) {
        let err = error.response.data;
        yield put(getAllUserPurchaseListFailure(error));
        
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

export function* onUserPurchaseListGetStart () {
    yield takeLatest(UserPurchaseListActionType.GET_USER_PURCHASE_LIST_START, getUserPurchaseListStart);
}

export function* UserPurchaseListSaga() {
    yield all([
        call(onUserPurchaseListGetStart)
    ]);
}