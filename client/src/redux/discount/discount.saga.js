import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import DiscountActionTypes from './discount.types';
import {unAuthorized} from '../../factory';
import { 
    addDiscountSuccess, 
    addDiscountFailure,
    getAllDiscountSuccess,
    getAllDiscountFailure,
    updateDiscountSuccess,
    updateDiscountFailure,
    deleteDiscountSuccess,
    deleteDiscountFailure,
    discountGetByNameSuccess,
    discountGetByNameFailure
} from '../discount/discount.action';

const MySwal = withReactContent(Swal);

export function* addDiscountStartSaga({payload}) {
    try {
        const discount = yield axios.post(`${host}/api/discount`, {payload});
        if(discount.status === 200 || discount.status === 201){
            yield put(addDiscountSuccess(discount.data));
            yield getDiscountStartSaga();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Discount Added Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(addDiscountFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* getDiscountStartSaga() {
    try {
        const discount = yield axios.get(`${host}/api/discount`);
        yield put(getAllDiscountSuccess(discount.data));
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(getAllDiscountFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* updateDiscountStartSaga({payload}) {
    try {
        const id = payload.discountId;
        const discount = yield axios.put(`${host}/api/discount/${id}`, {payload});
        if(discount.status === 200 || discount.status === 201){
            yield put(updateDiscountSuccess(discount.data));
            yield getDiscountStartSaga();

            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Discount Updated Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(updateDiscountFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* deleteDiscountStartSaga({payload}) {
    try {
        const id = payload._id;
        const discount = yield axios.delete(`${host}/api/discount/${id}`);
        if(discount.status === 200 || discount.status === 201){
            yield put(deleteDiscountSuccess(discount.data));
            yield getDiscountStartSaga();

            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Discount Deleted Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(deleteDiscountFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* discountByNameStartSaga({payload}) {
    try {
        const discount = yield axios.post(`${host}/api/apply-discount`, {payload});
        yield put(getAllDiscountSuccess(discount.data));
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(discountGetByNameFailure(error));
        yield put(unAuthorized(error));
    }
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

export function* deleteDiscountConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteDiscountStartSaga({payload});
}

export function* onDiscountAddStart() {
    yield takeLatest(DiscountActionTypes.DISCOUNT_ADD_START, addDiscountStartSaga);
}
export function* onDiscountGetStart() {
    yield takeLatest(DiscountActionTypes.DISCOUNT_GET_START, getDiscountStartSaga);
}
export function* onDiscountUpdateStart() {
    yield takeLatest(DiscountActionTypes.DISCOUNT_UPDATE_START, updateDiscountStartSaga);
}
export function* onDiscountDeleteStart() {
    yield takeLatest(DiscountActionTypes.DISCOUNT_DELETE_START, deleteDiscountConfirmation);
}
export function* onDiscountGetByNameStart() {
    yield takeLatest(DiscountActionTypes.DISCOUNT_GET_BY_NAME_START, discountByNameStartSaga)
}
export function* DiscountSaga() {
    yield all([
        call(onDiscountAddStart),
        call(onDiscountGetStart),
        call(onDiscountUpdateStart),
        call(onDiscountDeleteStart),
        call(onDiscountGetByNameStart)
    ]);
}