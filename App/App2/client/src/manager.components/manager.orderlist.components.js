import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './manager.navbar.components';
import Title from './manager.title.components';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import Chart1 from './Charts/RevenueLine';
import Chart2 from './Charts/OrderLine';
import { Grid } from '@material-ui/core';





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


//calculate total revenue
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

//search records in tables
function searchItems(item) {

  return function (e) {
    return e.orderId.toLowerCase().includes(item.toLowerCase())
      || e.orderDate.toLowerCase().includes(item.toLowerCase()) ||
      e.paymentMethod.toLowerCase().includes(item.toLowerCase()) || e.totalPrice.toString().toLowerCase().includes(item.toLowerCase()) ||

      e.userId.toLowerCase().includes(item.toLowerCase()) ||
      !item;
  }

}

const ProductRow = props => (



  <tr>

    <td>{props.order.orderId}</td>
    <td>{props.order.userId}</td>
    <td>{props.order.orderDate.substring(0, 10)}</td>
    <td>{props.order.paymentMethod}</td>
    <td>{(props.order.totalPrice)}</td>




  </tr>
);



export default class orderList extends Component {

  constructor(props) {

    super(props);


    this.validateUser = this.validateUser.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);


    this.state = {

      products: [],
      search: '',
      orders: [],



    };



  }

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


    //get total products

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

  // validate users
  validateUser() {


    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/login/manager-token-validate', {

      headers:
      {


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



//get order list

  OderList() {

    return this.state.orders.filter(searchItems(this.state.search)).map(orderCurrent => {

      return <ProductRow

        order={orderCurrent}
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
          <h6 style={{ color: "#78909C" }}><i class="fas fa-info-circle"></i>  Store Manager Portal / Purchases</h6>
        </div>

        <div clss="Managercard" id="tab-cards">
          <div className="managerStat">
            <div
              className="container "
              style={{ padding: '25px' }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div className="card-counter primary" style={{ backgroundColor: "#8E24AA" }}>
                    <i class="fas fa-shopping-cart"></i>
                    <span className="count-numbers">{this.state.orders.length}</span>
                    <span className="count-name"> Total Purchases</span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card-counter danger" style={{ backgroundColor: "#FB8C00" }}>
                    <i className="fas fa-dollar-sign" />
                    <span className="count-numbers" style={{ fontSize: "30px" }}>Rs. {getTotRevenue(this.state.orders)}</span>
                    <span className="count-name"> Total Revenue</span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card-counter success">
                    <i class="fas fa-store" />
                    <span className="count-numbers">{getTotProducts(this.state.products)}</span>
                    <span className="count-name"> Total Products In Stock</span>
                  </div>
                </div>


              </div>
            </div>



          </div>
        </div>




        <div></div>

        <div style={{ padding: "40px" }}>


          <Grid
            container
            spacing={10}
          >
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >

              <div style={{ position: "relative" }} >

                <h3>Revenue Summary</h3>

                {/* Revenue Chart */}


                <Chart1 />



              </div>
            </Grid>




            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >

              <div style={{ position: "relative" }} >

                <h3>Purchase Orders Summary</h3>

                 {/* Purchase Orders Chart */}

                <Chart2





                />



              </div>
            </Grid>


          </Grid>





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



          <h1 style={{ fontFamily: "'DM Serif Display" }}>Purchase Details</h1>
          <table className="table" >

            <thead style={{ color: "#3949AB" }}>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Total Price (Rs.)</th>




              </tr>
            </thead>
            <tbody>
              {this.OderList()}
            </tbody>
          </table>
        </div>
        
         {/* pdf generator divs */}
         
         <div id="tab2"></div><div id="tab3"></div><div id="tab4"></div><div id="profile"></div><div id="avoid1"></div><div id="avoid2"></div>






      </div>

















    )





  }





} 
