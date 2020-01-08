import React from 'react';
import { Grid, Card, Carousel, Dropdown, Form, Media, Button } from 'react-bootstrap';
import img1 from '../../assets/images/dustbin.jpg'
import PaypalButton from '../../components/Jobs/pay';
import './Products.css';
import { submitOrders } from "../../actions/productsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Alert } from 'react-bootstrap';

const CLIENT = {
    sandbox: 'AXLG5l9gXCMut3IBoDyqmqKyq0fP5tl4E1V_U0UInnEtNymfLXmNKVrMbDYL0Ehoelv98tYl3t-j-p8R',

};
const ENV = 'sandbox';



class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.location.state.p,
            ordersData: {
                user: this.props.auth.user.id,
                dateCreated: Date.now(),
                items: [{
                    productID: props.location.state.p._id,
                    productName: props.location.state.p.title,
                    productPrice: props.location.state.p.price,
                    quantity: props.location.state.p.quantity
                }]
            },
            ordersCreated:false
        }
        const products = props.location.state.p
        console.log(this.props.auth.user.id);
    }

    closeAlertCart = () => {
        this.setState({ ordersCreated: false });
      }

    render() {
        const onSuccess = (payment) => {
            console.log('Successful payment!', payment);
            this.setState({ordersCreated:true})
            axios
            .post("/api/order", this.state.ordersData)
            .then((response) => {
              console.log(response);
              console.log("hihi")
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
            <div class="">

                <h1 className="head">Review Order</h1>

                <div className="container">
                {(this.state.ordersCreated ?
                (<Alert variant="success" onClose={() => this.closeAlertCart()} dismissible>Payment was successful!</Alert>)
                : '')}
                    <div className="row mt-5">
                        <div className="col-md-3 cc">
                            <Card.Img className="img cc" variant="top" src={process.env.PUBLIC_URL + this.state.products.image1} rounded />
                        </div>
                        <div className="col-md-9 cc">
                            <Card className="c">
                                <Card.Body className="text cc">
                                    <Card.Title className="text">{this.state.products.title}</Card.Title>
                                    <Card.Text>
                                        {this.state.products.desc1}<br />
                                        <h3>Total : ${this.state.products.price * this.state.products.quantity}
                                            <p>Quantity: {this.state.products.quantity}</p></h3><br />
                                        <PaypalButton
                                            client={CLIENT}
                                            env={ENV}
                                            commit={true}
                                            currency={'USD'}
                                            total={'100'}
                                            onSuccess={onSuccess}
                                            onError={onError}
                                            onCancel={onCancel}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Orders.propTypes = {
    submitOrders: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { submitOrders,logoutUser }
)(Orders);


//export default Orders;