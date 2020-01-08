import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import './index.css';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import PrivateRoute from "./components/private-route/PrivateRoute";
import App from './App';
import * as serviceWorker from './serviceWorker';
import Info from './components/Info/Info';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Products from './components/Products/Products';
import Jobs from './components/Jobs/Jobs';
import Services from './components/Services/Services';
import Garbage from './components/Services/Garbage';
import windInfo from './components/Info/windInfo';
import solarInfo from './components/Info/solarInfo';
import biogasInfo from './components/Info/biogasInfo';
import recycleInfo from './components/Info/recycleInfo';
import Product from './components/Products/Product';
import donate from './components/Donate/donate';
import BuyNow from './components/Products/BuyNow';
import Cart from './components/Products/Cart';
import Orders from './components/Products/Orders';
import History from './components/Products/History';
import ContactUs from './components/ContactUs/ContactUs';
import About from './components/About/About';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const routing = (
  <Provider store={store}>
    <Router>
    <div>
    <Header></Header>
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/info" component={Info} />
        <Route path="/products" component={Products} />
        <Route path="/jobs" component={Jobs}/>
        <PrivateRoute exact path="/services" component={Services}/>
        <PrivateRoute exact path="/collection" component={Garbage}/>
        <Route path="/products/product" component={Jobs}/>   
        <Route path="/product" component={Product}/>      
        <Route path="/windInfo" component={windInfo} />
        <Route path="/solarInfo" component={solarInfo} />
        <Route path="/biogasInfo" component={biogasInfo} />
        <Route path="/reuseInfo" component={recycleInfo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/buyNow" component={BuyNow} />   
        <PrivateRoute exact path="/donate" component={donate} />  
        <Route path="/contactUs" component={ContactUs} />  
        <Route path="/about" component={About} />  
        <PrivateRoute exact path="/cart" component={Cart}/>
        <PrivateRoute exact path="/orders" component={Orders}/>
        <PrivateRoute exact path="/history" component={History}/>
      </Switch>
        <Footer></Footer>
      </div>
    </Router>
  </Provider>
)



ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
