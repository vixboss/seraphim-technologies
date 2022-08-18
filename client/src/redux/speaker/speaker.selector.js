import { createSelector } from "reselect";

const selectSpeaker = state => state.speaker;

export const selectAllSpeakers = createSelector(
    [selectSpeaker],
    (speakerData) => speakerData.data ? speakerData.data.data : []
);

export const isFetchingSpeaker = createSelector(
    [selectSpeaker],
    (speakerData) => speakerData.isFetching 
)