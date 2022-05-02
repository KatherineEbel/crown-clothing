import {createSelector} from "reselect";

export const selectUser = (state) => state.user
export const selectCurrentUser = createSelector(
  [selectUser],
  (userSlice) => userSlice.currentUser,
);

export const selectLoading = createSelector(
  [selectUser],
  (userSlice) => userSlice.loading,
)