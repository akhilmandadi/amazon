import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { addAddress } from '../../redux/actions/profile';
import { editAddress } from '../../redux/actions/profile';
import '../css/orders.css'
import { findDOMNode } from 'react-dom';

class AddCustomerAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: (this.props.location.state ? this.props.location.state.address.country : ""),
            fullname: (this.props.location.state ? this.props.location.state.address.name : ""),
            line1: (this.props.location.state ? this.props.location.state.address.line1 : ""),
            line2: (this.props.location.state ? this.props.location.state.address.line2 : ""),
            city: (this.props.location.state ? this.props.location.state.address.city : ""),
            state: (this.props.location.state ? this.props.location.state.address.state : ""),
            zipcode: (this.props.location.state ? this.props.location.state.address.zipcode : ""),
            phone: (this.props.location.state ? this.props.location.state.address.phone :"")
        }
        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    validateDetails = () =>{
        var statesAbbrevations=["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
        var zipcodeRegex1=/[0-9][0-9][0-9][0-9][0-9]/
        var zipcodeRegex2=/[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
        if(this.state.country !== "" &&
         (this.state.fullname!=="")&&
         this.state.line1!== "" &&
         this.state.line2!=="" &&
         this.state.city!=="" &&
         this.state.phone.length===10 &&
         statesAbbrevations.includes(this.state.state) &&
         (this.state.zipcode.match(zipcodeRegex1)||this.state.zipcode.match(zipcodeRegex2)) &&
         (this.state.zipcode.length===5 || this.state.zipcode.length===10))
          {
            return false
        } else {
            return true
        }
    }

    validateEditDetails = () =>{
        var statesAbbrevations=["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
        var zipcodeRegex1=/[0-9][0-9][0-9][0-9][0-9]/
        var zipcodeRegex2=/[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
        if(this.state.country !== "" &&
         (this.state.fullname!=="")&&
         this.state.line1!== "" &&
         this.state.line2!=="" &&
         this.state.city!=="" &&
         ((JSON.stringify(this.state.phone).length===10|| (this.state.phone).length===10)&&this.state.phone.length!==8) &&
         statesAbbrevations.includes(this.state.state) &&
         (this.state.zipcode.match(zipcodeRegex1)||this.state.zipcode.match(zipcodeRegex2)) &&
         (this.state.zipcode.length===5 || this.state.zipcode.length===10))
          {
            return false
        } else {
            return true
        }
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

    submitEditedForm = (id) => {
        const data = {
            _id: id,
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
        this.props.editAddress(data);
    }

    render() {
        let redirect = null;
        if (this.props.addressRedirect === true) {
            redirect = <Redirect to="/profile/addresses" />
        }
        if (this.props.location.state) {
            return (<div>
                {redirect}
                <div class="container" style={{ marginTop: "30px", width: "40%" }}>
                    <Link to="/customer/account" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Account </p></Link>
                    <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>&nbsp;>&nbsp;</p>
                    <Link to="/profile/addresses" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Addresses</p></Link>
                    <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>&nbsp;>&nbsp;Edit Address </p>
                    <p style={{ marginTop: "10px", marginBottom: "30px", fontSize: "21px", color: "#111111", fontWeight: "700" }}>Edit your address</p>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Country/Region</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="country" value={this.state.country} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Full name</label>
                        <input onChange={this.inputHandler} type="text" class="form-control" name="fullname" value={this.state.fullname} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Street address</label>
                        <input onChange={this.inputHandler} style={{ marginBottom: "10px", fontSize: "13px" }} name="line1" type="text" class="form-control" placeholder="Street address, P.O. box, company name, c/o" value={this.state.line1} />
                        <input onChange={this.inputHandler} type="text" class="form-control" name="line2" placeholder="Apartment, suite, unit, building, floor, etc." value={this.state.line2} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>City</label>
                        <input onChange={this.inputHandler} type="text" name="city" class="form-control" value={this.state.city} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>State/Province/Region</label>
                        <input onChange={this.inputHandler} type="text" name="state" class="form-control" value={this.state.state} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Zip Code</label>
                        <input onChange={this.inputHandler} type="text" name="zipcode" class="form-control" value={this.state.zipcode} />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Phone number</label>
                        <input onChange={this.inputHandler} type="number" name="phone" class="form-control" value={(this.state.phone)} />
                        <p style={{ fontSize: "11px", marginTop: "5px" }}>May be used to assist delivery</p>
                    </div>
                    <button type="button" disabled={this.validateEditDetails()} class="btn btn-secondary" onClick={() => this.submitEditedForm(this.props.location.state.address._id)} style={{ width: "18%", fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center" }}>
                        <span style={{ textAlign: "center", paddingTop: "3px" }}>Save changes</span>
                    </button>
                </div>
            </div>
            )
        }
        else {
            return (<div>
                {redirect}
                <div class="container" style={{ marginTop: "30px", width: "40%" }}>
                    <Link to="/customer/account" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Account </p></Link>
                    <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>&nbsp;>&nbsp;</p>
                    <Link to="/profile/addresses" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Addresses</p></Link>
                    <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>&nbsp;>&nbsp; New Address </p>
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
                        <input onChange={this.inputHandler} type="text" name="zipcode" class="form-control" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "22px" }}>
                        <label style={{ fontSize: "13px", fontWeight: "700", color: "#111111" }}>Phone number</label>
                        <input onChange={this.inputHandler} type="number" name="phone" class="form-control" />
                        <p style={{ fontSize: "11px", marginTop: "5px" }}>May be used to assist delivery</p>
                    </div>
                    <button type="button" disabled={this.validateDetails()} class="btn btn-secondary" onClick={this.submitForm} style={{ width: "18%", fontSize: "13px", marginBottom: "20px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "center" }}>
                        <span style={{ textAlign: "center", paddingTop: "3px" }}>Add address</span>
                    </button>
                </div>
            </div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        addressRedirect: state.profile.addressRedirect
    };
};


function mapDispatchToProps(dispatch) {
    return {
        addAddress: payload => dispatch(addAddress(payload)),
        editAddress: payload => dispatch(editAddress(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerAddress);