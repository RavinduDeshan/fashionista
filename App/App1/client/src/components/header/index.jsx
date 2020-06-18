// @flow
import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import Link from "components/Link";
import buyportLogo from "assets/image/logo.png";
import Input from "components/Input";
import Button from "components/button";

import { authSignOut } from "action/auth";
import { ASYNC_STATUS } from "constants/async";
import { handleCart } from "action/cart";

import "./styles.scss";
import Icon from "components/icon";


type HeaderProps = {
  isAuthenticated: Boolean,
  toggleAuth: Function,
  displayAuth: boolean,
  user: Object,
  status: AsyncStatusType,
  authSignOut: Function,
  userName: string,
  searchable?: boolean,
  handleCart: Function,
};

type HeaderState = {
  isSignUpClicked: Boolean,
  isSignInClicked: Boolean,
  searchProduct: Boolean,
  searchText: string,
};

class Header extends PureComponent<HeaderProps, HeaderState> {
  static defaultProps = {
    searchable: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      isSignUpClicked: false,
      isSignInClicked: false,
      searchProduct: false,
      searchText: "",
    };
    //$FlowFixMe
    this.handleSingUpButtonClick = this.handleSingUpButtonClick.bind(this);
    //$FlowFixMe
    this.handleSignInButtonClick = this.handleSignInButtonClick.bind(this);
    //$FlowFixMe
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    //$FlowFixMe
    this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
  }

  handleSignInButtonClick() {
    this.setState({
      ...this.state,
      isSignInClicked: !this.state.isSignInClicked,
    });
  }

  handleSingUpButtonClick() {
    this.setState({
      ...this.state,
      isSignUpClicked: !this.state.isSignUpClicked,
    });
  }

  onSearchTextChange(field) {
    this.setState({
      ...this.state,
      ...field,
    });
  }

  onEnterKeyPress(event) {
    if (event.key === "Enter") {
      this.setState({
        ...this.state,
        searchProduct: !this.state.searchProduct,
      });
    }
  }

  render() {
    const {
      isAuthenticated,
      status,
      isAuthSuccess,
      searchable,
      handleCart,
    } = this.props;
    const {
      isSignUpClicked,
      isSignInClicked,
      searchProduct,
      searchText,
    } = this.state;

    if (isSignUpClicked) {
      return <Redirect to="/signup" />;
    }

    if (isSignInClicked) {
      return <Redirect to="/signin" />;
    }

    if (searchProduct) {
      if (isAuthenticated) {
        return <Redirect to={`/auth/product/search/${searchText}`} />;
      } else {
        return <Redirect to={`/product/search/${searchText}`} />;
      }
    }

    return (
      <Fragment>
        <div className="header">
          <div className="container">
            <Link to="">
              <div className="site-logo">
                <img src={buyportLogo} alt="Buyport Logo" />
              </div>
            </Link>

            {searchable && (
              <div className="search-bar">
                <Input
                  id="searchBar"
                  text={searchText}
                  onChange={(searchText) =>
                    this.onSearchTextChange({ searchText })
                  }
                  onKeyPress={this.onEnterKeyPress}
                  placeholder="search for any thing"
                />
              </div>
            )}
            <div className="main-button-container">
              {isAuthenticated || isAuthSuccess ? (
                <Fragment></Fragment>
              ) : (
                <Fragment>
                  <div className="btn-wrapper">
                    <div className="wishlist-wrapper">
                      <Button htmlType={Button.HTML_TYPE.LINK} link="/wishlist">
                        My Wishlist
                      </Button>
                    </div>
                    <div className="cart-wrapper">
                      <Icon icon="cart" onClick={handleCart} />
                    </div>
                    <div className="wishlist-wrapper" hidden={localStorage.getItem("userid")?false:true}>
                      <Button htmlType={Button.HTML_TYPE.LINK} link="/logout">
                        Log Out
                      </Button>
                    </div>
                    <div className="auth-button" hidden={localStorage.getItem("userid")?true:false} >
                      <Button
                        loading={status === ASYNC_STATUS.LOADING}
                        onClick={this.handleSignInButtonClick}
                        htmlType={Button.HTML_TYPE.LINK}
                        link="/signin">
                        Sign In
                      </Button>
                    </div>
                    <div className="auth-button" hidden={localStorage.getItem("userid")?true:false}>
                      <Button
                        loading={status === ASYNC_STATUS.LOADING}
                        onClick={this.handleSingUpButtonClick}
                        htmlType={Button.HTML_TYPE.LINK}
                        link="/signup" >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Fragment>


    );
  }
}

function mapStateToProps(state) {
  return {
    errors: null,
    isAuthSuccess: false,
    isAuthenticated: false,
    user: {},
    status: ASYNC_STATUS.INIT,
    userName: "user",
  };
}

const Actions = { authSignOut, handleCart };

export default connect(mapStateToProps, Actions)(Header);
