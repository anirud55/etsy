import { CURRENCY_CHANGE_REQUEST } from "../constants/Constants";

export const currencyredux = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_CHANGE_REQUEST:
      return action.payload;
    default:
      return state;
  }
};
