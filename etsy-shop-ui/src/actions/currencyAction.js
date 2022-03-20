import { CURRENCY_CHANGE_REQUEST } from "../constants/Constants";

export const currencychange = (currency) => async (dispatch) => {
  dispatch({ type: CURRENCY_CHANGE_REQUEST, payload: { currency } });
};
