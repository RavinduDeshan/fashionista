// @flow
import React, { PureComponent } from "react";

import Row from "components/Row";
import Col from "components/Col";
import ImagePlaceHolder from "assets/image/product-image-placeholder.png";
import classNames from "classnames";
import Button from "components/button";

import "../styles.scss";

type CartProps = {
  cartItems: Array<any>,
  removeFromCart: Function,
  editCartItems: Function,
  handleCart: Function,
  open: boolean,
};

class CartForm extends PureComponent<CartProps> {
  constructor(props) {
    super(props);

    //$FlowFixMe
    this.handleCartModal = this.handleCartModal.bind(this);
  }

  handleCartModal() {
    this.props.handleCart();
  }

  render() {
    const { cartItems } = this.props;

    let subTotal = 0;
    cartItems.length > 0 &&
      cartItems.map(({ price, buyQuantity }) => {
        subTotal = subTotal + parseFloat(price) * parseFloat(buyQuantity);
        return null;
      });

    return (
      <div
        className={classNames("cart-modal-container", {
          open: this.props.open,
        })}
      >
        <div className="cart-content">
          <Row>
            <Col size="10">
              <div className="cart-header">Cart</div>
            </Col>
            <Col size="2" className="close-icon-container">
              <div className="close-cart" onClick={this.handleCartModal}>
                close
              </div>
            </Col>
          </Row>
          {cartItems.length > 0 &&
            cartItems.map((item, index) => {
              return (
                <Row key={index}>
                  <Col className="cart-item-body">
                    <div className="cart-image-container">
                      <div className="cart-image">
                        <img
                          src={ImagePlaceHolder}
                          alt={`cart-img-${index}`}
                          className="cart-image"
                        />
                      </div>
                    </div>
                    <div className="cart-item-details-container">
                      <Row className="cart-item-header">
                        <Col sm={12} md={7}>
                          <div className="cart-item-name">
                            {item.productName}
                          </div>
                        </Col>
                        <Col sm={12} md={4}>
                          <div className="cart-item-price">{`LKR ${item.price}`}</div>
                        </Col>
                      </Row>
                      <Row className="cart-item-details">
                        <Col>
                          <Row>
                            <div className="detail-wrapper">
                              <div className="detail-left-wrapper">
                                <div
                                  className="detail-decrease"
                                  onClick={() =>
                                    this.props.editCartItems({
                                      productCode: item.productCode,
                                      action: "decrease",
                                    })
                                  }
                                >
                                  -
                                </div>
                                <div className="detail-show">
                                  {item.buyQuantity}
                                </div>
                                <div
                                  className="detail-increase"
                                  onClick={() =>
                                    this.props.editCartItems({
                                      productCode: item.productCode,
                                      action: "increase",
                                    })
                                  }
                                >
                                  +
                                </div>
                              </div>
                              <div
                                className="detail-right-wrapper"
                                onClick={() =>
                                  this.props.removeFromCart(item.productCode)
                                }
                              >
                                Remove
                              </div>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              );
            })}
          <Row>
            <Col>
              <div className="billing-details">
                <Row>
                  <Col>
                    <div className="billing-details-label">Total</div>
                  </Col>
                  <Col>
                    <div className="billing-details-total">{`LKR ${subTotal.toFixed(
                      2
                    )}`}</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="button-checkout">
                <Button
                  htmlType={Button.HTML_TYPE.LINK}
                  link="checkout"
                  onClick={this.props.handleCart}
                >
                  Check out
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CartForm;
