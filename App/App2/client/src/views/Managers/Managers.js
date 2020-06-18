// Manager
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardContent } from '@material-ui/core';

export default class Managers extends Component {

  constructor(props) {
    super(props);

    //Bind
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeManageruserame = this.onChangeManageruserame.bind(this);
    this.onChangeManagerPassword = this.onChangeManagerPassword.bind(this);
    this.managerChecked = this.managerChecked.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.GetManagerById = this.GetManagerById.bind(this);
    this.onChangeManagerEmail = this.onChangeManagerEmail.bind(this);
    this.deleteManager = this.deleteManager.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.state = {
      manager_username: '',
      manager_password: '',
      manager_email: '',
      is_active: false,
      role: 'manager',
      buttonName: 'Add New Manager',
      buttonChecked: '',
      all_managers: [],
      UpdateId: null
    }

    //Set document title
    document.title = 'Managers';
    this.validateSession();
    this.token = localStorage.getItem('admin_token');
  }

  validateSession() {
    const token = localStorage.getItem('admin_token');
    console.log(token);
    if (token === false || typeof token === "undefined" || token === "" || token == null) {
      this.props.history.push('/sign-In');
    }
  }

  //Form reset
  resetForm() {
    this.setState({
      manager_username: '',
      manager_password: '',
      manager_email: '',
      is_active: false,
      buttonChecked: '',
      buttonName: 'Add New Category',
      UpdateId: null
    });
    this.UpdateId = null;
  }

  //Get manager username
  onChangeManageruserame(e) {
    this.setState({
      manager_username: e.target.value
    });
  }

  //Get manager email
  onChangeManagerEmail(e) {
    this.setState({
      manager_email: e.target.value
    });
  }

  //Get manager password
  onChangeManagerPassword(e) {
    this.setState({
      manager_password: e.target.value
    });
  }

  //Get active status
  managerChecked() {
    if (this.state.is_active === false) {
      this.setState({
        is_active: true,
        buttonChecked: 'checked'
      });
    } else {
      this.setState({
        is_active: false,
        buttonChecked: ''
      });
    }
  }

  //Get all managers for display
  componentDidMount() {

    try {
      axios.get('http://localhost:4000/managers',)
        .then(response => {
          this.setState({ all_managers: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (err) {
      console.log(err)
    }

  }

  //Form submit insert / update
  onSubmit(e) {
    e.preventDefault();

    const obj = {
      username: this.state.manager_username.toLowerCase(),
      password: this.state.manager_password,
      email: this.state.manager_email.toLowerCase(),
      is_active: this.state.is_active !== null ? this.state.is_active : 0,
      role: this.state.role
    };

    if (this.UpdateId == null) {
      if (this.state.manager_username !== '' && this.state.manager_password !== '' && this.state.manager_email !== '') {

        let insertManager = async () => {
          let response = await axios.post('http://localhost:4000/managers/add', obj,{
            headers:
            {
              admin_token: this.token
            }
          });
          if (response.data) {
            alert(response.data['message']);
            this.componentDidMount();
          }
        }

        this.setState({
          manager_username: '',
          manager_password: '',
          manager_email: '',
          is_active: false,
          buttonChecked: ''
        });

        insertManager();

      } else {
        alert('You must fill all fields');
      }

    } else {

      if (this.state.manager_username !== '' && this.state.manager_email !== '') {

        let updateManager = async () => {

          let response = await axios.post('http://localhost:4000/managers/update/' + this.UpdateId, obj,{
            headers:
            {
              admin_token: this.token
            }
          });
          if (response.data) {
            alert(response.data['message']);
            this.componentDidMount();
          }

          this.setState({
            manager_username: '',
            manager_password: '',
            manager_email: '',
            is_active: false,
            buttonChecked: '',
            buttonName: 'Add New Manager',
          });
          this.UpdateId = null;
        }

        updateManager();

      } else {
        alert('You must fill atleast username');
      }
    }

  }

  //Load manager to form : to edit
  GetManagerById(id) {

    this.UpdateId = id;

    axios.get('http://localhost:4000/managers/edit/' + id,{
      headers:
      {
        admin_token: this.token
      }
    })
        .then(response => {

          this.setState({
            manager_username: response.data.username,
            manager_email: response.data.email,
            is_active: response.data.is_active
          });

          if (response.data.is_active === 1) {
            this.setState({
              is_active: true,
              buttonChecked: 'checked'
            });
          } else {
            this.setState({
              is_active: false,
              buttonChecked: ''
            });
          }

        })
        .catch(function (error) {
          console.log(error);
        })
      this.setState({
          buttonName: 'Update Manager'
      });
  }

  //Delete manager
  //Delete category
  deleteManager(id) {

    let delManager = async () => {
      let response = await axios.get('http://localhost:4000/managers/delete/' + id,{
        headers:
            {
              admin_token: this.token
            }
      });
      if (response.data) {
        alert(response.data['message']);
        this.componentDidMount();
      }
    }

    delManager();
  }


  render() {
    return (<div>
      <Card>
        <h1 className="text-center mb-0 pt-5">Store Managers</h1>
        <hr />
        <CardContent>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-4">
              <Form onSubmit={this.onSubmit} >

                <h4>Add New Managers</h4>

                <Form.Group controlId="managerUsername">
                  <Form.Label>Manager username:</Form.Label>
                  <Form.Control
                    onChange={this.onChangeManageruserame}
                    placeholder="Enter username for manager"
                    type="text"
                    value={this.state.manager_username}
                  />
                </Form.Group>

                <Form.Group controlId="managerPassword">
                  <Form.Label>Manager Password</Form.Label>
                  <Form.Control
                    onChange={this.onChangeManagerPassword}
                    placeholder="Enter Password for Manager"
                    type="text"
                    value={this.state.manager_password}
                  />
                </Form.Group>

                <Form.Group controlId="managerPassword">
                  <Form.Label>Manager Email</Form.Label>
                  <Form.Control
                    onChange={this.onChangeManagerEmail}
                    placeholder="Enter Email for Manager"
                    type="text"
                    value={this.state.manager_email}
                  />
                </Form.Group>

                <Form.Group controlId="categoryStatus">
                  <Form.Check
                    checked={this.state.buttonChecked}
                    label="Manager Status Active/In-active"
                    onChange={this.managerChecked}
                    type="checkbox"
                  />
                </Form.Group>

                <Button
                  className=""
                  type="submit"
                  variant="primary"
                >
                  {this.state.buttonName}
                </Button>

                <button
                  className="btn btn-danger ml-2"
                  onClick={this.resetForm}
                  type="button"
                >
                  Clear
                </button>

              </Form>
            </div>
          </div>

        </CardContent>

      </Card>


      <Card className="mt-1">
        <h4 className="mb-0 pl-5 ml-1 mt-3 mb-3">All Managers</h4>

        <div
          className="p-2"
          style={{ overflow: 'auto' }}
        >
          <table className="table w-100 table-striped mx-auto">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th>Manager Name</th>
                <th>Role</th>
                <th>Email</th>
                <th className="text-center">Is Active</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>

              {this.state.all_managers.map((item, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>{item.email}</td>
                  <td>{item.is_active === 1 ? <span className="text-success">Active</span> : <span className="text-danger">Deactivated</span>}</td>
                  <td className="text-center">
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                    >
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={(e) => { this.GetManagerById(item._id) }}
                        type="button"
                      >Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => { this.deleteManager(item._id) }}
                      >Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </Card>


    </div>);
  }

}
