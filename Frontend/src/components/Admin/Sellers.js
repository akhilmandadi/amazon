import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';
import { fetchSellerProfiles } from '../../redux/actions/adminActions'
import Loading from '../loading';
import '../css/orders.css';

class SellerProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellers: [],
            search: "",
            redirectVar : ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sellers: nextProps.sellerDetails
        })
    }

    componentDidMount() {
        this.props.fetchSellerProfiles("");
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    filterProducts = () => {
        this.props.fetchSellerProfiles(this.state.search);
    }
    onSellerProfile = (seller)=>{
        let url = "/seller/profile";
        this.setState({
            redirectVar: <Redirect to={{
                pathname: url,
                state: {
                    seller: seller,
                    isSeller: false,
                }
            }} />
        })
        
    }

    render() {
        return (
          
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Loading />
                {this.state.redirectVar}
                <div className="row" style={{ fontSize: "13px", marginBottom: "10px" }}>
                    Your Account >
                     <span style={{ color: "#c45500" }}> Sellers</span>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-4" style={{ padding: "0px" }}>
                        <p style={{ fontSize: "25px" }}>Sellers</p>
                    </div>
                    <div className="col-md-8" style={{ marginTop: "5px", textAlign: "left", padding: "0px" }} >
                        <div className="col-md-9" style={{ padding: "0px" }}>
                            <input className="searchBar form-control" type="text" onChange={this.handleSearchChange} placeholder="Search all sellers" />
                        </div>
                        <div className="col-md-3" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.filterProducts}>
                                <b style={{ fontSize: "14px", color: "white" }}>Search Sellers</b>
                            </button>
                        </div>
                    </div>
                </div>
                <Divider light style={{ margin: "2px 0px 15px" }} />
                <div className="row" style={{ fontSize: "14px" }}>
                    <b>{this.state.sellers.length} Sellers</b> Found
                </div>
                <div className="row">
                    {this.state.sellers.map(seller => {
                        return (
                            <div className="col-md-4" style={{padding: "10px"}}>
                                <div className="row" style={{ backgroundColor: "#f2f2f2", borderRadius: "5px",padding: "10px", border: "1.5px solid #edebeb", backgroundColor: "#f2f2f2", margin: "0px 10px 0px" }}>
                                    <div className="col-md-4" style={{ fontSize: '12px', color: "", marginLeft: "0px" }}>
                                        {_.isUndefined(seller.image) ? (
                                            <Avatar variant="square" style={{ width: "50px", height: "50px", backgroundColor: "#f0c14b" }}>
                                                <b style={{ fontSize: "30px" }}>{seller.name.substr(0, 1).toUpperCase()}</b>
                                            </Avatar>
                                        ) : (
                                                <Avatar src={seller.image} variant="square" style={{ width: "80px", height: "80px" }} />
                                            )}
                                    </div>
                                    <div className="col-md-7" style={{ fontSize: '12px', color: "#555555" }} onClick = {()=>{this.onSellerProfile(seller)}}>
                                        <div><Link className="linkColor"><b style={{ fontSize: '16px' }}>{seller.name}</b></Link></div>
                                        <div><a className="linkColor">{seller.email}</a></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sellerDetails: state.admin.sellerDetails
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSellerProfiles: (search) => dispatch(fetchSellerProfiles(search))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfiles);