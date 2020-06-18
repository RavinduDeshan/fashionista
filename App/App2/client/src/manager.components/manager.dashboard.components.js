import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './manager.navbar.components';
import Title from './manager.title.components';
import axios from 'axios';
import swal from 'sweetalert';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2'
import { Line } from 'react-chartjs-2';
import Chart1 from './Charts/Pie';
import Chart2 from './Charts/SalesLine';


//get average ratings of products

function getAvgRating(ratings) {
  const total = ratings.reduce((acc, c) => acc + c, 0);
  if (total) {

    const output = parseFloat(total / ratings.length).toFixed(2);


    return output;

  } else
    return 0;

}

// handle table content searcg

function searchItems(item) {

  return function (e) {
    return e.productCode.toLowerCase().includes(item.toLowerCase())
      || e.productName.toLowerCase().includes(item.toLowerCase()) ||

      e.size.toLowerCase().includes(item.toLowerCase()) ||
      !item;
  }

}




const ProductRow = props => (





  <tr>


    <td>{props.product.productCode}</td>
    <td>{props.product.productName}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.discount}</td>
    <td>{getAvgRating(props.product.rating)}</td>




  </tr>
);



export default class productList extends Component {



  constructor(props) {

    super(props);


    this.validateUser = this.validateUser.bind(this);
    this.getRecentProducts = this.getRecentProducts.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getAllActiveCategories = this.getAllActiveCategories.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.getLowStockProducts = this.getLowStockProducts.bind(this);
    this.getTopDiscountProducts = this.getTopDiscountProducts.bind(this);
    this.getRecentUpdateProducts = this.getRecentUpdateProducts.bind(this);
    this.getUsers = this.getUsers.bind(this);












    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {

      users: [],
      allOrders: [],
      categories: [],
      recentproducts: [],
      Toproducts: [],
      Updateproducts: [],
      Lowstockproducts: [],
      search: '',
     
      totproductList: [],
      Chartdata: {
        labels: ['1', '2', '1', '3', '2', '3', '4', '5'],
        datasets: [{
          label: "medium",
          backgroundColor: "rgba(255,0,255,0.75)",
          data: [4, 5, 1, 10, 32, 2, 12]
        }]
      }



    };



  }

  // get all regisistered customers details
  getUsers() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/users/managerlist', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        users: res.data

      })
    }).catch(err => {
      console.log(err);


    })


  }

  // get recent product list
  getRecentProducts() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/recent', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        recentproducts: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })

  }

  // get recently updated product list
  getRecentUpdateProducts() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/updated', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        Updateproducts: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })

  }

  //get low stock product list

  getLowStockProducts() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/lowstock', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        Lowstockproducts: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })

  }

  // get high discount offering products
  getTopDiscountProducts() {

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/top-discount', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        Toproducts: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })

  }


  // get all products
  getAllProducts() {
    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/product/all', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        totproductList: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })
  }

  // get all orders
  getAllOrders() {
    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/order/managerlist', {
      headers:
      {
        manager_token: token

      }
    }).then(res => {
      this.setState({

        allOrders: res.data

      })
      console.log("Orders are " , res.data);
      
    }).catch(err => {
      console.log(err);


    })
  }

  // get all categories
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

  componentDidMount() {
    this.getAllOrders();
    this.getUsers();

    this.validateUser();
    this.getAllActiveCategories();

    this.getRecentProducts();
    this.getAllProducts();
    this.getLowStockProducts();
    this.getTopDiscountProducts();
    this.getRecentUpdateProducts();





  }



  // validate user sessions

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

//handle recent product table row
  productList() {

    return this.state.recentproducts.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow


        product={productCurrent}
      />;

    })
  }

  //handle lowstock table row

  lowstockList() {

    return this.state.Lowstockproducts.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow

        product={productCurrent}
      />;

    })
  }

  //handle recently upated table row

  updateProductList() {

    return this.state.Updateproducts.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow

        product={productCurrent}
      />;

    })
  }

  //handle top discounted table row

  topProductList() {

    return this.state.Toproducts.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow

        product={productCurrent}
      />;

    })
  }

  // handle search 

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




        </header>
        <div style={{ padding: "20px" }}>
          <h6 style={{ color: "#78909C" }}><i class="fas fa-info-circle"></i>  Store Manager Portal / Dashboard</h6>
        </div>
        <div clss="Managercard" id="tab-cards">
          <div className="managerStat">
            <div
              className="container "
              style={{ padding: '15px' }}
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="card-counter primary">
                    <i className="fas fa-tshirt" />
                    <span className="count-numbers">{this.state.totproductList.length}</span>
                    <span className="count-name"> Product Types</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter danger">
                    <i class="fas fa-shopping-cart"></i>
                    <span className="count-numbers">{this.state.allOrders.length}</span>
                    <span className="count-name"> Total Purchases</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter success">
                    <i class="fas fa-chart-pie"></i>
                    <span className="count-numbers">{this.state.categories.length}</span>
                    <span className="count-name"> Active Categories</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter info">
                    <i className="fa fa-users" />
                    <span className="count-numbers">{this.state.users.length}</span>
                    <span className="count-name"> Active Customers</span>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>







        <div
          className="row"

        >

          <h4>

            <div className="form-group" style={{ padding: "20px" }}>
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

                <center><b><h2 style={{marginBottom:"50px"}}>Products by Categories Summary</h2></b></center>
{/* products by Categories PIE chart*/}
               <Chart1/>



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

              <center><b><h2 style={{marginBottom:"50px"}}>Sales Summary</h2></b></center>
{/* products by revenue Line chart */}
                <Chart2





                />



              </div>
            </Grid>


          </Grid>





        </div>



{/* Summary Tables */}

        <div style={{ padding: "40px" }}>
          <center>

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
                <div id="tab1" className="container" >

                  <h1>Latest Products</h1>
                  <table className="table" style={{ color: "#546E7A" }}>

                    <thead style={{ color: "#3F51B5" }}>
                      <tr>

                        <th scope="col">Product Code</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Rating</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.productList()}
                    </tbody>
                  </table>
                </div>


              </Grid>

              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={12}
              >

                <div id="tab2" className="container" style={{ backgroundColor: "#00ACC1", color: "#FAFAFA" }}>

                  <h1>Recently Updated Products</h1>
                  <table className="table" style={{ color: "#FAFAFA" }}>

                    <thead>
                      <tr>

                        <th scope="col">Product Code</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Rating</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.updateProductList()}
                    </tbody>
                  </table>
                </div>


              </Grid>
            </Grid>


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
                <div id="tab3" className="container" style={{ backgroundColor: "#FF7043", color: "#FBE9E7" }}>

                  <h1>Low Stock Products</h1>
                  <table className="table" style={{ color: "#FBE9E7" }}>

                    <thead>
                      <tr>

                        <th scope="col">Product Code</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Rating</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.lowstockList()}
                    </tbody>
                  </table>
                </div>

              </Grid>

              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={12}
              >
                <div id="tab4" className="container" style={{ backgroundColor: "#263238", color: "#FDD835" }}>

                  <h1>Top Discount Products</h1>
                  <table className="table" style={{ color: "#FDD835" }}>

                    <thead>
                      <tr>

                        <th scope="col">Product Code</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Rating</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.topProductList()}
                    </tbody>
                  </table>
                </div>


              </Grid>
            </Grid>





          </center>

          {/* pdf generator divs */}
          <div id="avoid1"></div>
          <div id="avoid2"></div>
          <div id="profile"></div>
           {/* pdf generator divs */}



        </div>


      </div>
    )





  }





} 
