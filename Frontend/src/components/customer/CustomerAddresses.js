import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import '../css/orders.css';
import Amazon from '../images/amazon.PNG';
import { getAddresses } from '../../redux/actions/profile';
import { removeAddress } from '../../redux/actions/profile';

class CustomerAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
        this.removeAddress = this.removeAddress.bind(this);
    }

    componentDidMount() {
        this.props.getAddresses(sessionStorage.getItem("id"))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            addresses: nextProps.customerAddresses
        })
    }

    removeAddress = (id) => {
        const data =
        {
            address_id: id,
            customer_id: sessionStorage.getItem("id")
        }
        this.props.removeAddress(data);
    }

    render() {

        let addAddress =
            (<Link to="/profile/addresses/add">
                <div class="col-md-4 " style={{ padding: "10px", cursor: "pointer" }}>
                    <div class="row well well-lg" style={{ borderColor: "#c7c7c7", borderStyle: "dashed", borderWidth: "2px", textAlign: "center", padding: "20px 26px 20px 26px", minHeight: "266px", maxHeight: "266px" }}>
                        <p ><span class="glyphicon glyphicon-plus" style={{ marginTop: "60px", color: "#c7c7c7", fontSize: "40px" }}></span></p>
                        <p style={{ color: "#767676", fontSize: "21px", fontWeight: "700" }}>Add address</p>
                    </div>
                </div>
            </Link>
            )

        let displayAddress =
            (
                this.state.addresses.map((address, index) => {
                    return (
                        <div class="col-md-4 " style={{ padding: "10px" }}>
                            <div class="row well well-lg" style={{ fontSize: "13px", borderColor: "#c7c7c7", boxShadow: "0 2px 1px 0 rgba(0,0,0,.16)", minHeight: "266px", maxHeight: "266px", paddingLeft: "20px", paddingTop: "20px" }}>
                                <div style={{ minHeight: "206px", maxHeight: "206px" }}>
                                    {index === 0 ? <p><p style={{ color: "#555555", display: "inline" }}>Default:&nbsp;&nbsp;</p><img style={{ display: "inline" }} src={Amazon} height="18" width="50" /><hr style={{ width: "118%", marginLeft: "-20px", marginTop: "5px", marginBottom: "0px" }} /></p> : ""}
                                    <p style={{ marginBottom: "2px", fontWeight: "700" }}>{address.name}</p>
                                    <p style={{ marginBottom: "2px" }}>{address.line1}</p>
                                    <p style={{ marginBottom: "2px" }}>{address.line2}</p>
                                    <p style={{ marginBottom: "2px", display: "inline" }}>{address.city},&nbsp;</p>
                                    <p style={{ marginBottom: "2px", display: "inline" }}>{address.state}&nbsp;</p>
                                    <p style={{ marginBottom: "2px", display: "inline" }}>{address.zipcode}</p>
                                    <p style={{ marginBottom: "2px" }}>{address.country}</p>
                                    <p style={{ marginBottom: "2px" }}>Phone number: {address.phone}</p>
                                </div>
                                <div>
                                    <a ><Link className="linkColor" to={{
                                        pathname: "/profile/addresses/add",
                                        state: {
                                            address: address
                                        }
                                    }}>Edit</Link></a>
                                    <p style={{ color: "#555555", display: "inline" }}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
                                    <a className="linkColor" style={{ display: "inline", cursor: "pointer" }} onClick={() => this.removeAddress(address._id)}>Remove</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            )

        return (
            <div class="container" style={{ marginTop: "30px", width: "72%" }}>
                <Link to="/customer/account" className="linkColor"><p style={{ fontSize: "13px", display: "inline" }}>Your Account </p></Link>
                <p style={{ fontSize: "13px", color: "#555555", display: "inline" }}>&nbsp;>&nbsp;</p>
                <p style={{ fontSize: "13px", color: "#C45500", display: "inline" }}>Your Addresses</p>
                <p style={{ marginTop: "10px", marginBottom: "30px", fontSize: "28px", color: "#111111", fontWeight: "400" }}>Your Addresses</p>
                <div class="row">
                    {addAddress}
                    {displayAddress}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customerAddresses: state.profile.customerAddresses
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getAddresses: payload => dispatch(getAddresses(payload)),
        removeAddress: payload => dispatch(removeAddress(payload))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddresses);