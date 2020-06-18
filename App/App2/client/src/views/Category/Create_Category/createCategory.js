// index.component.js
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardContent } from '@material-ui/core';

export default class CreateCategory extends Component {

  constructor(props) {
    super(props);

    //Bind
    this.delete                       = this.delete.bind(this);
    this.onChangeCategoryName         = this.onChangeCategoryName.bind(this);
    this.onChangeCategoryDescription  = this.onChangeCategoryDescription.bind(this);
    this.handleChecked                = this.handleChecked.bind(this);
    this.onSubmit                     = this.onSubmit.bind(this);
    this.resetForm                    = this.resetForm.bind(this);


    this.state = {
      category_name: '',
      is_active: false,
      category_description: '',
      all_categories: [],
      UpdateId: null,
      buttonName: 'Add New Category',
      buttonChecked: ''
    }

    //Set document title
    document.title = 'Categories';
    this.validateSession();
    this.token = localStorage.getItem('admin_token');
  }



  /**Define methods*/
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
      buttonName: 'Add New Category',
      category_name: '',
      is_active: 0,
      category_description: '',
      buttonChecked: '',
      UpdateId : null
    });
    //window.location.reload(false);
  }


  //Get category name
  onChangeCategoryName(e) {
    this.setState({
      category_name: e.target.value
    });
  }

  //Get active status
  handleChecked() {
    if (this.state.is_active === true) {
      this.setState({
        is_active: false,
        buttonChecked: ''
      });
    } else {
      this.setState({
        is_active: true,

        buttonChecked: 'checked'
      });
    }
  }

  //Get description
  onChangeCategoryDescription(e) {
    this.setState({
      category_description: e.target.value
    });
  }


  //Form submit insert / update
  onSubmit(e) {
    e.preventDefault();

    if (this.state.category_name !== '' ) {
      const obj = {
        category_name: this.state.category_name,
        category_description: this.state.category_description,
        is_active: this.state.is_active !== null ? this.state.is_active : 0
      };

      if (this.state.UpdateId == null) {

        let insertCat = async () => {

          let response = await axios.post('http://localhost:4000/Category/add', obj, {
            headers:
            {
              admin_token: this.token
            }
          });
          if (response.data) {
            alert(response.data['message']);
            this.setState({
              category_name: '',
              is_active: 0,
              category_description: '',
              buttonChecked: ''
            });
            this.componentDidMount();
          }

        }
        insertCat();

      }else {

        let updateCat = async () => {
          let response = await axios.post('http://localhost:4000/Category/update/' + this.state.UpdateId, obj, {
            headers:
            {
              admin_token: this.token
            }
          });

          if (response.data) {
            alert(response.data['message']);
            this.setState({
              category_name: '',
              is_active: 0,
              category_description: '',
              buttonChecked: '',
              buttonName: 'Add New Category',
              UpdateId: null
            });
            this.componentDidMount();
          }
        }
        updateCat();
      }

    } else {
      alert('You must enter category name')
    }

  }

  //Get categories from db and display
  componentDidMount() {
    console.log(this.token)
    axios.get('http://localhost:4000/Category/admin', {
      headers:
      {
        admin_token: this.token
      }
    })
      .then(response => {
        console.log(response.data['msg']);
        this.setState({ all_categories: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  //Delete category
  delete(id) {

    let del = async () => {
      let response = await axios.get('http://localhost:4000/Category/delete/' + id, {
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

    del();
  
    
  }

  //Load category to form : to edit
  GetCategoryById(id) {

    this.setState({
      UpdateId : id
    });

    axios.get('http://localhost:4000/Category/edit/' + id, {
      headers:
      {
        admin_token: this.token
      }
    })
      .then(response => {
        this.setState({
          category_name: response.data.category_name,
          category_description: response.data.category_description,
          is_active: response.data.is_active,
        });

        if (response.data.is_active === 1) {
          this.setState({
            is_active : true,
            buttonChecked : 'checked'
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
      buttonName : 'Update Category'
    });
  }

  render() {
    return (
      <div>
        <Card>
          <h1 className="text-center mb-0 pt-5">Product Categories</h1>
          <hr />
          <CardContent>

            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                <Form onSubmit={this.onSubmit}>

                  <h4>Add New Category</h4>

                  <Form.Group controlId="categoryName">
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control
                      onChange={this.onChangeCategoryName}
                      placeholder="Enter Category Name"
                      type="text"
                      value={this.state.category_name}
                    />
                  </Form.Group>

                  <Form.Group controlId="categoryDescription">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                      onChange={this.onChangeCategoryDescription}
                      placeholder="Enter Description"
                      type="text"
                      value={this.state.category_description}
                    />
                  </Form.Group>

                  <Form.Group controlId="categoryStatus">
                    <Form.Check
                      checked={this.state.buttonChecked}
                      label="Category Status Active/In-active"
                      onChange={this.handleChecked}
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
          <h4 className="mb-0 pl-5 ml-1 mt-3 mb-3">All Categories</h4>

          <div
            className="p-2"
            style={{ overflow: 'auto' }}
          >
            <table className="table w-100 table-striped mx-auto">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th className="text-center">Is Active</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>

                {this.state.all_categories.map((item, index) => (

                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{item.category_description}</td>
                    <td>{item.is_active === 1 ? <span className="text-success">Active</span> : <span className="text-danger">Deactivated</span>}</td>
                    <td className="text-center">
                      <div
                        className="btn-group btn-group-sm"
                        role="group"
                      >
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={(e) => { this.GetCategoryById(item._id) }}
                          type="button"
                        >Edit</button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => { this.delete(item._id) }}
                          type="button"
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}



              </tbody>
            </table>

          </div>

        </Card>

      </div>
    );


  }

}

