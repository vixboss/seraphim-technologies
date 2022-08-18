import SpeakerActionTypes from "./speaker.types";

export const addSpeakerStart = (data) => ({
    type: SpeakerActionTypes.ADD_SPEAKER_START,
    payload: data
});

export const addSpeakerSuccess = (data) => ({
    type:SpeakerActionTypes.ADD_SPEAKER_SUCCESS,
    payload: data
});

export const addSpeakerFailure = (errorMessage) => ({
    type:SpeakerActionTypes.ADD_SPEAKER_FAILURE,
    payload: errorMessage
});

export const getSpeakerStart = () => ({
    type: SpeakerActionTypes.GET_SPEAKER_START
});

export const getSpeakerSuccess = (data) => ({
    type:SpeakerActionTypes.GET_SPEAKER_SUCCESS,
    payload: data
});

export const getSpeakerFailure = (errorMessage) => ({
    type:SpeakerActionTypes.GET_SPEAKER_FAILURE,
    payload: errorMessage
});

export const updateSpeakerStart = (data) => ({
    type: SpeakerActionTypes.UPDATE_SPEAKER_START,
    payload: data
});

export const updateSpeakerSuccess = (data) => ({
    type:SpeakerActionTypes.UPDATE_SPEAKER_SUCCESS,
    payload: data
});

export const updateSpeakerFailure = (errorMessage) => ({
    type:SpeakerActionTypes.UPDATE_SPEAKER_FAILURE,
    payload: errorMessage
});

export const deleteSpeakerStart = (data) => ({
    type: SpeakerActionTypes.DELETE_SPEAKER_START,
    payload: data
});

export const deleteSpeakerSuccess = (data) => ({
    type:SpeakerActionTypes.DELETE_SPEAKER_SUCCESS,
    payload: data
});

export const deleteSpeakerFailure = (errorMessage) => ({
    type:SpeakerActionTypes.DELETE_SPEAKER_FAILURE,
    payload: errorMessage
});