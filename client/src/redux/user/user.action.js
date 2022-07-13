import UserActionTypes  from "./user.type";

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = (user) =>({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () =>({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({user, additionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData}
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const passwordResetWithEmailStart = (email) => ({
    type: UserActionTypes.PASSWORD_RESET_WITH_EMAIL_START,
    payload: email
});

export const passwordResetWithEmailSuccess = (email) => ({
    type: UserActionTypes.PASSWORD_RESET_WITH_EMAIL_SUCCESS,
    payload: email
});

export const passwordResetWithEmailFailure = error => ({
    type: UserActionTypes.PASSWORD_RESET_WITH_EMAIL_FAILURE,
    payload: error
});

export const passwordResetStart = (payload) => ({
    type: UserActionTypes.PASSWORD_RESET_START,
    payload: payload
});

export const passwordResetSuccess = (payload) => ({
    type: UserActionTypes.PASSWORD_RESET_SUCCESS,
    payload: payload
});

export const passwordResetFailure = error => ({
    type: UserActionTypes.PASSWORD_RESET_FAILURE,
    payload: error
});
