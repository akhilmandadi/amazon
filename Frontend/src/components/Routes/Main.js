import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Navbar from '../Navbar';
import CustomerOrdersHome from '../customer/OrdersHome';
import CustomerOrderDetails from '../customer/OrderDetails';
import productcatalog from '../customer/productcatalog'
import customerProfile from '../customer/CustomerProfile';
import Myratings from '../customer/Myratings';
import Mycomments from '../customer/Mycomments';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/orders/:id" component={CustomerOrderDetails} />
                <Route exact path="/catalog" component={productcatalog} />
                <Route exact path="/customerprofile" component={customerProfile} />
                <Route exact path="/Myratings" component={Myratings} />
                <Route exact path="/Mycomments" component={Mycomments} />
                <Route exact path="/my-orders" component={CustomerOrdersHome} />
            </div>
        )
    }
}

export default Main;