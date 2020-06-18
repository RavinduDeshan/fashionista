// @flow
import React, { PureComponent } from "react";
import { Link, withRouter, location } from "react-router-dom";
import classNames from "classnames";

import "./styles.scss";

type SidebarProps = {
  location: location
};
class Sidebar extends PureComponent<SidebarProps> {
  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <div className="side-bar-container">
        <div className="side-bar-header">Shortcuts</div>
        <div className="menu">
          <div
            className={classNames("menu-content", {
              active: pathname === "/profile/myAccount"
            })}
          >
            <Link className="title" to="/profile/myAccount">
              <span>My Account</span>
            </Link>
          </div>
          <div
            className={classNames("menu-content", {
              active: pathname === "/profile/billingDetails"
            })}
          >
            <Link className="title" to="/profile/billingDetails">
              <span>Billing Details</span>
            </Link>
          </div>
          <div
            className={classNames("menu-content", {
              active: pathname === "/profile/orders"
            })}
          >
            <Link className="title" to="/profile/orders">
              <span>My Orders</span>
            </Link>
          </div>
          <div
            className={classNames("menu-content", {
              active: pathname === "/profile/wishList"
            })}
          >
            <Link className="title" to="/profile/wishList">
              <span>Wish List</span>
            </Link>
          </div>
          <div
            className={classNames("menu-content", {
              active: pathname === "/"
            })}
          >
            <Link className="title" to="/">
              <span>Change Password</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
