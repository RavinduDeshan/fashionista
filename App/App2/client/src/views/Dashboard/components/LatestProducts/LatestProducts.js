import React, { Component } from 'react';
import axios from 'axios';
import {Card} from "react-bootstrap";


function getAvgRating(ratings) {
  const total = ratings.reduce((acc, c) => acc + c, 0);
  if(total)
    return total / ratings.length;

  else
    return 0;

}

function searchItems(item){

  return function(e){
    return e.productCode.toLowerCase().includes(item.toLowerCase())
      ||e.productName.toLowerCase().includes(item.toLowerCase())||

      e.size.toLowerCase().includes(item.toLowerCase()) ||
      !item;
  }

}

const ProductRow = props => (



  <tr>

    <td>{props.product._id}</td>
    <td>{props.product.productCode}</td>
    <td>{props.product.productName}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.size}</td>
    <td>{getAvgRating(props.product.rating)}</td>




  </tr>
);



export default class LatestProducts extends Component {

  constructor(props) {

    super(props);





    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {

      products: [],
      search: '',
      orders:[]


    };



  }



  componentDidMount() {

    const token = localStorage.getItem("admin_token");
    
    axios.get('http://localhost:4000/product/admin-all',{

      headers:
      {
          admin_token: token

      }}).then(res => {
      this.setState({

        products: res.data.data

      })
    }).catch(err => {
      console.log(err);


    })

  }



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


        <div clss="Managercard">
          <div className="managerStat">
            <div
              className="container "
              style={{padding:'15px'}}
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="card-counter primary">
                    <i className="fas fa-tshirt" />
                    <span className="count-numbers">{this.state.products.length}</span>
                    <span className="count-name">Total Products</span>
                  </div>
                </div>

                <Card>
                  <h1 className="text-center mb-0 pt-3">Product Description</h1>
                  <hr />
                </Card>

                <div className="col-md-3">
                  <div className="card-counter danger">
                    <i className="fas fa-dollar-sign" />
                    <span className="count-numbers">599</span>
                    <span className="count-name">Purchases</span>
                  </div>
                </div>




              </div>
            </div>



          </div>
        </div>







        <div
          className="row"
          style={{ float: 'left', margin: '10px' }}
        >

          <h4>

            <div className="form-group">
              <label htmlFor="name"><i
                className="zmdi zmdi-search"
                style={{paddingRight:'20px', paddingLeft:'10px'}}
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


          {/* <div class="col-md" style={{width:'22%'}}>
            
                <input placeholder='Search Products...' class='js-search' type="text" /></div> */}

          {/* <div class="col-md" > */}

          {/* <Link to="/add-product" className="nav-link"><button className="btn btn-primary" ><i class="zmdi zmdi-plus-square">  Add Products</i> </button></Link></div> */}


        </div>









        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Code</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Rating</th>

              </tr>
            </thead>
            <tbody>
              {this.productList()}
            </tbody>
          </table>
        </div>




      </div>

    )





  }





} 
