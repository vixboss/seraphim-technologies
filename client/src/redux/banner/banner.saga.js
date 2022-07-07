import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import {unAuthorized} from '../../factory';
import BannerActionType from './banner.types';
import {
    getAllBannerSuccess, 
    getAllBannerFailure, 
    addBannerSuccess, 
    addBannerFailure,
    updateBannerSuccess,
    updateBannerFailure,
    deleteBannerSuccess,
    deleteBannerFailure,
} from './banner.action';

const MySwal = withReactContent(Swal);
export function* getBannerStart() {
    try {
        const banner = yield axios.get(`${host}/api/banner`);
        yield put(getAllBannerSuccess(banner.data));
    } catch (error) {
        let err = error.response.data;
        yield put(getAllBannerFailure(error));

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

export function* addBannerStart({payload: {title}}) {
    try {
        console.log(title);
        const addedBanner = yield axios.post(`${host}/api/banner`, {title});
        if(addedBanner.status === 200 || addedBanner.status === 201){
            yield put(addBannerSuccess(addedBanner.data));
            yield getBannerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Banner Title Added Successfully.',
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
        yield put(addBannerFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* updateBannerStart({payload: {id, title}}) {
    try {
        const updateBanner = yield axios.put(`${host}/api/banner/${id}`, {title});
        if(updateBanner.status === 200 || updateBanner.status === 201){
            yield put(updateBannerSuccess(updateBanner.data));
            yield getBannerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Banner Title Updated Successfully.',
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
        yield put(updateBannerFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* deleteBannerStart({payload}) {
    try {
        const id = payload;
        const deleteBanner = yield axios.delete(`${host}/api/banner/${id}`);
        if(deleteBanner.status === 200 || deleteBanner.status === 201){
            yield put(deleteBannerSuccess(deleteBanner.data));
            yield getBannerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Banner Title Deleted Successfully.',
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
        yield put(deleteBannerFailure(error));
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
export function* deleteBannerConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteBannerStart({payload});
}

export function* onBannerGetStart() {
    yield takeLatest(BannerActionType.BANNER_GET_START, getBannerStart);
}

export function* onBannerAddStart() {
    yield takeLatest(BannerActionType.BANNER_ADD_START, addBannerStart);
}

export function* onBannerUpdateStart() {
    yield takeLatest(BannerActionType.BANNER_UPDATE_START, updateBannerStart);
}

export function* onBannerDeleteStart() {
    yield takeLatest(BannerActionType.BANNER_DELETE_START, deleteBannerConfirmation);
}

export function* BannerSaga(){
    yield all([
        call(onBannerGetStart),
        call(onBannerAddStart),
        call(onBannerUpdateStart),
        call(onBannerDeleteStart)
    ]);
}