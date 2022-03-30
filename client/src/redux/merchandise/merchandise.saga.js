import { put, all, call, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import MerchandiseTypes from './merchandise.types';
import { 
        getAllMerchandiseTitleSuccess, 
        getAllMerchandiseTitleFailure, 
        addMerchandiseTitleSuccess,
        addMerchandiseTitleFailure,
        updateMerchandiseTitleSuccess,
        updateMerchandiseTitleFailure,
        deleteMerchandiseTitleSuccess,
        deleteMerchandiseTitleFailure
} from './merchandise.action';

const MySwal = withReactContent(Swal);
export function* addMerchandiseStart({payload: {title}}){
    try {
        const addedProduct = yield axios.post(`${host}/api/merchandise`, {title});
        if(addedProduct.status === 200 || addedProduct.status === 201){
            yield put(addMerchandiseTitleSuccess(addedProduct));
            yield getMerchandiseTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Added Successfully.',
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
        yield put(addMerchandiseTitleFailure(error));
    }
}

export function* getMerchandiseTitleStart() {
    try {
        const productTitle = yield axios.get(`${host}/api/merchandise`);
        yield put(getAllMerchandiseTitleSuccess(productTitle.data.merchandiseTitleArray));
    } catch (error) {
        let err = error.response.data;
        yield put(getAllMerchandiseTitleFailure(error));

        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export function* updateMerchandiseStart({payload}){
    try {
        const updatedMerchandise = yield axios.put(`${host}/api/merchandise/${payload.id}`, payload);
        if(updatedMerchandise.status === 200 || updatedMerchandise === 201 ){
            yield put(updateMerchandiseTitleSuccess(updatedMerchandise));
            yield getMerchandiseTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Merchandise Updated Successfully.',
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
        yield put(updateMerchandiseTitleFailure(error));
    }
}

export function* deleteMerchandiseConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteMerchandiseStart({payload});
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

export function* deleteMerchandiseStart({payload}) {
    try {
        const id = payload;
        const deletedMerchandise = yield axios.delete(`${host}/api/merchandise/${id}`);
        if(deletedMerchandise.status === 200 || deletedMerchandise.status === 201){
            yield put(deleteMerchandiseTitleSuccess(deletedMerchandise));
            yield getMerchandiseTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Merchandise Deleted Successfully.',
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
        yield put(deleteMerchandiseTitleFailure(error));
    }
}

export function* onMerchandiseTitleGetStart () {
    yield takeLatest(MerchandiseTypes.MERCHANDISE_GET_START, getMerchandiseTitleStart);
}

export function* onMerchandiseTitleAddStart () {
    yield takeLatest(MerchandiseTypes.MERCHANDISE_ADD_START, addMerchandiseStart);
}

export function* onMerchandiseUpdateStart() {
    yield takeLatest(MerchandiseTypes.MERCHANDISE_UPDATE_START, updateMerchandiseStart)
}

export function* onMerchandiseDeleteStart() {
    yield takeLatest(MerchandiseTypes.MERCHANDISE_DELETE_START, deleteMerchandiseConfirmation)
}

export function* MerchandiseSaga() {
    yield all([
        call(onMerchandiseTitleAddStart),
        call(onMerchandiseTitleGetStart),
        call(onMerchandiseUpdateStart),
        call(onMerchandiseDeleteStart)
    ]);
}