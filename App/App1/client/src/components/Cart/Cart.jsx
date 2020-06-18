// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import CartForm from "./components/CartForm";
import Loader from "components/loader";
import classNames from "classnames";

import { handleCart, removeFromCart, editCartItems } from "action/cart";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type CartProps = {
  getCartItems: Function,
  removeFromCart: Function,
  editCartItems: Function,
  cartItems: Array<any>,
  status: AsyncStatusType,
  notification: NotificationType,
  removeCartItems: Function,
  editCartItems: Function,
  onEditCArtItems: Function,
  handleCart: Function,
  open: boolean,
};

class Cart extends PureComponent<CartProps, CartState> {
  render() {
    const {
      cartItems,
      status,
      editCartItems,
      handleCart,
      open,
      removeFromCart,
    } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <div
          className={classNames("cart-modal-container", {
            open: this.props.open,
          })}
        >
          <Loader isLoading />
        </div>
      );
    }

    return (
      cartItems !== null && (
        <CartForm
          cartItems={cartItems}
          handleCart={handleCart}
          removeFromCart={removeFromCart}
          editCartItems={editCartItems}
          open={open}
        />
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    status: state.cart.status,
    notification: state.cart.notification,
    open: state.cart.open,
  };
};

const Action = { handleCart, removeFromCart, editCartItems };

export default connect(mapStateToProps, Action)(Cart);
