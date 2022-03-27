import AdminActionTypes from "./admin.type";

const INITIAL_STATE = {
    currentAdmin: null,
    error: null
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AdminActionTypes.ADMIN_SIGN_IN_SUCCESS:
            return{
                ...state,
                currentAdmin: action.payload,
                error: null
            }
        case AdminActionTypes.ADMIN_SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentAdmin: null,
                error: null
            }
        case AdminActionTypes.ADMIN_SIGN_OUT_FAILURE:
        case AdminActionTypes.ADMIN_SIGN_IN_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default adminReducer;