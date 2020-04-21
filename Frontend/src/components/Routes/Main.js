import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Navbar from '../Navbar';
import CustomerOrdersHome from '../customer/OrdersHome';
import CustomerOrderDetails from '../customer/OrderDetails';
import productcatalog from '../customer/productcatalog'
import SellerOrdersHome from '../Seller/OrdersHome';
import SellerOrderDetails from '../Seller/OrderDetails';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/your-account/order-history" component={CustomerOrdersHome} />
                <Route exact path="/orders/:id" component={CustomerOrderDetails} />
                <Route exact path="/catalog" component={productcatalog} />
                <Route exact path="/seller/orders" component={SellerOrdersHome} />
                <Route exact path="/seller/orders/:id" component={SellerOrderDetails} />
            </div>
        )
    }
}

export default Main;