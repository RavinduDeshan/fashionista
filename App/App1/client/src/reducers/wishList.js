// @flow
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";

export type WishListStateType = {
  wishListItems: Array<any>,
  status: AsyncStatusType,
  notification: null | NotificationType,
};

const initialState: WishListStateType = {
  wishListItems: [],
  status: ASYNC_STATUS.INIT,
  notification: null,
};

function handleNotification(
  state: WishListStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function onAddToWishList(state: WishListStateType, payload) {
  let filteredItems = state.wishListItems.filter(
    ({ productCode }) => productCode !== payload.productCode
  );
  filteredItems.push(payload);

  return {
    ...state,
    wishListItems: filteredItems,
  };
}

function onRemoveFromWishList(state: WishListStateType, { productCode }) {
  let filteredItems = state.wishListItems.filter(
    ({ productCode: code }) => code !== productCode
  );

  return {
    ...state,
    wishListItems: filteredItems,
  };
}

export default (
  state: WishListStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case "WISH_LIST_HANDLE_NOTIFICATIONS":
      return handleNotification(state, payload);
    case "ADD_TO_WISH_LIST_SUCCESS":
      return onAddToWishList(state, payload);
    case "REMOVE_FROM_WISH_LIST_SUCCESS":
      return onRemoveFromWishList(state, payload);
    default:
      return state;
  }
};
