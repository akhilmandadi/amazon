import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Navbar from '../Navbar';
import productcatalog from '../customer/productcatalog';
import SellerCatalog from '../Seller/productsCatlog';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/catalog" component={productcatalog} />
                <Route exact path="/seller/home" component={SellerCatalog} />
                
            </div>
        )
    }
}

export default Main;