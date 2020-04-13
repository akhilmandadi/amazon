import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
import _ from 'lodash';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/signupActions"

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
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
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
                <nav class="navbar  navbar-dark bg-dark" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ display: "inline" }}>
                            <b class="navbar-brand" style={{ color: "#fff", display: "inline" }}>Amazon</b>
                        </div>
                        <ul class="nav navbar-nav">
                        </ul>
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