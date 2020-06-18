// @flow
import React, { Component } from "react";
import { type NotificationType } from "shared/types/General";

import Layout from "components/layout";
import Alert from "components/Alert";
import Row from "components/Row";
import Col from "components/Col";
import ImagePlaceHolder from "assets/image/placeholder.png";
import { Rate } from "components/Rate";
import Button from "components/button";
import Input from "components/Input";
import Checkbox from "components/checkbox";

type ProductFormPageProps = {
  productNotification: NotificationType,
  product: Object | null,
  updateProduct: Function,
  addToCart: Function,
  addToWishList: Function,
};

class ProductFormPage extends Component<ProductFormPageProps> {
  constructor(props) {
    super(props);

    this.state = {
      buyQuantity: 1,
      rate: 0,
    };
  }

  onChangeQuantity = (value) => {
    if (value === "increase") {
      this.setState({
        ...this.state,
        buyQuantity: this.state.buyQuantity + 1,
      });
    } else {
      this.setState({
        ...this.state,
        buyQuantity: this.state.buyQuantity > 0 ? this.state.buyQuantity - 1 : 0,
      });
    }
  };

  onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      const { product } = this.props;

      let updatedComments = product.comment;
      updatedComments.push(event.target.value);

      this.props.updateProduct({
        ...product,
        comment: updatedComments,
      });
    }
  };

  onSubmitRate = (event) => {
    const { rate } = this.state;
    const { product } = this.props;

    let updatedRating = product.rating ? product.rating : [];
    updatedRating.push(rate);

    this.props.updateProduct({
      ...product,
      rating: updatedRating,
    });
  };

  getRating = (rating) => {
    let rate = 0;

    if (rating && rating.length > 0) {
      rating.map((val) => {
        rate += parseFloat(val);
        return null;
      });
      rate = Math.round(rate / rating.length);
    }
    return rate;
  };

  markRate = (value) => {
    this.setState({
      ...this.state,
      rate: value,
    });
  };

  render() {
    const { productNotification, product } = this.props;

    const { buyQuantity } = this.state;

    return (
      <Layout>
        {productNotification && (
          <Alert type={productNotification.type}>
            {productNotification.message}
          </Alert>
        )}
        <div className="product-page">
          <Row>
            <Col>
              <div className="product-page-image">
                <img src={product.image?product.image:ImagePlaceHolder} alt="product" />
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div className="product-page-name">{product.productName}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="product-page-category">
                    {product.categoryName}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="product-page-rating">
                    <div className="ratings">
                      <Rate
                        value={this.getRating(product.rating)}
                        size={Rate.SIZE.LARGE}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="product-page-detail">Product Description</Col>
                <Col className="product-page-detail">{product.description}</Col>
              </Row>
              <Row>
                <Col className="product-page-detail">Product Price</Col>
                <Col className="product-page-detail">{product.price}</Col>
              </Row>
              <Row>
                <Col className="product-page-detail">Product Color</Col>
                <Col className="product-page-detail">{product.color}</Col>
              </Row>
              <Row>
                <Col className="product-page-quantity">
                  <div className="product-page-quantity-container">
                    <div
                      className="product-page-quantity-container-icon"
                      onClick={() => this.onChangeQuantity("decrease")}
                    >
                      -
                    </div>
                    <div className="product-page-quantity-container-data">
                      {buyQuantity}
                    </div>
                    <div
                      className="product-page-quantity-container-icon"
                      onClick={() => this.onChangeQuantity("increase")}
                    >
                      +
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="product-page-buttons">
                    <div className="product-page-buttons-cart">
                      <Button
                        onClick={() =>
                          this.props.addToCart({
                            ...product,
                            buyQuantity: this.state.buyQuantity,
                          })
                        }
                      >
                        Add to Cart
                      </Button>
                    </div>
                    <div className="product-page-buttons-list">
                      <Button
                        onClick={() =>
                          this.props.addToWishList({
                            ...product,
                          })
                        }
                      >
                        Add to Wishlist
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="product-page-comment">
                <div className="product-page-comment-header">Comments</div>
                <div className="product-page-comment-comments">
                  {product.comment &&
                    product.comment.length > 0 &&
                    product.comment.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="product-page-comment-comments-box"
                        >
                          {item.toString()}
                        </div>
                      );
                    })}
                  <div className="product-page-comment-comments-input">
                    <Input
                      id="comment"
                      placeholder="Enter your comment"
                      onKeyPress={(e) => this.onEnterKeyPress(e)}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="product-page-rating">
                <div className="product-page-rating-header">
                  Rate this product
                </div>
                <div className="product-page-rating-rate">
                  <Checkbox
                    text="1"
                    isChecked={this.state.rate === 1}
                    onChange={() => this.markRate(1)}
                  />
                  <Checkbox
                    text="2"
                    isChecked={this.state.rate === 2}
                    onChange={() => this.markRate(2)}
                  />
                  <Checkbox
                    text="3"
                    isChecked={this.state.rate === 3}
                    onChange={() => this.markRate(3)}
                  />
                  <Checkbox
                    text="4"
                    isChecked={this.state.rate === 4}
                    onChange={() => this.markRate(4)}
                  />
                  <Checkbox
                    text="5"
                    isChecked={this.state.rate === 5}
                    onChange={() => this.markRate(5)}
                  />
                  <Button onClick={this.onSubmitRate}>Mark Rate</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ProductFormPage;
