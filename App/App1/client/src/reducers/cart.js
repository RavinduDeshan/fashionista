// @flow
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";

export type CartStateType = {
  cartItems: Array<any>,
  status: AsyncStatusType,
  notification: null | NotificationType,
  open: boolean,
};

const initialState: CartStateType = {
  cartItems: [],
  status: ASYNC_STATUS.INIT,
  notification: null,
  open: false,
};

function handleNotification(state: CartStateType, { isSuccess, notification }) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function onAddToCart(state: CartStateType, payload) {
  let filteredItems = state.cartItems.filter(
    ({ productCode }) => productCode !== payload.productCode
  );
  filteredItems.push(payload);

  return {
    ...state,
    cartItems: filteredItems,
  };
}

function onRemoveFromCart(state: CartStateType, { productCode }) {
  let filteredItems = state.cartItems.filter(
    ({ productCode: code }) => code !== productCode
  );

  return {
    ...state,
    cartItems: filteredItems,
  };
}

function editCartItems(state: CartStateType, { productCode, action }) {
  let updatedItems = state.cartItems.map((item) => {
    if (item.productCode === productCode) {
      if (action === "increase") {
        return {
          ...item,
          buyQuantity:
            parseFloat(item.buyQuantity) < parseFloat(item.quantity)
              ? parseFloat(item.buyQuantity) + 1
              : parseFloat(item.buyQuantity),
        };
      } else {
        return {
          ...item,
          buyQuantity:
            parseFloat(item.buyQuantity) > 0
              ? parseFloat(item.buyQuantity) - 1
              : 0,
        };
      }
    }
    return item;
  });
  return {
    ...state,
    cartItems: updatedItems,
  };
}

export default (
  state: CartStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case "CART_HANDLE_NOTIFICATIONS":
      return handleNotification(state, payload);
    case "ADD_TO_CART_SUCCESS":
      return onAddToCart(state, payload);
    case "REMOVE_FROM_CART_SUCCESS":
      return onRemoveFromCart(state, payload);
    case "EDIT_CART_SUCCESS":
      return editCartItems(state, payload);
    case "HANDLE_CART_SUCCESS":
      return {
        ...state,
        open: !state.open,
        notification: null,
      };
    default:
      return state;
  }
};
