import React from 'react';
import axios from "axios";
import './Products.css';
import * as numeral from 'numeral';
import PaypalButton from '../../components/Jobs/pay';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert, Card, Button } from 'react-bootstrap';
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

const CLIENT = {
  sandbox: 'AXLG5l9gXCMut3IBoDyqmqKyq0fP5tl4E1V_U0UInnEtNymfLXmNKVrMbDYL0Ehoelv98tYl3t-j-p8R',

};
const ENV = 'sandbox';

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      cartExists: false,
      cartTotal: 0,
      showSuccess: false
    }
    this.getCartsData();
  }

  getCartsData = async () => {
    console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      var add = 0;
      await axios.get("/api/cart?id=" + this.props.auth.user.id).then((response) => {
        this.setState({ products: response.data, cartExists: true });
        this.state.products.items.map((item) => {
          add = add + (item.productPrice * item.quantity);
        });
        this.setState({ cartTotal: numeral(add).format('$0,0.00') }); 
      });
    }
    else {
      this.props.history.push("/login");
    }
  }

  closeAlertCart = () => {
    this.setState({ showSuccess: false });
  }

  setActiveModal(){
    axios.delete("/api/cart?id=" + this.state.products._id)
            .then((response) => {
              this.setState({
                products: [],
                cartExists: false,
                cartTotal: 0,
                showSuccess: false
              })
            })
  }


  render() {

    const onSuccess = (payment) => {
      console.log('Successful payment!', payment);
      this.setState({ showSuccess: true })
      const oData = {
        email: this.props.auth.user.email,
        name: this.props.auth.user.name,
        products: this.state.products
      };
      axios
      .post("/api/sendordermail", oData)
      .then((response)=> {
        console.log(response);
      })
      .catch(err =>
        console.log(err)
      );
      axios
        .post("/api/order", this.state.products)
        .then((response) => {
          console.log(response);
          console.log("hihi")
          axios.delete("/api/cart?id=" + this.state.products._id)
            .then((response) => {
              this.setState({
                products: [],
                cartExists: false,
                cartTotal: 0,
                showSuccess: false
              })
            })
        })
        .catch(err =>
          console.log(err)
        );
    }

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div className="cartBg">
        <div className="container cart-container">
        {(this.state.showSuccess ?
          (<Alert variant="success" onClose={() => this.closeAlertCart()} dismissible>Payment was successful!</Alert>)
          : '')}
          <h1>Your Cart</h1>
          <div className="cart">

            <div className="cart-items">
              {this.state.cartExists ?
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.items.map((item) => {
                      return (
                        <tr key={item.productName} >
                          <td></td>
                          <td>{item.productName}</td>
                          <td>{numeral(item.productPrice).format('$0,0.00')}</td>
                          <td>{item.quantity}</td>
                          <td>{numeral(item.productPrice * item.quantity).format('$0,0.00')}</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table> :
                <h1>No items in the cart.</h1>
              }
            </div>
            <div className="cart-info">
              <p>
                <strong> Total amount:
                {this.state.cartExists ? (<span className="total"> {this.state.cartTotal}</span>) : ''}</strong>
              </p>
              { this.state.cartExists ? <PaypalButton
                className="btn btn-info"
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'USD'}
                total={'100'}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
              /> : []}
              <button type="Button"
                className="empty"
                onClick={() => this.setActiveModal()}
                className="btn btn-danger"
                disabled={!this.state.cartExists}
              > Empty cart</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
Cart.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Cart);
