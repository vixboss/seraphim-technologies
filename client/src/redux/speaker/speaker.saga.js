import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import SpeakerActionTypes from './speaker.types';
import {unAuthorized} from '../../factory';

import {
    addSpeakerSuccess,
    addSpeakerFailure,
    getSpeakerSuccess,
    getSpeakerFailure,
    updateSpeakerSuccess,
    updateSpeakerFailure,
    deleteSpeakerSuccess,
    deleteSpeakerFailure
} from './speaker.action';

const MySwal = withReactContent(Swal);

export function* addSpeakerStart({payload: {title, url, description, qualification}}){
    try {
        const addedProduct = yield axios.post(`${host}/api/speaker`, {title, url, description, qualification});
        if(addedProduct.status === 200 || addedProduct.status === 201){
            // yield put(addSpeakerSuccess(addedProduct));
            yield getSpeakerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Speaker Added Successfully.',
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
        yield put(addSpeakerFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}
export function* getSpeakerStart() {
    try {
        const getSpeaker = yield axios.get(`${host}/api/speaker`);
        if(getSpeaker.status === 200 || getSpeaker.status === 201){
            yield put(getSpeakerSuccess(getSpeaker));
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
        yield put(getSpeakerFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}

export function* updateSpeakerStart({payload: {id, title, url, description, qualification}}){
    try {
        const speakerUpdate = yield axios.put(`${host}/api/speaker/${id}`, {title, url, description, qualification});
        if(speakerUpdate.status === 200 || speakerUpdate.status === 201){
            yield getSpeakerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Speaker Updated Successfully.',
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
        yield put(updateSpeakerFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
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
export function* deleteSpeakerConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteSpeakerStart({payload});
}

export function* deleteSpeakerStart({payload}) {
    try {
        const id = payload;
        const deleteBanner = yield axios.delete(`${host}/api/speaker/${id}`);
        if(deleteBanner.status === 200 || deleteBanner.status === 201){
            yield getSpeakerStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Speaker Deleted Successfully.',
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
        yield put(deleteSpeakerFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* onSpeakerAddStart() {
    yield takeLatest(SpeakerActionTypes.ADD_SPEAKER_START, addSpeakerStart)
}
export function* onSpeakerGetStart() {
    yield takeLatest(SpeakerActionTypes.GET_SPEAKER_START, getSpeakerStart)
}

export function* onSpeakerUpdateStart() {
    yield takeLatest(SpeakerActionTypes.UPDATE_SPEAKER_START, updateSpeakerStart)
}

export function* onSpeakerDeleteStart() {
    yield takeLatest(SpeakerActionTypes.DELETE_SPEAKER_START, deleteSpeakerConfirmation);
}

export function* SpeakerSaga(){
    yield all([
        call(onSpeakerAddStart),
        call(onSpeakerGetStart),
        call(onSpeakerUpdateStart),
        call(onSpeakerDeleteStart)
    ]);
}