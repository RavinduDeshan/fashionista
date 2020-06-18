// @flow
import React, { PureComponent, Fragment } from "react";

import "./styles.scss";

class Footer extends PureComponent {
  render() {
    return (
      <Fragment>
        <footer>
          <div className="container">
            <div className="data">@All rights reserved</div>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
