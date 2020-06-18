// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";

export type CategoryStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  categories: Array<any>,
};

const initialState: CategoryStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  categories: [],
};

function asyncCategoryInit(state: CategoryStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: CategoryStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

export default (
  state: CategoryStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case "ASYNC_CATEGORIES_INIT":
      return asyncCategoryInit(state);
    case "CATEGORIES_HANDLE_NOTIFICATIONS":
      return handleNotification(state, payload);
    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        categories: payload,
      };
    default:
      return state;
  }
};
