import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './assets/logo.png';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        const bgPink = {backgroundColor: '#6495ED'}
        const container = {height: 1300}
        return(
            <div>
                <Router>
                    <header>
                        <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
                            <MDBNavbarBrand left >
                                <img src = {logo}/>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={ this.onClick } />
                            <MDBCollapse isOpen = { this.state.collapse } navbar>
                            </MDBCollapse>
                        </MDBNavbar>
                    </header>
                </Router>
            </div>
        );
    }
}

export default Navbar;