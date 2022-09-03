import SpeakerOpportunityActionTypes from './speaker-opportunity.types.js';

export const addSpeakerOpportunityStart = (data) => ({
    type: SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_START,
    payload: data
});

export const addSpeakerOpportunitySuccess = (data) => ({
    type:SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_SUCCESS,
    payload: data
});

export const addSpeakerOpportunityFailure = (errorMessage) => ({
    type:SpeakerOpportunityActionTypes.ADD_SPEAKER_OPPORTUNITY_FAILURE,
    payload: errorMessage
});

export const getSpeakerOpportunityStart = () => ({
    type: SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_START
});

export const getSpeakerOpportunitySuccess = (data) => ({
    type:SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_SUCCESS,
    payload: data
});

export const getSpeakerOpportunityFailure = (errorMessage) => ({
    type:SpeakerOpportunityActionTypes.GET_SPEAKER_OPPORTUNITY_FAILURE,
    payload: errorMessage
});