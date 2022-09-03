import { createSelector } from "reselect";

const selectSpeakerOpportunity = state => state.speakerOpportunity;

export const selectAllSpeakersOpportunity = createSelector(
    [selectSpeakerOpportunity],
    (speakerData) => speakerData.data ? speakerData.data.data : []
);

export const isFetchingSpeakerOpportunity = createSelector(
    [selectSpeakerOpportunity],
    (speakerData) => speakerData.isFetching 
)