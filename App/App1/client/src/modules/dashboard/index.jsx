// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Row from "components/Row";
import Col from "components/Col";
import Layout from "components/layout";
import ProductCard from "components/ProductCard";
import ImagePlaceHolder from "assets/image/product-image-placeholder.png";
import CategoryCard from "components/CategoryCard";
import Loader from "components/loader";
import Alert from "components/Alert";

import { getAllProducts } from "action/product";
import { getAllCategories } from "action/categories";
import { ASYNC_STATUS } from "constants/async";

import "./styles.scss";

type HomePageProps = {
  productStatus: AsyncStatusType,
  productNotification: NotificationType,
  categoryStatus: AsyncStatusType,
  categoryNotification: NotificationType,
  products: Array<any>,
  categories: Array<any>,
  getAllProducts: Function,
  getAllCategories: Function,
};

class HomePage extends Component<HomePageProps> {
  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllProducts();
  }

  searchProducts = (name) => {
    this.props.getAllProducts({ category: name });
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

  render() {
    const {
      productStatus,
      productNotification,
      categoryNotification,
      categoryStatus,
      products,
      categories,
    } = this.props;

    console.log(products)

    return (
      <Layout>
        <div className="homepage-container">
          {productNotification && (
            <Alert type={productNotification.type}>
              {productNotification.message}
            </Alert>
          )}
          {categoryNotification && (
            <Alert type={categoryNotification.type}>
              {categoryNotification.message}
            </Alert>
          )}
          <Row>
            <Col>
              <Row>
                <Col>
                  <div className="top-categories-section">
                    <div className="section-header-container">
                      <div className="section-header">Categories</div>
                    </div>
                    <div className={"mini-category-container"}>
                      {categoryStatus === ASYNC_STATUS.LOADING ? (
                        <Loader isLoading />
                      ) : (
                        categories.length > 0 &&
                        categories.map(({ category_name, color }, index) => {
                          return (
                            <CategoryCard
                              onClickCard={() =>
                                this.searchProducts(category_name)
                              }
                              key={index}
                              title={category_name}
                              color={"color2"}
                              icon={"star"}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="new-arrivals-section">
                    <div className="section-header-container">
                      <div className="section-header">Products</div>
                    </div>
                    <div className={"mini-new-arrivals-container"}>
                      {productStatus === ASYNC_STATUS.LOADING ? (
                        <Loader isLoading />
                      ) : products.length > 0 ? (
                        products.map((product, index) => {
                          return (
                            <ProductCard
                              key={index}
                              link={``}
                              title={product.productName}
                              image={product.image ? product.image:ImagePlaceHolder}
                              prices={parseFloat(product.price).toFixed(2)}
                              rating={{ rate: this.getRating(product.rating) }}
                            />
                          );
                        })
                      ) : null}
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
    productStatus: state.product.status,
    productNotification: state.product.notification,
    categoryStatus: state.category.status,
    categoryNotification: state.category.notification,
    products: state.product.products,
    categories: state.category.categories,
  };
};

const Actions = {
  getAllProducts,
  getAllCategories,
};

export default connect(mapStateToProps, Actions)(HomePage);
