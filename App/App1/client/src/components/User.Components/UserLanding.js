import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,

} from 'mdbreact';
import './css/CallToActionIntro.css';
import Navbar from './Navbar';

class Landing extends React.Component {
    state = {
        collapsed: false
    };

    handleTogglerClick = () => {
        const { collapsed } = this.state;
        this.setState({
            collapsed: !collapsed
        });
    };

    render() {
        const { collapsed } = this.state;
        const navStyle = { marginTop: '4rem' };
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{ backgroundColor: 'transparent' }}
                onClick={this.handleTogglerClick}
            />
        );
        return (
            <Router>
                <div id='caltoaction'>
                    <Navbar/>
                    <MDBView src='https://img4.goodfon.com/wallpaper/nbig/0/b9/odezhda-veshalki-futbolki.jpg'>
                        <MDBMask className='rgba-purple-slight ' />
                        <MDBContainer
                            style={{ height: '100%', width: '100%', paddingTop: '14rem' }}
                            className='d-flex justify-content-center align-items-center'
                        >
                            <MDBRow>
                                <MDBCol md='12' className='mb-4 text-center'>
                                    <h1 className='display-4 font-weight-bold mb-0 pt-md-5 pt-5'>
                                        Welcome to Fashionista!
                                    </h1>
                                    <h5 className='pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5'>
                                        Check the latest products for fashion here!
                                    </h5>

                                        <MDBBtn color="primary" a href="/login">Sign In</MDBBtn>
                                        <MDBBtn color="primary"  a href="/register">Sign Up</MDBBtn>

                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBView>
                </div>
            </Router>
        );
    }
}

export default Landing;