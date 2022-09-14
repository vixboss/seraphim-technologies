import SuggestTopicActionTypes from "./suggest-topic.types";

export const addSuggestTopicStart = (data) => ({
    type: SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_START,
    payload: data
});

export const addSuggestTopicSuccess = (data) => ({
    type:SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_SUCCESS,
    payload: data
});

export const addSuggestTopicFailure = (errorMessage) => ({
    type:SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_FAILURE,
    payload: errorMessage
});

export const getSuggestTopicStart = () => ({
    type: SuggestTopicActionTypes.GET_SUGGEST_TOPIC_START
});

export const getSuggestTopicSuccess = (data) => ({
    type:SuggestTopicActionTypes.GET_SUGGEST_TOPIC_SUCCESS,
    payload: data
});

export const getSuggestTopicFailure = (errorMessage) => ({
    type:SuggestTopicActionTypes.GET_SUGGEST_TOPIC_FAILURE,
    payload: errorMessage
});