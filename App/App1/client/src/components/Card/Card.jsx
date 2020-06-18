// @flow
import type { Element } from "react";

import React, { PureComponent } from "react";
import classNames from "classnames";

import "./styles.scss";

type CardProps = {
  children: | Array<Element<any> | string | typeof undefined>
    | Element<any>
    | string
    | typeof undefined,
  className: string
};

class Card extends PureComponent<CardProps> {
  render() {
    const { children, className } = this.props;
    return <div className={classNames("card", className)}>{children}</div>;
  }
}

export default Card;
