import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions/signupActions'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './css/login.css'
import Amazon from './images/amazon.PNG';

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
            <div class="container">
                {redirectVar}
                <div class="row" style={{ "padding": "10px 0px 10px", textAlign: "center" }}>
                    <img src={Amazon} style={{ width: "120px" }} />
                </div>
                <div class="row" style={{}}>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-2">
                        <div class="outer1container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-9 mx-auto">
                                    <div class="card card-signin flex-row my-5">
                                        <div class="card-body">
                                            <form onSubmit={this.onSubmit} class="loginform" style={{marginTop:"30px"}}>
                                                <h2 class="card-title text-left"> Sign-In</h2>
                                                <form style={{marginTop:"20px"}}>
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
                                                <br></br>
                                                <div class="form-group">
                                                    <label for="mail" class="form_label">
                                                        Email
                                                    </label>
                                                    <input type="email" class="form-control" name="mail" onChange={this.onChange} pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="password" class="form_label">
                                                        Password
                                                    </label>
                                                    <input type="password" class="form-control" name="password" onChange={this.onChange} required />
                                                </div>
                                                <div class="form-group" style={{ "alignItems": "center" }}>
                                                    {this.props.invalidCredentials ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold", "textAlign": "center" }}>Invalid Credentials</span> : ''}
                                                </div>
                                                <button type="submit" disabled={this.validateCredentials()} class="login-button">
                                                    Sign-In
                                                </button>
                                                <br />
                                                <div style={{textAlign:"center"}}><br/> Create your Amazon account? <Link to='/signup'>Signup</Link></div>
                                            </form>
                                        </div>
                                    </div>
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