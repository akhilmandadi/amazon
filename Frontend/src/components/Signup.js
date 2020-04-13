import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { signup, closeSignupModal } from "../redux/actions/signupActions"

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: true,
            persona: "customer",
            email: "",
            password: "",
            invalidEmail: false,
            invalidPassword: false,
            repeatPassword: "",
            passwordMatch: false,
            name: "",
            redirectToSignIn: false,
            passwordMatchError: false
        }
        this.changePersona = this.changePersona.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.rePasswordChangeHandler = this.rePasswordChangeHandler.bind(this);
        this.validateDetails = this.validateDetails.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    registerUser = (event) => {
        event.preventDefault();
        var data = {
            "email": this.state.email,
            "password": this.state.password,
            "name": this.state.name,
            "persona": this.state.persona
        }
        this.props.signup(data);
    }

    changePersona = (event) => {
        this.setState({
            placeholder: !this.state.placeholder,
            persona: event.target.value
        })
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    emailChangeHandler = (event) => {
        if (/.+@.+\.[A-Za-z]+$/.test(event.target.value)) {
            this.setState({
                invalidEmail: false,
                email: event.target.value
            })
        } else {
            this.setState({
                invalidEmail: true,
                email: event.target.value
            })
        }
    }

    passwordChangeHandler = (event) => {
        if (event.target.value.length > 5) {
            this.setState({
                password: event.target.value,
                invalidPassword: false
            })
            if (this.state.repeatPassword !== event.target.value && this.state.repeatPassword !== "") {
                this.setState({
                    passwordMatch: false
                })
            }
        } else {
            this.setState({
                password: event.target.value,
                invalidPassword: true
            })
        }
    }

    rePasswordChangeHandler = (event) => {
        if (this.state.password === event.target.value) {
            this.setState({
                repeatPassword: event.target.value,
                passwordMatch: true,
                passwordMatchError: false
            })
        } else {
            this.setState({
                repeatPassword: event.target.value,
                passwordMatch: false,
                passwordMatchError: true
            })
        }
    }

    validateDetails = (event) => {
        if (!this.state.invalidEmail && !this.state.invalidPassword && this.state.passwordMatch && this.state.name !== "") return false
        else return true
    }
    handleDialogClose = () => {
        this.setState({
            redirectToSignIn: true
        })
        this.props.closeSignupModal();
    }
    render() {
        let redirectToSignIn = null;
        if (this.state.redirectToSignIn) redirectToSignIn = <Redirect to="/signin" />
        return (
            <div>
                {redirectToSignIn}
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-9 mx-auto">
                            <div class="card card-signin flex-row my-5">
                                <div class="card-body">
                                    <h5 class="card-title text-center"> SIGNUP</h5>
                                    <div className="row" style={{ marginLeft: "35px", marginBottom: "7px" }}>
                                        <div class="col-md-5 radio-inline">
                                            <input type="radio" value="customer" name="persona" defaultChecked onChange={this.changePersona} /><p>Customer</p>
                                        </div>
                                        <div class="col-md-5 radio-inline">
                                            <input type="radio" value="seller" name="persona" onChange={this.changePersona} /><p>Seller</p>
                                        </div>
                                    </div>
                                    <form onSubmit={this.registerUser} autocomplete="off" >
                                        <div class="form-group">
                                            <input type="text" onChange={this.nameChangeHandler} class="form-control" name="name" placeholder="Name" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" onChange={this.emailChangeHandler} class="form-control" name="email" placeholder="Email Id" required />
                                        </div>
                                        <div class="form-group" style={{ "alignItems": "center" }}>
                                            {this.state.invalidEmail ? <span style={{ color: "red", "textAlign": "center" }}>Invalid Email Id. Please check</span> : ''}
                                        </div>
                                        <div class="form-group">
                                            <input type="password" onChange={this.passwordChangeHandler} class="form-control" name="password" placeholder="Password" required />
                                        </div>
                                        <div class="form-group" style={{ "alignItems": "center" }}>
                                            {this.state.invalidPassword ? <span style={{ color: "red", "textAlign": "center" }}>Password must have atleast 6 characters</span> : ''}
                                        </div>
                                        <div class="form-group">
                                            <input type="password" onChange={this.rePasswordChangeHandler} class="form-control" name="repeatPassword" placeholder="Re-Enter Password" />
                                        </div>
                                        <div class="form-group" style={{ "alignItems": "center" }}>
                                            {this.state.passwordMatchError ? <span style={{ color: "red", "textAlign": "center" }}>Passwords doesn't match</span> : ''}
                                        </div>
                                        <div class="form-group" style={{ "alignItems": "center" }}>
                                            {this.props.signupFailedError ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold", "textAlign": "center" }}>SignUp Failed. Please try again..</span> : ''}
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <button disabled={this.validateDetails()} class="btn btn-success" style={{ "width": "100%" }}>Register</button>
                                        </div>
                                        <br />
                                        <div style={{ textAlign: "center" }}>
                                            <Link to="/signin">Already a User? Sign In</Link>
                                        </div>
                                    </form>
                                    <br />
                                    <div>
                                        <Dialog
                                            open={this.props.signUpSuccessful}
                                            onClose={this.handleDialogClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Registered Successfully .!"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Hey {this.state.name},
                                                    You've been signup succesfully. Please go ahead and login
                                        </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                                                    Login
                                        </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signUpSuccessful: state.signup.signUpSuccessful,
        signupFailedError: state.signup.signupFailedError,
        user: state.signup.user
    };
};

function mapDispatchToProps(dispatch) {
    return {
        signup: payload => dispatch(signup(payload)),
        closeSignupModal: payload => dispatch(closeSignupModal(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);