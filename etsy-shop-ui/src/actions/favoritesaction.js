import { FAVORITES_UPDATED } from "../constants/Constants";

export const favoritesupdated = (data) => async (dispatch) => {
  dispatch({ type: FAVORITES_UPDATED, payload: { data } });
};
