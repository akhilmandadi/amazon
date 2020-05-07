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
import customerProfile from '../customer/CustomerProfile';
import Myreviews from '../customer/Myreviews';
import SellerOrdersHome from '../Seller/OrdersHome';
import SellerOrderDetails from '../Seller/OrderDetails';
import ProductDetailPage from '../customer/ProductDetailPage';
import AdminOrdersHome from '../Admin/Orders';
import SellerProfiles from '../Admin/Sellers';
import ProductReview from '../customer/ProductReview';
import SaveForLater from '../cart/SaveForLater'
import CustomerAddresses from '../customer/CustomerAddresses'
import AddCustomerAddress from '../customer/AddCustomerAddress'
import CustomerCart from '../cart/CustomerCart';
import CustomerCards from '../customer/CustomerCards';
import InventryListings from '../Admin/InventryListings';
import Analytics from '../analytics/Analytics';
import Report from '../Seller/Report';
import CheckOut from '../cart/CheckOut';
import Account from '../customer/Account';

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
                <Route exact path="/Myreviews" component={Myreviews} />
                <Route exact path="/my-orders" component={CustomerOrdersHome} />
                <Route exact path="/your-account/order-history" component={CustomerOrdersHome} />
                <Route exact path="/seller/orders" component={SellerOrdersHome} />
                <Route exact path="/seller/orders/:id" component={SellerOrderDetails} />
                <Route exact path="/seller/home" component={SellerCatalog} />
                <Route exact path="/seller/home/:search" component={SellerCatalog} />
                <Route path="/product/:id" exact component={ProductDetailPage}/>
                <Route exact path = "/seller/profile" component = {SellerProfilePage} />
                <Route exact path="/admin/home" component={InventryListings} />  
                <Route exact path="/admin/orders" component={AdminOrdersHome} />
                <Route exact path="/admin/sellers" component={SellerProfiles} />
                <Route exact path="/review/review-your-purchases" component={ProductReview} />
                <Route path="/SaveForLater" exact component={SaveForLater}/>
                <Route path="/profile/addresses" exact component={CustomerAddresses}/>
                <Route path="/profile/addresses/add" exact component={AddCustomerAddress}/>
                <Route path="/customer/:id/cart" exact component={CustomerCart}/>
                <Route path="/profile/cards" exact component={CustomerCards}/>
                <Route path="/Analytics" exact component={Analytics}/>
                <Route path="/Report" exact component={Report}/>
                <Route path="/customer/account" exact component={Account}/>
                <Route path="/customer/:id/checkout" exact component={CheckOut}/>
            </div>
        )
    }
}

export default Main;