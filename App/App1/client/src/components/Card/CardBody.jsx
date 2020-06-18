// @flow
import type { Element } from "react";
import React, { PureComponent } from "react";

type CardBodyProps = {
  children: | Array<Element<any> | string | typeof undefined>
    | Element<any>
    | string
    | typeof undefined
};

export default class CardBody extends PureComponent<CardBodyProps> {
  render() {
    return (
      <div className="card-body">
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
