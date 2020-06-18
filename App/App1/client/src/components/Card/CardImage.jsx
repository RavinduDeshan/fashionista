// @flow
import type { Element } from "react";
import React, { PureComponent } from "react";

type CardImageProps = {
  image: string,
  children: | Array<Element<any> | string | typeof undefined>
    | Element<any>
    | string
    | typeof undefined
};

class CardImage extends PureComponent<CardImageProps> {
  render() {
    const { image, children } = this.props;
    return (
      <div
        className="card-image"
        style={{
          background: `linear-gradient(
                      rgba(0, 0, 0, 0.1),
                      rgba(0, 0, 0, 0.6)
                      )
                      , center / cover no-repeat url(${image})`
        }}
      >
        <div className="card-image-content">{children}</div>
      </div>
    );
  }
}

export default CardImage;
