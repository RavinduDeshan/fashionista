// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";

export type ProductStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  products: Array<any>,
  product: null | Object,
  orderSuccess: boolean,
};

const initialState: ProductStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  products: [],
  product: null,
  orderSuccess: false,
};

function asyncProductInit(state: ProductStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: ProductStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

export default (
  state: ProductStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case "ASYNC_PRODUCT_INIT":
      return asyncProductInit(state);
    case "PRODUCT_HANDLE_NOTIFICATIONS":
      return handleNotification(state, payload);
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        products: payload,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        product: payload,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        product: payload,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        orderSuccess: true,
      };
    case "INITIATE_ORDER":
      return {
        ...state,
        orderSuccess: false,
        status: ASYNC_STATUS.INIT,
        notification: null,
      };
    default:
      return state;
  }
};
