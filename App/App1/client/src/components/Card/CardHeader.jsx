// @flow
import type { Element } from "react";
import React, { PureComponent } from "react";

type CardHeaderProps = {
  children: | Array<Element<any> | string | typeof undefined>
    | Element<any>
    | string
    | typeof undefined
};

export default class CardHeader extends PureComponent<CardHeaderProps> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <div className="card-header" {...rest}>
        {children}
      </div>
    );
  }
}
