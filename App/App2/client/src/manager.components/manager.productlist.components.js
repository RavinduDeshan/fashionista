import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './manager.navbar.components';
import Title from './manager.title.components';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'



// calculate average rating per product

function getAvgRating(ratings) {
  const total = ratings.reduce((acc, c) => acc + c, 0);
  if (total) {

    const output = parseFloat(total / ratings.length).toFixed(2);


    return output;

  } else
    return 0;

}


//calculate total products

function getTotProducts(items) {

  var total = 0;

  for (let index = 0; index < items.length; index++) {
    total = total + items[index].quantity;

  }






  if (total) {



    return total;

  } else
    return 0;

}

// calculate total revenue


function getTotRevenue(items) {

  var total = 0;

  for (let index = 0; index < items.length; index++) {
    total = total + items[index].totalPrice;

  }






  if (total) {



    return total;

  } else
    return 0;

}

// search tables 

function searchItems(item) {

  return function (e) {
    return e.productCode.toLowerCase().includes(item.toLowerCase())
      || e.productName.toLowerCase().includes(item.toLowerCase()) ||
      e.categoryName.toLowerCase().includes(item.toLowerCase()) ||
      e.quantity.toString().toLowerCase().includes(item.toLowerCase()) ||

      e.size.toLowerCase().includes(item.toLowerCase()) ||
      !item;
  }

}

//table row component

const ProductRow = props => (



  <tr>

    <td>{props.product._id}</td>
    <td>{props.product.productCode}</td>
    <td><a href={props.product.image ? props.product.image : "https://res.cloudinary.com/fashionistaimage/image/upload/v1590072616/g2i7hkrkxfiub2kdvfy8.gif"} target="_blank"><img src={props.product.image ? props.product.image : "https://res.cloudinary.com/fashionistaimage/image/upload/v1590072616/g2i7hkrkxfiub2kdvfy8.gif"} style={{ height: "80px" }} /></a></td>
    <td>{props.product.productName}</td>
    <td>{props.product.categoryName}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.size}</td>
    <td>{getAvgRating(props.product.rating)}</td>
    <td>

      <Link to={'/view-product/' + props.product._id}><a style={{ color: "white", marginRight: "20px" }} class="btn btn-primary"><i class="zmdi zmdi-eye"></i>  View</a></Link>    <a style={{ color: "white" }} class="btn btn-danger"

        onClick={() => {
          props.deleteProduct(props.product._id); console.log('Deleted ID: ', props.product._id)
        }
        }
      > <i class="fas fa-trash-alt"></i>  Delete</a>
    </td>



  </tr>
);



export default class productList extends Component {

  constructor(props) {

    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.getAllActiveCategories = this.getAllActiveCategories.bind(this);








    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {

      products: [],
      search: '',
      orders: [],
      categories: [],


    };



  }

  // get all active categories

