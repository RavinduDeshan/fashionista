import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBAlert
} from 'mdbreact';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import './css/ContactFormPage.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Navbar from "./Navbar";
import './index.css';

import 'bootstrap-css-only/css/bootstrap.min.css'; 
    import    'mdbreact/dist/css/mdb.css';

  

class UserSignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            phone: '',
            collapseID: '',
            namevalidation: false,
            addressvalidation: false,
            emailvalidation: false,
            usernamevalidation: false,
            passwordvalidation: false,
            phonevalidation: false


        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeConfirmPaswword = this.onChangeConfirmPaswword.bind(this);
        this.onChangePhone= this.onChangePhone.bind(this);
        this.registerUser= this.registerUser.bind(this);

    }



    onChangeName(event){
        this.setState({
            name: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangeAddress(event){
        this.setState({
            addresss: event.target.value,
            [event.target.name]: event.target.value

        })

    }

    onChangeEmail(event){
        this.setState({
            email: event.target.value,
            [event.target.name]: event.target.value

        })
    }


    onChangeUsername(event){
        this.setState({
            username: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangePassword(event){
        this.setState({
            password: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangeConfirmPaswword(event){
        this.setState({
            confirmPassword: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangePhone(event){
        this.setState({
            phone: event.target.value,
            [event.target.name]: event.target.value

        })
    }


    registerUser(event){
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword){
            if(this.state.name !== ''){
                this.setState({
                    namevalidation: false
                })
                if(this.state.address !== '') {
                    this.setState({
                        addressvalidation: false
                    })
                    if (this.state.email !== '') {
                        this.setState({
                            emailvalidation: false
                        })
                        if (this.state.username !== '') {
                            this.setState({
                                usernamevalidation: false
                            })
                            if (this.state.password !== '') {
                                this.setState({
                                    passwordvalidation: false
                                })
                                if (this.state.confirmPassword !== '') {
                                    if(this.state.phone !== '') {
                                        this.setState({
                                            phonevalidation: false
                                        })


                                        console.log("Validation complete");

                                        const newUser = {
                                            name: this.state.name,
                                            address: this.state.address,
                                            email: this.state.email,
                                            username: this.state.username,
                                            password: this.state.password,
                                            phone: this.state.phone,
                                        }
                                        axios.post('http://localhost:4000/users/add', newUser)
                                            .then(res => {
                                                    console.log(res)
                                                    console.log(newUser);
                                                    if (res.data.Message === 'successful') {
                                                        Swal.fire(
                                                            '',
                                                            'User Details added successfully !.',
                                                            'success'
                                                        );
                                                        this.props.history.push('/signin');
                                                        window.location.reload();
                                                        this.setState({
                                                            name: '',
                                                            address: '',
                                                            email: '',
                                                            username: '',
                                                            password: '',
                                                            confirmPassword: '',
                                                            phone: '',
                                                            collapseID: '',
                                                            namevalidation: false,
                                                            addressvalidation: false,
                                                            emailvalidation: false,
                                                            usernamevalidation: false,
                                                            passwordvalidation: false,
                                                            phonevalidation: false                                  })
                                                    } else {
                                                        Swal.fire(
                                                            '',
                                                            'User Details not added !',
                                                            'error'
                                                        )
                                                    }
                                                }
                                            );

                                    } else {
                                        console.log("phone number is empty");
                                        this.setState({
                                            phonevalidation: true
                                        })
                                    }
                                } else {
                                    console.log(" confirm password is empty");
                                }
                            } else {
                                console.log("password id empty");
                                this.setState({
                                    passwordvalidation: true
                                })
                            }
                        } else {
                            console.log("username empty");
                            this.setState({
                                usernamevalidation: true
                            })
                        }
                    } else {
                        console.log("email empty");
                        this.setState({
                            emailvalidation: true
                        })
                    }
                }else{console.log("address empty");
                    this.setState({
                        addressvalidation : true
                    })
                }
            }else{console.log("name empty");
                this.setState({
                    namevalidation : true
                })
            }
        }else{console.log("password != confirmPassword");
            Swal.fire(
                '',
                'password and confirm password field are not the same !',
                'error'
            );
        }
    };



    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    componentWillUnmount()
    {
        document.querySelector('nav').style.height = 'auto';
    }

    render()
    {
        const {collapseID} = this.state;
        const navStyle = {marginTop: '65px'};
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{backgroundColor: 'transparent'}}
                onClick={this.toggleCollapse('navbarCollapse')}
            />
        );
        return (
            <div id='contactformpage'>

<header>

<link rel="stylesheet" href="./css/AppPages.css" />
<link rel="stylesheet" href="./css/CallToActionIntro.css" />
<link rel="stylesheet" href="./css/ContactFormPage.css" />



</header>

                <Router>
                    <div>
                        {collapseID && overlay}
                        <Navbar/>
                    </div>
                </Router>

                <MDBView>
                    <MDBMask overlay='indigo-strong'/>
                    <MDBContainer
                        style={{height: '100%', width: '100%', paddingTop: '10rem'}}
                        className='d-flex justify-content-center align-items-center'
                    >
                        <MDBRow>
                            <div className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'>
                                <h1 className='display-4 font-weight-bold'> Sign Up Right Now!</h1>
                                <hr className='hr-light'/>
                                <h6 className='mb-4'>
                                    Sign up to purchase a wide range of your desired clothes
                                    and accessories on reasonable prices and attractive discounts
                                </h6>
                                <MDBBtn className="btn-fb waves-light" color="default" a href="/">
                                    Home
                                </MDBBtn>
                            </div>
                            <MDBCol md='6' xl='5' className='mb-4'>
                                <MDBCard className='dark-grey-text'>
                                    <MDBCardBody className='z-depth-2'>
                                        <form onSubmit={this.registerUser}>
                                            <h3 className='dark-grey-text text-center'>
                                                <strong>Register</strong>
                                            </h3>
                                            <hr/>
                                            <MDBInput label='Name' icon='user' onChange={this.onChangeName} value={this.state.name} name="name" type="text"/>
                                            {
                                                this.state.namevalidation ? <MDBAlert color="danger">
                                                    name is empty
                                                </MDBAlert> : ''
                                            }
                                            <MDBInput label='Address' icon='user' onChange={this.onChangeAddress} value={this.state.address} name="address" type="text"/>
                                            {
                                                this.state. addressvalidation ? <MDBAlert color="danger">
                                                    address is empty
                                                </MDBAlert> : ''
                                            }
                                            <MDBInput label='Email' icon='user' onChange={this.onChangeEmail} value={this.state.email} name="email" type="email"/>
                                            {
                                                this.state.emailvalidation ? <MDBAlert color="danger">
                                                    email is empty
                                                </MDBAlert> : ''
                                            }

                                            <MDBInput label='Username' icon='user' onChange={this.onChangeUsername} value={this.state.username} name="username" type="text"/>
                                            {
                                                this.state.usernamevalidation ? <MDBAlert color="danger">
                                                    username is empty
                                                </MDBAlert> : ''
                                            }
                                            <MDBInput label='Password' icon='user' onChange={this.onChangePassword} value={this.state.password} name="password" type="password"/>
                                            {
                                                this.state.passwordvalidation  ?
                                                    <MDBAlert color="danger">
                                                        password is empty
                                                    </MDBAlert> : ''
                                            }
                                            <MDBInput label='Confirm Password' icon='user' onChange={this.onChangeConfirmPaswword} value={this.state.confirmPassword} name="confirmPassword" type="password"/>
                                            {
                                                this.state.password !== this.state.confirmPassword ? <MDBAlert color="danger">
                                                    password and confirm password does not match
                                                </MDBAlert> : ''
                                            }
                                            <MDBInput label='Phone' icon='user' onChange={this.onChangePhone} value={this.state.phone} name="phone" type="text"/>
                                            {
                                                this.state.phonevalidation ?
                                                    <MDBAlert color="danger">
                                                        phone is empty
                                                    </MDBAlert> : ''
                                            }
                                            <div className='text-center mt-3 black-text'>
                                                <MDBBtn color='indigo' type="submit" >Submit</MDBBtn>
                                            </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </MDBView>
            </div>
        );
    }
}

export default UserSignUp;
