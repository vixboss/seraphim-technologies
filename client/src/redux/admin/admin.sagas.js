import { takeLatest, put, all, call } from 'redux-saga/effects';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

import AdminActionTypes from './admin.type';
import { adminSignInSuccess, adminSignInFailure, adminSignOutSuccess, adminSignOutFailure } from './admin.action';
import { host } from '../../api.config';

export function* adminSignInStart({payload: {email, password}}) {
    const MySwal = withReactContent(Swal);
    try{
        // Hit api service with Axios.
        const adminResponse = yield axios.post(`${host}/api/admin`,{
            email: email.toString(),
            password:password.toString()
        });

        var doc = JSON.parse(adminResponse.config.data);

        // Setting accessToken in localStorage.
        localStorage.setItem('token',adminResponse.data.token);

        // Put returned value in success sign in function
        yield put(adminSignInSuccess({
            doc
        }));
    }
    catch(error){
        const err =  'Admin email or password incorrect.';
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(adminSignInFailure(error));
    }
}

export function* adminSignOutStart({payload: {history}}) {
    try{
        yield put(adminSignOutSuccess());
        localStorage.setItem('token','');
        yield history.push('/admin');
    }
    catch(error){
        yield put(adminSignOutFailure(error))
    }
}

export function* onAdminSignInStart() {
    yield takeLatest(AdminActionTypes.ADMIN_SIGN_IN_START, adminSignInStart)
}

export function* onAdminSignOutStart() {
    yield takeLatest(AdminActionTypes.ADMIN_SIGN_OUT_START, adminSignOutStart)
}

export function* AdminSaga() {
    yield all([
        call(onAdminSignInStart),
        call(onAdminSignOutStart)
    ]);
}