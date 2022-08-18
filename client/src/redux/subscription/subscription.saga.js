import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import SubscriptionActionTypes from './subscription.types';
import {unAuthorized} from '../../factory';

import {
    addSubscriptionSuccess,
    addSubscriptionFailure,
    getSubscriptionSuccess,
    getSubscriptionFailure,
    updateSubscriptionSuccess,
    updateSubscriptionFailure
} from './subscription.action';

const MySwal = withReactContent(Swal);

export function* addSubscriptionStart({payload}){
    try {
        const {email,industry,name,phone,title} = payload;
        console.log(payload);
        const addSubscription = yield axios.post(`${host}/api/subscription`, {email,industry,name,phone,title});
        if(addSubscription.status === 200 || addSubscription.status === 201){
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Subscription Added Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            var redirectLocation = window.location.origin + '/';
            setTimeout(() => {
                window.location.href = redirectLocation;
            }, 2000);
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
        yield put(addSubscriptionFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}
export function* getSubscriptionStart() {
    try {
        const getSubscription = yield axios.get(`${host}/api/subscription`);
        if(getSubscription.status === 200 || getSubscription.status === 201){
            yield put(getSubscriptionSuccess(getSubscription));
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
        yield put(getSubscriptionFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}

export function* updateSubscriptionStart({payload}){
    try {
        const {email} = payload;
        const SubscriptionUpdate = yield axios.put(`${host}/api/subscription/${email}`);
        if(SubscriptionUpdate.status === 200 || SubscriptionUpdate.status === 201){
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Email Unsubscribed Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            var redirectLocation = window.location.origin + '/';
            setTimeout(() => {
                window.location.href = redirectLocation;
            }, 2000);
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
        yield put(updateSubscriptionFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}

export function* onSubscriptionAddStart() {
    yield takeLatest(SubscriptionActionTypes.ADD_SUBSCRIPTION_START, addSubscriptionStart)
}
export function* onSubscriptionGetStart() {
    yield takeLatest(SubscriptionActionTypes.GET_SUBSCRIPTION_START, getSubscriptionStart)
}

export function* onSubscriptionUpdateStart() {
    yield takeLatest(SubscriptionActionTypes.UPDATE_SUBSCRIPTION_START, updateSubscriptionStart)
}

export function* SubscriptionSaga(){
    yield all([
        call(onSubscriptionAddStart),
        call(onSubscriptionGetStart),
        call(onSubscriptionUpdateStart)
    ]);
}