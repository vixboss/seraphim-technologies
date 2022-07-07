import BannerActionType from './banner.types';

const INITIAL_STATE = {
    bannerTitle: null,
    error: null,
    isFetching: false,
    responseData:[],
    bannerById:[]
}

const bannerReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case BannerActionType.BANNER_GET_START:
            return{
                ...state,
                isFetching: true
            }
        case BannerActionType.BANNER_GET_SUCCESS:
            return {
                ...state,
                bannerTitle: action.payload,
                isFetching:false,
                error: null
            }
        case BannerActionType.BANNER_GET_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching:false
            }
        
        default:
            return state;
    }
}

export default bannerReducer;