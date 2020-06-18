
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Row from "components/Row";
import Col from "components/Col";
import Layout from "components/layout";
import Loader from "components/loader";
import Alert from "components/Alert";
import Button from "components/button";
import Checkbox from "components/checkbox";
import Input from "components/Input";
import uuid from "uuid";

import { removeFromCart } from "action/cart";
import { placeOrder, initOrder } from "action/product";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type OrderPageProps = {
  removeFromCart: Function,
  cartItems: Array<any>,
  placeOrder: Function,
  initOrder: Function,
  userId: string,
  status: AsyncStatusType,
  notification: NotificationType,
  orderSuccess: boolean,
};

type OrderPageState = {
  paymentMethod: string,
  details: {
    name: string,
    number: string,
    cvc: string,
  },
};

class OrderPage extends Component<OrderPageProps, OrderPageState> {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethod: "",
      details: {
        name: "",
        number: "",
        cvc: "",
      },
    };
  }

  componentDidMount() {
    this.props.initOrder();
  }

  onChangeCheckBox = (value) => {
    this.setState({
      ...this.state,
      paymentMethod: value,
      details: {
        name: "",
        number: "",
        cvc: "",
      },
    });
  };

  onChangeForm = (value) => {
    this.setState({
      ...this.state,
      details: {
        ...this.state.details,
        ...value,
      },
    });
  };

  onSubmit = () => {
    const { cartItems } = this.props;

    let subTotal = 0;
    cartItems.length > 0 &&
      cartItems.map(({ price, quantity }) => {
        subTotal = subTotal + parseFloat(price) * parseFloat(quantity);
        return null;
      });

    this.props.placeOrder({
      orderId: uuid.v4(),
      orderDate: new Date(),
      totalPrice: subTotal,
      paymentMethod: this.state.paymentMethod,
      products: this.props.cartItems,
      userId: this.props.userId,
    });
  };

  render() {
    const { cartItems, status, notification, orderSuccess } = this.props;
    const {
      paymentMethod,
      details: { name, number, cvc },
    } = this.state;

    let subTotal = 0;
    cartItems.length > 0 &&
      cartItems.map(({ price, buyQuantity }) => {
        subTotal = subTotal + parseFloat(price) * parseFloat(buyQuantity);
        return null;
      });

    if (status === ASYNC_STATUS.LOADING) {
      return <Loader isLoading />;
    }
console.log(cartItems);
    return (
      <Layout>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {orderSuccess ? (
          <div className="order-success">
            <div className="order-success-message">
              Thank you for shopping with us !
            </div>
            <div className="order-success-button">
              <Button htmlType={Button.HTML_TYPE.LINK} link="home">
                Shop again
              </Button>
            </div>
          </div>
        ) : (
          <div className="order">
            <div className="order-header">Checkout Order</div>
            <div className="order-table">
              <table>
                <tbody>
                  <tr className="table-heading">
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                  </tr>
                  {cartItems.length > 0 &&
                    cartItems.map((product) => {
                      return (
                        <tr key={product.productCode}>
                          <td>{product.productCode}</td>
                          <td>{product.productName}</td>
                          <td>{product.color}</td>
                          <td>{product.buyQuantity}</td>
                          <td>{product.price}</td>
                          <td>
                            {parseFloat(product.price) *
                              parseFloat(product.buyQuantity)}
                          </td>
                          <td>
                            <Button
                              type={Button.TYPE.DANGER}
                              onClick={() =>
                                this.props.removeFromCart(product.productCode)
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="order-totals">
              <Row>
                <Col className="order-totals-label">Item Count</Col>
                <Col size="3" className="order-totals-value">
                  {cartItems.length}
                </Col>
              </Row>
              <Row>
                <Col className="order-totals-label">Net Total</Col>
                <Col size="3" className="order-totals-total">
                  {parseFloat(subTotal).toFixed(2)}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="order-totals-payment">Payment method</div>
                  <div className="order-totals-options">
                    <div className="order-totals-options-visa">
                      <Checkbox
                        onChange={() => this.onChangeCheckBox("visa")}
                        isChecked={paymentMethod === "visa"}
                      >
                        Visa Card
                      </Checkbox>
                      {paymentMethod === "visa" && (
                        <div className="details">
                          <Row>
                            <Col className="details-label">Name on Card</Col>
                            <Col>
                              <Input
                                id="visa-name"
                                text={name}
                                onChange={(name) => this.onChangeForm({ name })}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="details-label">Card Number</Col>
                            <Col>
                              <Input
                                id="visa-number"
                                text={number}
                                onChange={(number) =>
                                  this.onChangeForm({ number })
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="details-label">Cvc Number</Col>
                            <Col>
                              <Input
                                id="visa-cvc"
                                text={cvc}
                                onChange={(cvc) => this.onChangeForm({ cvc })}
                              />
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                    <div className="order-totals-options-master">
                      <Checkbox
                        onChange={() => this.onChangeCheckBox("master")}
                        isChecked={paymentMethod === "master"}
                      >
                        Master Card
                      </Checkbox>
                      {paymentMethod === "master" && (
                        <div className="details">
                          <Row>
                            <Col className="details-label">Name on Card</Col>
                            <Col>
                              <Input
                                id="master-name"
                                text={name}
                                onChange={(name) => this.onChangeForm({ name })}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="details-label">Card Number</Col>
                            <Col>
                              <Input
                                id="master-number"
                                text={number}
                                onChange={(number) =>
                                  this.onChangeForm({ number })
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="details-label">
                            <Col>Cvc Number</Col>
                            <Col>
                              <Input
                                id="master-cvc"
                                text={cvc}
                                onChange={(cvc) => this.onChangeForm({ cvc })}
                              />
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                    <div className="order-totals-options-cash">
                      <Checkbox
                        onChange={() => this.onChangeCheckBox("cash")}
                        isChecked={paymentMethod === "cash"}
                      >
                        Cash on delivery
                      </Checkbox>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="order-totals-button">
                  <Button
                    type={Button.TYPE.SUCCESS}
                    disabled={paymentMethod === ""}
                    onClick={() => this.onSubmit()}
                  >
                    Place Order
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    orderSuccess: state.product.orderSuccess,
    status: state.product.status,
    notification: state.product.notification,
    userId: localStorage.getItem("CustomerName")
  };
};

const Actions = {
  removeFromCart,
  placeOrder,
  initOrder,
};

export default connect(mapStateToProps, Actions)(OrderPage);
