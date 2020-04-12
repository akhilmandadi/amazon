import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/signupActions'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const jwt_decode = require('jwt-decode');





class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            selectedOption:"customer"

        };
        this.handleOptionChange=this.handleOptionChange.bind(this)

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();

        const data = {

            role: this.state.selectedOption,
            mail: this.state.mail,
            password: this.state.password,


        }
        console.log(data)

        this.props.login(data);
    }
    handleOptionChange=(e)=>{
        this.setState({
            selectedOption:e.target.value

        })        
    }


    render() {
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        
        if (this.props.user && this.props.user.token) {
            sessionStorage.setItem("token", this.props.user.token);

            var decoded = jwt_decode(this.props.user.token.split(' ')[1]);
            sessionStorage.setItem("_id", decoded._id);
            sessionStorage.setItem("mail", decoded.seller_mail?decoded.seller_mail:(decoded.customer_mail?decoded.customer_mail:decoded.admin_mail?decoded.admin_mail:""));
            sessionStorage.setItem("name",decoded.name);
            sessionStorage.setItem("role", decoded.role);
            redirectVar = <Redirect to="/honepage" />
        }

        else if(this.props.user === "customer_notexists" || this.props.user === "admin_notexists" ||  this.props.user === "seller_notexists" ){
            message = "No user with this email id";
        }
        else if(this.props.user === "incorrect_password"){
            message = "Incorrect Password";
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
                                                    <input type="radio" value="customer"  checked={this.state.selectedOption === 'customer'} onChange={this.handleOptionChange}/>
                                                             customer
                                                 </label>
                                            </div>

                                            <div className="radio-inline">
                                                <label>
                                                    <input type="radio" value="seller" checked={this.state.selectedOption === 'seller'} onChange={this.handleOptionChange}/>
                                                               seller
                                                </label>
                                            </div>
                                            <div className="radio-inline">
                                                <label>
                                                    <input type="radio" value="admin" checked={this.state.selectedOption === 'admin'} onChange={this.handleOptionChange}/>
                                                               admin
                                                </label>
                                            </div>
                                        </form>

                                        <div class="form-group">

                                            <input type="email" class="form-control" name="mail" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                       
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        
                            
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" class="btn btn-primary">Login</button><br /><br />
                                        <div>Create your amazon account? <Link to='/'>Signup</Link></div>

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

Login.propTypes = {
    login: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired
};
const mapStateToProps = state => {

    return ({
        user: state.signup.user
    })


};



export default connect(mapStateToProps, { login })(Login);