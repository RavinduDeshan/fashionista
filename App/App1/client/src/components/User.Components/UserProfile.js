import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTabPane,
    MDBTabContent,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
} from 'mdbreact';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import './index.css';

import 'bootstrap-css-only/css/bootstrap.min.css'; 
    import    'mdbreact/dist/css/mdb.css';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            phone: '',
            userid: localStorage.getItem("userid"),
            userList: [],
            idEdit:'',
            nameEdit: '',
            addressEdit:'',
            emailEdit:'',
            usernameEdit:'',
            passwordEdit:'',
            confirmPasswordEdit:'',
            phoneEdit:'',
            modal: false,
            items: {
                default: "1",
            }
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone= this.onChangePhone.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.updateUserProfile = this.updateUserProfile.bind(this);
        this.deleteUserAccount = this.deleteUserAccount.bind(this);



    };

    componentDidMount() {
        this.getUserDetails();

    }

    onChangeName(event){
        this.setState({
            nameEdit: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangeAddress(event){
        this.setState({
            addressEdit: event.target.value,
            [event.target.name]: event.target.value

        })

    }

    onChangeEmail(event){
        this.setState({
            emailEdit: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangePhone(event){
        this.setState({
            phoneEdit: event.target.value,
            [event.target.name]: event.target.value

        })
    }


    //load user details to page
    getUserDetails() {
        console.log("----------------------------");

        axios.get('http://localhost:4000/users/' + this.state.userid)
            .then(response => {
                console.log(response.data.name);
                this.setState({
                    userList : response.data,
                    nameEdit : response.data.name,
                    addressEdit: response.data.address,
                    emailEdit: response.data.email,
                    phoneEdit: response.data.phone,
                    idEdit:response.data._id,
                    usernameEdit:response.data.username,
                    passwordEdit:response.data.password,



                })

                console.log(this.state.userList);

            }).catch(function (error) {
            console.log(error);

        })
    }


    //update user profile

    updateUserProfile(idEdit,nameEdit,addressEdit,emailEdit,usernameEdit,passwordEdit,phoneEdit) {

        if (this.state.nameEdit !== '') {
            if (this.state.addressEdit !== '') {
                if (this.state.emailEdit !== '') {
                    if (this.state.phoneEdit !== '') {

                        console.log("**" + idEdit );
                        console.log("**" + nameEdit);
                        console.log("**" + addressEdit);
                        console.log("**" + emailEdit);
                        console.log("**" + usernameEdit);
                        console.log("**" + passwordEdit );
                        console.log("**" + phoneEdit);

                        axios.get('http://localhost:4000/users/update/'+ this.state.idEdit+'/'+ this.state.nameEdit+'/'+ this.state.addressEdit+'/'+
                            this.state.emailEdit  +'/'+ this.state.usernameEdit +'/'+ this.state.passwordEdit +'/' + this.state.phoneEdit)
                            .then(response => {
                                    console.log(response);
                                    if (response.data.userUpdate === 'successful') {
                                        Swal.fire(
                                            '',
                                            'User Details updated successfully !.',
                                            'success'
                                        );
                                        this.getUserDetails();
                                        this.setState({
                                            idEdit:'',
                                            nameEdit:'',
                                            addressEdit:'',
                                            emailEdit:'',
                                            usernameEdit:'',
                                            passwordEdit:'',
                                            confirmPasswordEdit:'',
                                            phoneEdit:''
                                        })
                                    } else {
                                        Swal.fire(
                                            '',
                                            'Update of Details failed !',
                                            'error'
                                        )
                                    }
                                }
                            );

                    } else {
                        console.log("phone number is empty");
                    }
                } else {
                    console.log("email empty");
                }
            } else {
                console.log("address empty");
            }
        } else {
            console.log("name empty");

        }
    }


    deleteUserAccount(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                axios.get('http://localhost:4000/users/delete/' + id).then(response => {
                    if (response.data.userDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Delete Failed Error.',
                            'error'
                        )
                    } else {
                        Swal.fire(
                            '',
                            'User Profile Deleted Successfully !',
                            'success'
                        )
                        console.log("deleted profile called");
                        localStorage.removeItem('UserSignedIn');
                        localStorage.removeItem('userid');
                        this.props.history.push('/login');
                        window.location.reload();
                        console.log("directed to login page");
                    }
                })

                    }  else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your account is safe :)',
                        'error'
                    )
                }
            })

            }




    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    togglePills = (type, tab) => e => {
        e.preventDefault();
        if (this.state.items[type] !== tab) {
            let items = {...this.state.items};
            items[type] = tab;
            this.setState({
                items
            });
        }
    };

    render() {
        return (

            <Router>
                <Navbar />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
               <div>
                   <MDBCard>
                       <MDBCardBody cascade className="text-center" >
                           <h2 className="font-weight-bold h2col">USER PROFILE</h2>
                           <h2 className="font-weight-bold h2col">{this.state.userList.name}</h2>
                               <MDBBtn className="btn-fb waves-light" color="mdb-color" a href="/home">
                                   Home
                               </MDBBtn>
                               <MDBBtn className="btn-fb waves-light" color="mdb-color" a href="/logout">
                                   Logout
                               </MDBBtn>

                       </MDBCardBody>
                   </MDBCard>
               </div>



                <MDBCol md="12">
                    <MDBContainer className="mt-5">
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBNav className="mt-5 nav-pills">
                                    <MDBNavItem>
                                        <MDBNavLink link to="#" active={this.state.items["default"] === "1"}
                                                    onClick={this.togglePills("default", "1")}>
                                            USER PROFILE
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink link to="#" active={this.state.items["default"] === "2"}
                                                    onClick={this.togglePills("default", "2")}>
                                            EDIT PROFILE
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </MDBNav>
                                <MDBTabContent activeItem={this.state.items["default"]}>
                                    <MDBTabPane tabId="1">
                                        <p>
                                            <MDBContainer className="mt-5">


                                                {/*view user profile*/}

                                                <section className="my-5">
                                                    <MDBRow>
                                                        <MDBCol lg="5" className="text-center text-lg-left">
                                                            <img className="img-fluid"
                                                                 src="https://www.thespruce.com/thmb/W4mKoo6FGlcDtxc_Xhu5zRigSx8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/twenty20_02ca2991-5a89-4878-bf45-afd5edc6bdf9-594828ba5f9b58d58acb8579-5c0eaf8ac9e77c000147d2dc.jpg"
                                                                 alt=""/>
                                                            <br/>
                                                            <br/>
                                                            <MDBBtn className="btn-fb waves-light" color="danger" onClick={() => this.deleteUserAccount(this.state.userList._id)}>
                                                                Delete Profile
                                                            </MDBBtn>
                                                        </MDBCol>
                                                        <MDBCol lg="7">
                                                            <MDBRow className="mb-3">
                                                                <MDBCol size="1">
                                                                    <MDBIcon icon="user" size="lg" className="indigo-text"/>
                                                                </MDBCol>
                                                                <MDBCol xl="10" md="11" size="10">
                                                                    <h5 className="font-weight-bold mb-3">Name</h5>
                                                                    <p className="grey-text">
                                                                        {this.state.userList.name}
                                                                    </p>
                                                                </MDBCol>
                                                            </MDBRow>

                                                            <MDBRow className="mb-3">
                                                                <MDBCol size="1">
                                                                    <MDBIcon icon="user" size="lg" className="indigo-text"/>
                                                                </MDBCol>
                                                                <MDBCol xl="10" md="11" size="10">
                                                                    <h5 className="font-weight-bold mb-3">Address</h5>
                                                                    <p className="grey-text">
                                                                        {this.state.userList.address}
                                                                    </p>

                                                                </MDBCol>
                                                            </MDBRow>
                                                            <MDBRow className="mb-3">
                                                                <MDBCol size="1">
                                                                    <MDBIcon icon="user" size="lg" className="indigo-text"/>
                                                                </MDBCol>
                                                                <MDBCol xl="10" md="11" size="10">
                                                                    <h5 className="font-weight-bold mb-3">Email Address</h5>
                                                                    <p className="grey-text">
                                                                        {this.state.userList.email}
                                                                    </p>
                                                                </MDBCol>
                                                            </MDBRow>
                                                            <MDBRow className="mb-3">
                                                                <MDBCol size="1">
                                                                    <MDBIcon icon="user" size="lg" className="indigo-text"/>
                                                                </MDBCol>
                                                                <MDBCol xl="10" md="11" size="10">
                                                                    <h5 className="font-weight-bold mb-3">Phone</h5>
                                                                    <p className="grey-text">
                                                                        {this.state.userList.phone}
                                                                    </p>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </section>


                                                {/*})*/}

                                            </MDBContainer>
                                        </p>
                                    </MDBTabPane>

                                    {/*tab 2*/}
                                    <MDBTabPane tabId="2">
                                        <p>
                                            <MDBContainer className="mt-5">
                                                <section className="my-5">
                                                    <MDBRow>
                                                        <MDBCol lg="5" className="text-center text-lg-left">
                                                            <img className="img-fluid"
                                                                 src="https://www.thespruce.com/thmb/W4mKoo6FGlcDtxc_Xhu5zRigSx8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/twenty20_02ca2991-5a89-4878-bf45-afd5edc6bdf9-594828ba5f9b58d58acb8579-5c0eaf8ac9e77c000147d2dc.jpg"
                                                                 alt=""/>
                                                            <br/>
                                                            <br/>
                                                            {/*<MDBBtn color="info" type="submit">Update Profile</MDBBtn>*/}
                                                        </MDBCol>
                                                        <MDBCol lg="7">
                                                            {/*<form onSubmit={this.updateUserProfile(this.state.editedId,this.state.editedName,this.state.editedAddress,*/}
                                                            {/*    this.state.editedEmail.this.state.editedUsername,this.state.editedPassword,this.state.editedConfirmPassword,*/}
                                                            {/*    this.state.editedPhone)}>*/}
                                                            <form>
                                                                <MDBRow className="mb-3">
                                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text" >
                                                                        Name
                                                                    </label>
                                                                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.nameEdit}
                                                                           onChange={this.onChangeName} name="name"/>
                                                                    <br/>
                                                                </MDBRow>
                                                                <MDBRow className="mb-3">
                                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                                        Address
                                                                    </label>
                                                                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.addressEdit}
                                                                           onChange={this.onChangeAddress}  name="address"/>
                                                                    <br/>
                                                                </MDBRow>
                                                                <MDBRow className="mb-3">
                                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                                        Email Address
                                                                    </label>
                                                                    <input type="email" id="defaultFormRegisterNameEx" className="form-control" value={this.state.emailEdit}
                                                                           onChange={this.onChangeEmail}  name="email"/>
                                                                    <br/>
                                                                </MDBRow>
                                                                <MDBRow className="mb-3">
                                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                                        Phone
                                                                    </label>
                                                                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.phoneEdit}
                                                                           onChange={this.onChangePhone} name="phone"/>
                                                                    <br/>
                                                                </MDBRow>


                                                                <MDBBtn color="info" type="button" onClick={()=> this.updateUserProfile(this.state.idEdit,this.state.nameEdit,this.state.addressEdit,
                                                                    this.state.emailEdit,this.state.usernameEdit,this.state.passwordEdit,this.state.phoneEdit)}> Update Profile</MDBBtn>



                                                            </form>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </section>
                                            </MDBContainer>
                                        </p>
                                    </MDBTabPane>
                                </MDBTabContent>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>

            </Router>

        );

    }



};
