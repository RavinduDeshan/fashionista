// @flow
import React, { PureComponent } from "react";

import Link from "components/Link";

import { textTruncate } from "shared/utils";
import { Rating } from "components/Rate";

import "./styles.scss";
import Button from "components/button";
import Icon from "components/icon";

type ProductCardProps = {
  link: string,
  title: string,
  image: string,
  rating: object,
  prices: number,
  currency?: string,
  show: boolean,
  onClickCart?: Function,
  onClickWishList?: Function,
};

class ProductCard extends PureComponent<ProductCardProps> {
  static defaultProps = {
    prices: 0,
    currency: "LKR",
    selectable: false,
    selected: false,
    onChange: () => {},
    onClickCart: () => {},
    show: false,
    onClickWishList: () => {},
  };

  render() {
    const {
      link,
      title,
      image,
      rating,
      prices,
      currency,
      show,
      onClickCart,
      onClickWishList,
    } = this.props;
    return (
      <div className="product">
        <div className="featured-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-content">
          <Link to={`${link}`}>
            <div className="product-title">{textTruncate(title, 20)}</div>
            <span className="product-currency">{`${currency} ${prices}`}</span>
            <Rating rate={rating.rate} reviews={rating.reviews} />
          </Link>
          {show && (
            <div className="product-content-buttons">
              <Button className="add-to-cart" onClick={onClickCart}>
                Add to Cart
              </Button>
              <Button
                className="wish-list"
                size={Button.SIZE.SMALL}
                onClick={onClickWishList}
              >
                <Icon icon="star" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductCard;
