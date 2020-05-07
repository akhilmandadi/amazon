import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
import _ from 'lodash';
import Amazon from './images/logo.PNG';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/signupActions"
import { fetchProducts, clearProducts } from "../redux/actions/customerActions"
import { showAddProduct } from "../redux/actions/sellerActions"
import AddProduct from "../components/Seller/ProductModifictaion"
import './css/navbar.css';
import { LOADING } from '../redux/actions/types';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customersearchText: "",
            displayResultsOffset: 1,
            sellerProductSearch: "",
            category: "",
            sortType: "",
            redirectVar: "",
            catalogFlag:"",
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.showAddProduct = this.showAddProduct.bind(this);
        this.onInputHandler = this.onInputHandler.bind(this);
        this.onSellerProductSearch = this.onSellerProductSearch.bind(this);
    }

    componentDidMount() {
        this.setState({
            sellerProductSearch: this.props.seller.searchTxt
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customersearchText: nextProps.productSearchInput,
            category: nextProps.filterCategory,
            displayResultsOffset: nextProps.displayResultsOffset,
            sortType: nextProps.sortType,
            sellerProductSearch: nextProps.seller.searchTxt
        });
    }

    handleLogout = () => {
        this.props.clearProducts({})
        this.props.logoutUser({})
    }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    fetchProducts = (e) => {
        let data = {}
        if (e === 'logo'){
            data = {
                searchText: "",
                filterCategory: "",
                displayResultsOffset: 1,
                sortType: ""
            }
            this.setState({
                customersearchText:''
            })
        }else{
        data = {
            searchText: this.state.customersearchText,
            filterCategory: "",
            displayResultsOffset: 1,
            sortType: ""
        }
    }
        this.props.fetchProducts(data)
        this.setState({
            catalogFlag : true
        })
    }

    showAddProduct() {
        this.props.showAddProduct();
    }

    onSellerProductSearch(e) {
        e.preventDefault();
        let redirectVar = <Redirect to={{
            pathname: "/seller/home/" + this.state.sellerProductSearch,
            state: {
                search: this.state.sellerProductSearch,
                isSeller: false,
            }
        }}  >
        </Redirect>
        this.setState({
            redirectVar: redirectVar
        })
    }

    onInputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let navBar = null;

        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
            navBar = (
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div>
                            <div class="navbar-header" style={{ display: "inline" }}>
                                {/* <Link to={{
                                    pathname: '/catalog'
                                    // ,
                                    // state:{
                                    //     home:true
                                    //     }
                                    }}> */}
                                    {/* <Link to='/catalog' > */}
                                    <img class="nav-bar-logo" src={Amazon} style={{ height: "63px" }} onClick={()=>this.fetchProducts("logo")}/>
                                    {/* </Link> */}
                            </div>
                            <ul class="nav navbar-nav">
                                <div class="input-group nav-bar-search">
                                    <input type="text" class="form-control" onChange={this.inputChangeHandler} placeholder="Search" name="customersearchText" value={this.state.customersearchText} />
                                    <div class="input-group-btn nav-bar-searchRadius ">
                                        {/* <Link to={{
                                            pathname: "/catalog",
                                            state: {
                                                productSearchInput: this.state.customersearchText
                                            }
                                        }}> */}
                                            <button class="btn btn-default nav-bar-searchIcon" type="submit" onClick={()=>this.fetchProducts('')}><span class="glyphicon glyphicon-search searchIcon"></span></button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <button class="dropbtn">  <span class="nav-bar-userDetails"> Hello, {sessionStorage.getItem('name')}</span> <br></br> <span class="nav-bar-bottom-text"> Account & Lists </span></button>
                                    <div class="dropdown-content">
                                        <li onClick="">
                                            <Link to="/customer/account" >Your Account</Link>
                                        </li>
                                        <li onClick="">
                                            <Link to="/your-account/order-history" >Your Orders </Link>
                                        </li>
                                        <li onClick={this.handleLogout}>
                                            <Link to="/signin" >Sign Out </Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <Link to="/your-account/order-history" >
                                        <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span class="nav-bar-bottom-text"> & Orders </span></button>
                                    </Link>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Videos </span> <br></br> <span class="nav-bar-bottom-text"> Prime </span></button>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav navbar-right" style={{ "padding-right": "20px" }}>
                                <Link to={`/customer/${sessionStorage.getItem('id')}/cart`}>
                                    <div class="row nav-bar-cart-complete">
                                        <div class="col-md-6 nav-cart-icon nav-sprite">
                                        </div>
                                        <div class="col-md-6 nav-bar-cart">
                                            Cart
                                        </div>
                                        <span style={{ color: "#F08804", fontSize: "16px", zIndex: "10000", position: "relative", top: "7px", left: "-58%" }}>
                                            {sessionStorage.getItem("cartCount")}
                                        </span>
                                    </div>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "seller") {
            navBar = (
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div>
                            {this.state.redirectVar}
                            <div class="navbar-header" style={{ display: "inline" }}>
                                <Link to='/seller/home'><img class="nav-bar-logo" src={Amazon} /></Link>
                            </div>
                            <AddProduct></AddProduct>
                            {/* <ul class="nav navbar-nav">
                                <div class="input-group nav-bar-search">
                                    <input type="text" class="form-control" onChange={this.inputChangeHandler} placeholder="Search" name="customersearchText" />
                                    <div class="input-group-btn nav-bar-searchRadius ">
                                        <button class="btn btn-default nav-bar-searchIcon" onClick={() => this.fetchProducts()} type="submit"><span class="glyphicon glyphicon-search searchIcon"></span></button>
                                    </div>
                                </div>
                            </ul> */}
                            <ul class="nav navbar-nav">
                                <form >
                                    <div class="input-group nav-bar-search">
                                        <input type="text" class="form-control" placeholder="Search" name="sellerProductSearch" value={this.state.sellerProductSearch} onChange={this.onInputHandler} />
                                        <div class="input-group-btn nav-bar-searchRadius">
                                            <Link to={{
                                                pathname: "/seller/home/" + this.state.sellerProductSearch,
                                                state: {
                                                    search: this.state.sellerProductSearch,
                                                    isSeller: false,
                                                }
                                            }}>  <button class="btn btn-default nav-bar-searchIcon" ><i class="glyphicon glyphicon-search"></i></button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <button class="dropbtn">  <span class="nav-bar-userDetails"> Hello, {sessionStorage.getItem('name')}</span> <br></br> <span class="nav-bar-bottom-text"> Account & Lists </span></button>
                                    <div class="dropdown-content">
                                        <li onClick="">
                                            <Link to="/seller/profile" >Your Account</Link>
                                        </li >
                                        <li onClick="">
                                            <Link to="/seller/home" >Your Products</Link>
                                        </li>
                                        <li onClick="">

                                            <Link to="/seller/orders" >Your Orders</Link>
                                        </li>
                                        <li onClick={this.handleLogout}>
                                            <Link to="/signin" >   Logout </Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <Link to="/seller/orders" >
                                        <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span class="nav-bar-bottom-text"> & Orders </span></button>
                                    </Link>
                                </div>
                            </ul>
                            <ul class="nav navbar-nav">
                                <div class="dropdown">
                                    <button class="dropbtn" onClick={this.showAddProduct} >  <span class="nav-bar-userDetails"> Add a new</span> <br></br> <span class="nav-bar-bottom-text"> Product </span></button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            navBar = (
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div>
                            <div class="navbar-header" style={{ display: "inline" }}>
                                <Link to='/admin/home'><img class="nav-bar-logo" src={Amazon} /></Link>
                            </div>
                            <div class="col-md-5">

                            </div>
                            <div class="col-md-2">
                                <ul class="nav navbar-nav">
                                    <div class="dropdown">
                                        <Link to="/signin" class="" style={{ color: "white" }} >
                                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Manage</span> <br></br> <span class="nav-bar-bottom-text"> Inventory Listings </span></button>
                                        </Link>
                                    </div>
                                </ul>
                            </div>
                            <div class="col-md-1">
                                <ul class="nav navbar-nav">
                                    <div class="dropdown">
                                        <Link to="/admin/sellers" class="" style={{ color: "white" }}  >
                                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> All</span> <br></br> <span class="nav-bar-bottom-text"> Sellers </span></button>
                                        </Link>
                                    </div>
                                </ul>
                            </div>

                            {/* <div class="col-md-1">
                                <ul class="nav navbar-nav">
                                    <div class="" style={{ marginTop: "32%" }}>
                                        <Link to="/admin/sellers" class="" style={{ color: "white" }} >   <span class=""> Sellers  </span></Link >
                                    </div>
                                </ul>
                            </div> */}
                            <div class="col-md-2">
                                <ul class="nav navbar-nav">
                                    <div class="dropdown">
                                        <Link to="/admin/orders" class="" style={{ color: "white" }} >
                                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span class="nav-bar-bottom-text"> & Orders </span></button>
                                        </Link>
                                    </div>
                                </ul>
                            </div>
                            {/* <div class="col-md-1">
                                <ul class="nav navbar-nav">
                                    <div class="" style={{ marginTop: "35%" }}>
                                        <Link to="/admin/orders" class="" style={{ color: "white" }} >   <span class=""> Orders </span></Link >
                                    </div>
                                </ul>
                            </div> */}
                            <ul class="nav navbar-nav navbar-right ">
                                <li><Link to="/signin" onClick={this.handleLogout} class="logout" style={{ color: "white" }}><span class=" logout glyphicon glyphicon-log-out" ></span> Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
        let redirectVar = null;
        if (this.state.catalogFlag) {
            this.setState({
                catalogFlag:false
            })
            redirectVar = <Redirect to='/catalog' />
        }
        if (!sessionStorage.getItem("persona")) redirectVar = <Redirect to="/signin" />
        return (
            <div>
                {redirectVar}
                {navBar}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        seller: state.sellerReducer,
        productSearchInput: state.customer.productSearchInput,
        filterCategory: state.customer.filterCategory,
        displayResultsOffset: state.customer.displayResultsOffset,
        sortType: state.customer.sortType,
        carttotalitems: state.cart.carttotalitems
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        clearProducts: payload => dispatch(clearProducts(payload)),
        logoutUser: payload => dispatch(logoutUser(payload)),
        showAddProduct: payload => dispatch(showAddProduct(true))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);