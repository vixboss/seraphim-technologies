import AdminActionTypes from './admin.type';

export const adminSignIn = (emailAndPassword) => ({
    type: AdminActionTypes.ADMIN_SIGN_IN_START,
    payload: emailAndPassword
});

export const adminSignInSuccess = (user) => ({
    type: AdminActionTypes.ADMIN_SIGN_IN_SUCCESS,
    payload: user
});

export const adminSignInFailure = (error) => ({
    type: AdminActionTypes.ADMIN_SIGN_IN_FAILURE,
    payload: error
});

export const adminSignOutStart = (history) => ({
    type: AdminActionTypes.ADMIN_SIGN_OUT_START,
    payload: history
})
export const adminSignOutSuccess = () => ({
    type: AdminActionTypes.ADMIN_SIGN_OUT_SUCCESS
})
export const adminSignOutFailure = (error) => ({
    type: AdminActionTypes.ADMIN_SIGN_OUT_FAILURE,
    payload: error
})