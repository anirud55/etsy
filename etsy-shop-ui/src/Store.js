import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { currencyredux } from "./redux/currencyredux";
import { favoritesupdatedredux } from "./redux/favoritesredux";
import {
  productredux,
  shopPageProductsUpdatedredux,
} from "./redux/productredux";
import {
  loginstatusRedux,
  usererror,
  userSigninRedux,
} from "./redux/userRedux";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  currency: { currency: "$" },
  products: null,
  error: "",
  shopPageProductsUpdated: false,
  favoritesupdated: false,
};
const reducer = combineReducers({
  userInfo: userSigninRedux,
  error: usererror,
  currency: currencyredux,
  isLoggedIn: loginstatusRedux,
  products: productredux,
  shopPageProductsUpdated: shopPageProductsUpdatedredux,
  favoritesupdated: favoritesupdatedredux,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default Store;
