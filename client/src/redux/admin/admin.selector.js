import { createSelector } from "reselect";

const selectAdmin = state => state.admin;
export const selectCurrentAdmin = createSelector([selectAdmin], (admin) => admin.currentAdmin);