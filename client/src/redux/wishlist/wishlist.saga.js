import { put, all, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { host } from "../../api.config";
import WishlistActionType from "./wishlist.types";

import {
    addWishlistSuccess,
    addWishlistFailure,
    getWishlistFailure,
    getWishlistSuccess,
    removeWishlistFailure,
    removeWishlistSuccess
} from './wishlist.action';

const MySwal = withReactContent(Swal);

export function* addWishlistStart ({payload}) {
    try {
        const wishlist = yield axios.post(`${host}/api/wishlist`, payload);
        yield put(addWishlistSuccess(wishlist));
    } catch (error) {
        let err = error.response.data;
        yield put(addWishlistFailure(error));
        
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export function* getWishlistStart({payload}) {
    try {
        const wishlist = yield axios.get(`${host}/api/wishlist/${payload}`);
        yield put(getWishlistSuccess(wishlist));
    } catch (error) {
        let err = error.response.data;
        yield put(getWishlistFailure(error));
        
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export function* deleteWishlistConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield removeWishlistStart({payload});
}

export function* deletionConfirmation() {
    let confirmed = false;
    yield Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        confirmed = true;
    }
    });
    return confirmed;
}

export function* removeWishlistStart({payload: {id, email}}) {
    try {
        console.log(email);
        yield axios.delete(`${host}/api/wishlist/${id}`);
        yield getWishlistStart({payload: email});
    } catch (error) {
        console.log(error);
        let err = error.response.data;
        yield put(removeWishlistFailure(error));
        
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export function* onWishlistAddStart () {
    yield takeLatest(WishlistActionType.ADD_WISHLIST_START, addWishlistStart);
}

export function* onWishlistGetStart () {
    yield takeLatest(WishlistActionType.GET_WISHLIST_START, getWishlistStart);
}

export function* onWishlistRemoveStart () {
    yield takeLatest(WishlistActionType.REMOVE_WISHLIST_START, deleteWishlistConfirmation)
}

export function* WishlistSaga() {
    yield all([
        call(onWishlistAddStart),
        call(onWishlistGetStart),
        call(onWishlistRemoveStart)
    ]);
}