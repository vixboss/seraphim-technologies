import { takeLatest, put, all, call } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import bcrypt from 'bcryptjs';

import UserActionTypes from './user.type';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.action';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

// SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10);

const MySwal = withReactContent(Swal);
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();

        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess());

    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const hashedPassword = bcrypt.hashSync(password, salt);
        const { user } = yield auth.signInWithEmailAndPassword(email, hashedPassword);
        yield getSnapshotFromUserAuth(user);
    } catch(error){
        yield put(signInFailure(error));
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Username or Password incorrect.',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();

        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
      } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try{
        const hashedPassword = bcrypt.hashSync(password, salt);
        const {user} = yield auth.createUserWithEmailAndPassword(email, hashedPassword);
        yield user.updateProfile({
            displayName: displayName
        });
        yield put(signUpSuccess({user: user, additionalData: displayName}))
    } catch(error) {
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);

}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}