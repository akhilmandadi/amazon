import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions/signupActions'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const jwt_decode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            persona: "customer"
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            persona: this.state.persona,
            email: this.state.mail,
            password: this.state.password,
        }
        this.props.login(data);
    }

    handleOptionChange = (e) => {
        this.setState({
            persona: e.target.value
        })
    }

    validateCredentials = () => {
        if (this.state.mail !== "" && this.state.password !== "") return false
        else return true
    }

    render() {
        let redirectVar = null;
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
            redirectVar = <Redirect to="/catalog" />
        }
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "seller") {
            redirectVar = <Redirect to={"/seller/home"} />
        }
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            redirectVar = <Redirect to={"/admin/home"} />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-9 mx-auto">
                            <div class="card card-signin flex-row my-5">
                                <div class="card-body">
                                    <h5 class="card-title text-center"> LOGIN</h5>
                                    <form onSubmit={this.onSubmit}>
                                        <form>
                                            <div className="radio-inline">
                                                <label>
                                                    <input type="radio" value="customer" checked={this.state.persona === 'customer'} onChange={this.handleOptionChange} />
                                                             Customer
                                                 </label>
                                            </div>
                                            <div className="radio-inline">
                                                <label>
                                                    <input type="radio" value="seller" checked={this.state.persona === 'seller'} onChange={this.handleOptionChange} />
                                                               Seller
                                                </label>
                                            </div>
                                            <div className="radio-inline">
                                                <label>
                                                    <input type="radio" value="admin" checked={this.state.persona === 'admin'} onChange={this.handleOptionChange} />
                                                               Admin
                                                </label>
                                            </div>
                                        </form>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="mail" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div class="form-group" style={{ "alignItems": "center" }}>
                                            {this.props.invalidCredentials ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold", "textAlign": "center" }}>Invalid Credentials</span> : ''}
                                        </div>
                                        <button disabled={this.validateCredentials()} type="submit" class="btn btn-primary">Login</button><br /><br />
                                        <div>Create your amazon account? <Link to='/signup'>Signup</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.signup.user,
        invalidCredentials: state.signup.invalidCredentials
    };
};

function mapDispatchToProps(dispatch) {
    return {
        login: payload => dispatch(login(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);