  getAllActiveCategories() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/category/getall', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        categories: res.data

      })
    }).catch(err => {
      console.log(err);


    })

  }

  //get all orders

  getAllOrders() {
    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/order/managerlist', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        orders: res.data

      })
    }).catch(err => {
      console.log(err);


    })
  }



  componentDidMount() {

    this.validateUser();
    this.getAllOrders();
    this.getAllActiveCategories();


    // get all products

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/all', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        products: res.data.data

      })
    }).catch(err => {
      console.log("Error Occured", err);


    })

  }

  //validate session

  validateUser() {


    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/login/manager-token-validate', {

      headers:
      {
        // Authorization : ` bearer $(token) ` 

        manager_token: token

      }
    }
    ).then((res) => {


      console.log("Validation Response: ", res.data);


    }



    ).catch((err) => {

      if (token === "null") {

        console.log("Token is null Box called");

        swal({
          title: "Unauthorized Access",
          text: "You have to Log-In First!",
          icon: "error",
          button: "ok",
        });

        this.props.history.push('/manager-Sign-In/');
      }

      else {



        console.log("the token value is :", token);

        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Session Has Expired',
          html:
            '<h4>Last Session Details</h4><br/><b>User ID :</b> ' + localStorage.getItem("id") + '<br/>' +
            '<b>User Name :</b> ' + localStorage.getItem("username") + '<br/><br/>',
          showConfirmButton: false,
          timer: 4000
        })

        this.props.history.push('/manager-Sign-In/');


      }

    });











  }

  //delete product

  deleteProduct(id) {

    swal({
      title: "Are you sure?",
      text: "Once you deleted this product, you will not be able to recover this Product details and all the details will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((stat) => {
        if (stat) {


          // 

          const token = localStorage.getItem('manager_token');
          axios.delete('http://localhost:4000/product/delete/' + id,
            {
              headers:
              {
                manager_token: token

              }
            }).then(
              (res) => {

                this.setState({

                  products: this.state.products.filter(e => e._id !== id),


                }

                );
                swal("File Deleted Permenently!", {
                  icon: "success",
                });



              }).catch((err) => {

                if (token == "null") {
                  swal({
                    title: "Unauthorized Access",
                    text: "You have to Log-In First!",
                    icon: "error",
                    button: "ok",
                  });

                  this.props.history.push('/manager-Sign-In/');

                } else {

                  Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Session Has Expired',
                    showConfirmButton: false,
                    timer: 3000
                  })

                  this.props.history.push('/manager-Sign-In/');
                }


              })



        } else {
          swal("Product Deletion Terminated!");
        }
      });



  }


  // get product list

  productList() {

    return this.state.products.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow
        deleteProduct={this.deleteProduct}
        key={productCurrent._id}
        product={productCurrent}
      />;

    })
  }

  onChangeSearch(e) {

    this.setState({

      search: e.target.value


    });

  }



  render() {



    return (


      <div>
        <Title />
        <Navbar />
        <header>

          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />


        </header>

        <div style={{ padding: "20px" }}>
          <h6 style={{ color: "#78909C" }}><i class="fas fa-info-circle"></i>  Store Manager Portal / Products</h6>
        </div>


        {/* Summary Cards */}
        <div clss="Managercard" id="tab-cards">
          <div className="managerStat">
            <div
              className="container "
              style={{ padding: '25px' }}
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="card-counter primary">
                    <i className="fas fa-tshirt" />
                    <span className="count-numbers">{this.state.products.length}</span>
                    <span className="count-name"> Products Types</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter danger" style={{ backgroundColor: "#FB8C00" }}>
                    <i className="fas fa-dollar-sign" />
                    <span className="count-numbers" style={{ fontSize: "20px" }}>Rs. {getTotRevenue(this.state.orders)}</span>
                    <span className="count-name"> Total Revenue</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter success">
                    <i class="fas fa-store" />
                    <span className="count-numbers">{getTotProducts(this.state.products)}</span>
                    <span className="count-name">Products In Stock</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter info" style={{ backgroundColor: "#E91E63" }}>
                    <i class="fas fa-chart-pie"></i>
                    <span className="count-numbers">{this.state.categories.length}</span>
                    <span className="count-name"> Categories</span>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>




        <div>
          <div style={{ float: "right" }} >
            <Link
              className="nav-link"
              to="/add-product"
            ><button className="btn btn-primary"><h4><i className="zmdi zmdi-plus-square">  Add Products</i></h4></button></Link>
          </div>


        </div>
        <br /><br />
        <div
          className="row"

        >

          <h4>

            <div className="form-group" style={{ marginLeft: "20px" }}>
              <label htmlFor="name"><i
                className="zmdi zmdi-search"
                style={{ paddingRight: '20px', paddingLeft: '10px' }}
              >  </i> </label>
              <input
                id="productName"
                name="name"
                onChange={this.onChangeSearch}
                placeholder="Search Items"
                required
                type="text"
                value={this.state.search}
              />
            </div></h4>





        </div>









        <div style={{ marginLeft: '30px' }} id="tab1">



          <h1 style={{ fontFamily: "'DM Serif Display" }}>Product Details</h1>
          <table className="table" >

            <thead style={{ color: "#3949AB" }}>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Code</th>
                <th scope="col">Product Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Rating</th>
                <th scope="col" id="avoid1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.productList()}
            </tbody>
          </table>


        </div>
        
         {/* pdf generator divs */}
         
         <div id="tab2"></div><div id="tab3"></div><div id="tab4"></div><div id="profile"></div>






      </div>

















    )





  }





} 
