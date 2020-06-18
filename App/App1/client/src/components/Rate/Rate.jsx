// @flow
import React, { PureComponent } from "react";

import classNames from "classnames";
import Star from "./Star";

import "./styles.scss";

const SIZE = {
  SMALL: "rate-small",
  MEDIUM: "rate-medium",
  LARGE: "rate-large"
};

type RateProps = {
  value: number,
  size: typeof SIZE.SMALL | typeof SIZE.MEDIUM | typeof SIZE.LARGE
};

class Rate extends PureComponent<RateProps> {
  static SIZE = SIZE;
  static defaultProps = {
    value: 0,
    size: Rate.SIZE.MEDIUM
  };
  render() {
    const stars = [];
    const { value, size } = this.props;
    for (let index = 1; index <= 5; index++) {
      stars.push(<Star key={index} isFilled={index <= value} isHalf={false} />);
    }
    return <div className={classNames("star-rate", `${size}`)}>{stars}</div>;
  }
}

export default Rate;
