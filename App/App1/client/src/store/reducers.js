// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import product, { type ProductStateType } from "reducers/product";
import category, { type CategoryStateType } from "reducers/category";
import cart, { type CartStateType } from "reducers/cart";
import wishList, { type WishListStateType } from "reducers/wishList";

export type ApplicationState = {
  product: ProductStateType,
  category: CategoryStateType,
  cart: CartStateType,
  wishList: WishListStateType,
};

export default (history: History) =>
  combineReducers({
    product,
    category,
    cart,
    wishList,
    router: connectRouter(history),
  });
