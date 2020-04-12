import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../actions/signupActions'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';





class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupFlag: 0,
            name: "",
            mail: "",
            password: "",
            confirmpassword: "",
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


        if (this.state.password !== this.state.confirmpassword) {
            alert("password match unsuccessful")
        }
        //prevent page from refresh
        e.preventDefault();

        const data = {

            role: this.state.selectedOption,
            name: this.state.name,
            mail: this.state.mail,
            password: this.state.password,


        }
        console.log(data)

        this.props.signup(data);
       


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
      //  let userval=this.props.user?this.props.user.substring(0,14):""




      if(this.props.user === "customer_exists" || this.props.user === "seller_exists" ){
          message = " user with this email exists";
       }
      else if(this.props.user === "customer_added" || this.props.user === "seller_added"){
        message = "You have registered successfully"
        redirectVar = <Redirect to="/Login" />
      }
      else if(this.props.user === "sellername_exists")
      {
          message = "seller with this name  exists";
      }



       
       



        return (
            <div>

                {redirectVar}


                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-9 mx-auto">
                            <div class="card card-signin flex-row my-5">

                                <div class="card-body">
                                    <h5 class="card-title text-center"> SIGN UP</h5>


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
                                        </form>

                                        <div class="form-group">

                                            <input type="email" class="form-control" name="mail" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder=" Name" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="confirmpassword" onChange={this.onChange} placeholder="Re- Enter password" required />
                                        </div>
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" class="btn btn-primary">Signup</button><br /><br />
                                        <div>Already have an account? <Link to='/Login'>Login</Link></div>

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

Signup.propTypes = {
    signup: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired
};
const mapStateToProps = state => {

    return ({
        user: state.signup.user
    })


};



export default connect(mapStateToProps, { signup })(Signup);