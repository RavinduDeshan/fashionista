// @flow
import React, { PureComponent } from "react";
import classnames from "classnames";

import Rate from "./Rate";

import "./styles.scss";

type RatingProps = {
  rate: number,
  reviews: number,
  size:
    | typeof Rate.SIZE.SMALL
    | typeof Rate.SIZE.MEDIUM
    | typeof Rate.SIZE.LARGE
};
class Rating extends PureComponent<RatingProps> {
  static size = {
    SMALL: Rate.SIZE.SMALL,
    MEDIUM: Rate.SIZE.MEDIUM,
    LARGE: Rate.SIZE.LARGE
  };

  static defaultProps = {
    size: Rating.size.MEDIUM
  };

  render() {
    const { rate, reviews, size } = this.props;
    return (
      <div className={classnames("ratings", size)}>
        <Rate value={rate} size={size} />
        <span>{reviews}</span>
      </div>
    );
  }
}

export default Rating;
