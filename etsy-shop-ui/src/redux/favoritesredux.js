import { FAVORITES_UPDATED } from "../constants/Constants";

export const favoritesupdatedredux = (state = {}, action) => {
  switch (action.type) {
    case FAVORITES_UPDATED:
      return action.payload;
    default:
      return state;
  }
};
