// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "components/Row";
import Col from "components/Col";
import Layout from "components/layout";
import ProductCard from "components/ProductCard";
import ImagePlaceHolder from "assets/image/product-image-placeholder.png";

import { removeFromWishList } from "action/wishList";
import { addToCart } from "action/cart";

import "./styles.scss";

type WishlistPageProps = {
  wishListItems: Array<any>,
  removeFromWishList: Function,
  addToCart: Function,
};

class WishlistPage extends Component<WishlistPageProps> {
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
  render() {
    const { wishListItems } = this.props;

    return (
      <Layout>
        <div className="wishlist-page-container">
          <Row>
            <Col>
              <Row>
                <Col>
                  <div className="new-arrivals-section">
                    <div className="section-header-container">
                      <div className="section-header">Wish List</div>
                    </div>
                    <div className={"mini-new-arrivals-container"}>
                      {wishListItems.length > 0
                        ? wishListItems.map((product, index) => {
                            return (
                              <ProductCard
                                key={index}
                                link={`product/${product.productCode}`}
                                show
                                title={product.productName}
                                image={ImagePlaceHolder}
                                prices={parseFloat(product.price).toFixed(2)}
                                rating={{
                                  rate: this.getRating(product.rating),
                                }}
                                onClickCart={() =>
                                  this.props.addToCart({
                                    ...product,
                                    buyQuantity: 1,
                                  })
                                }
                                onClickWishList={() =>
                                  this.props.removeFromWishList(
                                    product.productCode
                                  )
                                }
                              />
                            );
                          })
                        : null}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishListItems: state.wishList.wishListItems,
  };
};

const Actions = {
  removeFromWishList,
  addToCart,
};

export default connect(mapStateToProps, Actions)(WishlistPage);
