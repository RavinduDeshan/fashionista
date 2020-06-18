// @flow
import Alert from "components/Alert";

//asyncCategoriesInit
function asyncCategoriesInit() {
  return {
    type: "ASYNC_CATEGORIES_INIT",
  };
}

//asyncCategoriesInit
export function notificationHandler(isSuccess, message) {
  return {
    type: "CATEGORIES_HANDLE_NOTIFICATIONS",
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

//getAllCategories
export function getAllCategories() {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncCategoriesInit());

    let categoryService = serviceManager.get("CategoryService");

    categoryService
      .getAllCategories()
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "GET_CATEGORIES_SUCCESS",
            payload: data,
          });
        } else {
          dispatch(
            notificationHandler(
              success,
              data.errorMessage
                ? data.errorMessage
                : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}
