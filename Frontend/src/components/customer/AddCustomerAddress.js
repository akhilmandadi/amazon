import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { addAddress } from '../../redux/actions/profile';

class AddCustomerAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            fullname: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            zipcode: "",
            phone: ""
        }
        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const data = {
            country: this.state.country,
            name: this.state.fullname,
            line1: this.state.line1,
            line2: this.state.line2,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.addAddress(data);
    }

    render() {
        let redirect = null;
        if (this.props.addressRedirect === true) {
            redirect = <Redirect to="/profile/addresses" />
        }
        return (
            <div>
                {redirect}
                <div class="container" style={{ marginTop: "30px", width: "40%" }}>
                    <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>Your Account  &nbsp;>&nbsp;  </p>
                    <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>Your Addresses  &nbsp;>&nbsp;  </p>
                    <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>New Address </p>
                    <p style={{ marginTop: "10px", marginBottom: "30px", fontSize: "21px", color: "#111111", fontWeight: "700" }}>Add a new address</p>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Country/Region</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="country" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Full name</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="fullname" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Street address</label>
                        <input onChange={this.inputHandler} style={{ marginBottom: "10px", fontSize: "13px", color: "#111111" }} name="line1" type="text" class="form-control" placeholder="Street address, P.O. box, company name, c/o" />
                        <input onChange={this.inputHandler} type="text" class="form-control" name="line2" placeholder="Apartment, suite, unit, building, floor, etc." />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>City</label>
                        <input onChange={this.inputHandler} type="text" name="city" class="form-control" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>State/Province/Region</label>
                        <input onChange={this.inputHandler} type="text" name="state" class="form-control" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Zip Code</label>
                        <input onChange={this.inputHandler} type="number" name="zipcode" class="form-control" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Phone number</label>
                        <input onChange={this.inputHandler} type="number" name="phone" class="form-control" />
                        <p style={{ fontSize: "11px", marginTop: "5px" }}>May be used to assist delivery</p>
                    </div>
                    <button type="button" class="btn btn-secondary" onClick={this.submitForm} style={{ width: "18%", fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center" }}>
                        <span style={{ textAlign: "center", paddingTop: "3px" }}>Add address</span>
                    </button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        addressRedirect: state.profile.addressRedirect
    };
};


function mapDispatchToProps(dispatch) {
    return {
        addAddress: payload => dispatch(addAddress(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerAddress);