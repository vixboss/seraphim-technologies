import MerchandiseType from './merchandise.types';

const INITIAL_STATE = {
    merchandise: null,
    error: null,
    isFetching: false
}

const merchandiseReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case MerchandiseType.MERCHANDISE_GET_START:
            return {
                ...state,
                isFetching: true
            }
        case MerchandiseType.MERCHANDISE_GET_SUCCESS:
            return {
                ...state,
                merchandise: action.payload,
                isFetching:false,
                error: null
            }
        case MerchandiseType.MERCHANDISE_GET_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching:false
            }
        default:
            return state
    }
}

export default merchandiseReducer