// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import Icon from "components/icon";

type StarProps = {
  isFilled: boolean,
  isHalf: boolean
};

class Star extends PureComponent<StarProps> {
  render() {
    const { isFilled, isHalf } = this.props;
    return (
      <div
        className={classNames(
          "rate-star",
          {
            "rate-star-full": isFilled && !isHalf
          },
          {
            "rate-star-half": isFilled && isHalf
          }
        )}
      >
        <div className="unfilled-star">
          <Icon icon="star" />
        </div>
        <div className="filled-star">
          <Icon icon="star" />
        </div>
      </div>
    );
  }
}

export default Star;
