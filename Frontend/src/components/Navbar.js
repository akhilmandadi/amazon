import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
import _ from 'lodash';
import Amazon from './images/amazonLogo.jpg';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/signupActions"
import './css/navbar.css'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        this.props.logoutUser({})
    }

    render() {
        let navBar = null;
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
            navBar = (
                <div>
                    <ul class="nav navbar-nav">
                        <form >
                            <div class="input-group nav-bar-search">
                                <input type="text" class="form-control" placeholder="Search" name="search" />
                                <div class="input-group-btn nav-bar-searchRadius">
                                    <button class="btn btn-default nav-bar-searchIcon" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn">  <span class="nav-bar-userDetails"> Hello, {sessionStorage.getItem('name')}</span> <br></br> <span> Account & Lists </span></button>
                            <div class="dropdown-content">
                                <li onClick="">
                                    Your Account
                                    </li >
                                <li onClick="">
                                    Your Order
                                    </li>
                                <li onClick={this.handleLogout}>
                                    Logout
                                    </li>
                            </div>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span> & Orders </span></button>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Videos </span> <br></br> <span> Prime </span></button>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" style={{ "padding-right": "20px" }}>
                        <div class="row nav-bar-cart-complete" onClick="">
                            <div class="col-md-6 nav-cart-icon nav-sprite">

                            </div>
                            <div class="col-md-6 nav-bar-cart">
                                Cart
                            </div>
                        </div>
                    </ul>
                </div>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "seller") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) redirectVar = <Redirect to="/signin" />
        return (
            <div>
                {redirectVar}
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ display: "inline" }}>
                            <img class="nav-bar-logo" src={Amazon} />
                        </div>

                        {navBar}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: payload => dispatch(logoutUser(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);