import SpeakerOpportunityActionTypes from "./speaker-opportunity.types";

const INITIAL_STATE = {
    isFetching: false,
    data: null
}

const speakerOpportunityReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_START:
            return{
                ...state
            }
        case SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_FAILURE:
        case SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        case SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_START:
            return {
                ...state,
                isFetching: true
            }
        case SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            }
        
        default: 
            return state;
    }
}

export default speakerOpportunityReducer;