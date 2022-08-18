import SpeakerActionTypes from "./speaker.types";

const INITIAL_STATE = {
    speaker: null,
    isFetching: false,
    data: null
}

const speakerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SpeakerActionTypes.DELETE_SPEAKER_START:
        case SpeakerActionTypes.UPDATE_SPEAKER_START:
        case SpeakerActionTypes.ADD_SPEAKER_START:
            return{
                ...state
            }
        case SpeakerActionTypes.DELETE_SPEAKER_SUCCESS:
        case SpeakerActionTypes.UPDATE_SPEAKER_SUCCESS:
        case SpeakerActionTypes.ADD_SPEAKER_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case SpeakerActionTypes.DELETE_SPEAKER_FAILURE:
        case SpeakerActionTypes.UPDATE_SPEAKER_FAILURE:
        case SpeakerActionTypes.ADD_SPEAKER_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        case SpeakerActionTypes.GET_SPEAKER_START:
            return {
                ...state,
                isFetching: true
            }
        case SpeakerActionTypes.GET_SPEAKER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            }
        case SpeakerActionTypes.GET_SPEAKER_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default speakerReducer;