import SuggestTopicActionTypes from "./suggest-topic.types";

const INITIAL_STATE = {
    isFetching: false,
    data: null
}

const suggestTopicReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_START:
            return{
                ...state
            }
        case SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        case SuggestTopicActionTypes.GET_SUGGEST_TOPIC_START:
            return {
                ...state,
                isFetching: true
            }
        case SuggestTopicActionTypes.GET_SUGGEST_TOPIC_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            }
        case SuggestTopicActionTypes.GET_SUGGEST_TOPIC_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default suggestTopicReducer;