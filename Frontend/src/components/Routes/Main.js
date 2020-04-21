import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Navbar from '../Navbar';
import productcatalog from '../customer/productcatalog';
import SellerCatalog from '../Seller/productsCatlog';
import SellerProfilePage from "../Seller/profile"
import CustomerOrdersHome from '../customer/OrdersHome';
import CustomerOrderDetails from '../customer/OrderDetails';
import ProductDetailPage from '../customer/ProductDetailPage';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/my-orders" component={CustomerOrdersHome} />
                <Route exact path="/orders/:id" component={CustomerOrderDetails} />
                <Route exact path="/catalog" component={productcatalog} />
                <Route exact path="/seller/home" component={SellerCatalog} />
                <Route exact path = "/seller/profile" component = {SellerProfilePage} />
                
                <Route path="/Product/:id" exact component={ProductDetailPage}/>
            </div>
        )
    }
}

export default Main;