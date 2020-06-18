//User
import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default class Users extends Component {

  constructor(props) {
    super(props);


    this.state = {
      all_users : []
    }

    document.title = 'Users';
    this.validateSession();
    this.token = localStorage.getItem('admin_token');
  }


  validateSession() {
    const token = localStorage.getItem('admin_token');
    console.log(token);
    if (token === false || typeof token === "undefined" || token === "" || token ==null) {
      this.props.history.push('/sign-In');
    }
  }

  //Get all users for display
  componentDidMount() {

    try {
      axios.get('http://localhost:4000/users', {
        headers:
        {
          admin_token: this.token
        }
      })
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
        <h1 className="text-center mb-0 pt-5">Registered Users</h1>
        <hr />

        <div
          className="p-2"
          style={{ overflow: 'auto' }}
        >
          <table className="table w-100 table-striped mx-auto">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th>User</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                
              </tr>
            </thead>
            <tbody>

              {this.state.all_users.map((item, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  
                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </Card>


    </div>);
  }

}
