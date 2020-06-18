// @flow
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Loader from "components/loader";
import ProductForm from "./component/productForm";

import { addToCart } from "action/cart";
import { addToWishList } from "action/wishList";
import { getProduct, updateProduct } from "action/product";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type ProductPageProps = {
  addToCart: Function,
  addToWishList: Function,
  getProduct: Function,
  updateProduct: Function,
  productStatus: AsyncStatusType,
  productNotification: NotificationType,
  match: {
    params: {
      productCode: number,
    },
  },
  product: Object | null,
};

class ProductPage extends Component<ProductPageProps> {
  componentDidMount() {
    const {
      match: {
        params: { productCode },
      },
    } = this.props;

    this.props.getProduct(productCode);
  }

  render() {
    const {
      productStatus,
      productNotification,
      product,
      updateProduct,
      addToCart,
      addToWishList,
    } = this.props;

    if (productStatus === ASYNC_STATUS.LOADING) {
      return <Loader isLoading />;
    }

    return (
      <Fragment>
        {product && (
          <ProductForm
            productNotification={productNotification}
            product={product}
            updateProduct={updateProduct}
            addToCart={addToCart}
            addToWishList={addToWishList}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productStatus: state.product.status,
    productNotification: state.product.notification,
    product: state.product.product,
  };
};

const Actions = {
  getProduct,
  updateProduct,
  addToCart,
  addToWishList,
};

export default connect(mapStateToProps, Actions)(ProductPage);
