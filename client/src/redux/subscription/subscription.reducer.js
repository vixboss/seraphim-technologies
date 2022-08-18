import SubscriptionActionTypes from "./subscription.types";

const INITIAL_STATE = {
    subscription: null,
    isFetching: false,
    data: null
}

const subscriptionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SubscriptionActionTypes.UPDATE_SUBSCRIPTION_START:
        case SubscriptionActionTypes.ADD_SUBSCRIPTION_START:
            return{
                ...state
            }
        case SubscriptionActionTypes.UPDATE_SUBSCRIPTION_SUCCESS:
        case SubscriptionActionTypes.ADD_SUBSCRIPTION_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case SubscriptionActionTypes.UPDATE_SUBSCRIPTION_FAILURE:
        case SubscriptionActionTypes.ADD_SUBSCRIPTION_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        case SubscriptionActionTypes.GET_SUBSCRIPTION_START:
            return {
                ...state,
                isFetching: true
            }
        case SubscriptionActionTypes.GET_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            }
        case SubscriptionActionTypes.GET_SUBSCRIPTION_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default subscriptionReducer;