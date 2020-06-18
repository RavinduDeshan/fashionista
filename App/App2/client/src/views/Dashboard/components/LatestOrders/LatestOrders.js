//User
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardContent } from '@material-ui/core';

export default class Users extends Component {

  constructor(props) {
    super(props);


    this.state = {
      all_users : []
    }

    document.title = 'Users';
    this.validateSession();
  }


  validateSession() {
    let auth = async () => {
      let response = await axios.get('http://localhost:4000/auth');
      if (response.data !== true) {
        window.location.replace('/sign-in');
      }
    }

    auth();
  }

  //Get all users for display
  componentDidMount() {

    try {
      axios.get('http://localhost:4000/users')
        .then(response => {
          this.setState({ all_users: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (err) {
      console.log(err)
    }

  }

  render() {
    return (<div>

      <Card className="mt-1">
        <h4 className="mb-0 pl-5 ml-1 mt-3 mb-3">Registered Users</h4>

        <div
          className="p-2"
          style={{ overflow: 'auto' }}
        >
          <table className="table w-100 table-striped mx-auto">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th>User</th>
                <th>Phone</th>
                <th>UserName</th>
                <th>PassWord</th>

              </tr>
            </thead>
            <tbody>

              {this.state.all_users.map((item, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </Card>


    </div>);
  }

}
