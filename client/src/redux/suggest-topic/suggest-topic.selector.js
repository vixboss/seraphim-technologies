import { createSelector } from "reselect";

const selectSuggestTopic = state => state.suggestTopic;

export const selectAllSuggestTopics = createSelector(
    [selectSuggestTopic],
    (suggestTopicData) => suggestTopicData.data ? suggestTopicData.data.data : []
);

export const isFetchingSuggestTopic = createSelector(
    [selectSuggestTopic],
    (suggestTopicData) => suggestTopicData.isFetching 
);