import {
  SET_PRODUCTS,
  SHOP_PAGE_PRODUCTS_UPDATED,
} from "../constants/Constants";

export const productredux = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export const shopPageProductsUpdatedredux = (state = {}, action) => {
  switch (action.type) {
    case SHOP_PAGE_PRODUCTS_UPDATED:
      return action.payload;
    default:
      return state;
  }
};
