import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchAdminOrders, updateAdminOrderStatus } from '../../redux/actions/orders'
import Loading from '../loading';
import '../css/orders.css'

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            currentProdId: "",
            currentProdName: "",
            currentProdImage: "",
            trackingModal: "",
            orderStatus: "",
            statusesToShow: [],
            status: "",
            location: "",
            search: "",
            filter: "All",
            orderStatuses: ["All", "Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery", "Delivered", "Cancelled"]
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps.adminOrders
        })
    }

    componentDidMount() {
        this.props.fetchAdminOrders("All", "");
    }

    toggleModal = () => {
        this.setState({
            cancelModal: !this.state.cancelModal,
            currentProdId: "",
            currentProdName: "",
            currentProdImage: ""
        })
    }

    enableModal = (id, name, image) => {
        this.setState({
            cancelModal: true,
            currentProdId: id,
            currentProdName: name,
            currentProdImage: image
        })
    }

    cancelOrder = () => {
        const { match: { params } } = this.props;
        let data = {
            "orderId": params.id,
            "productId": this.state.currentProdId,
            "status": {
                "status": "Cancelled",
                "updated_at": new Date().toISOString(),
                "location": "Cancelled By Amazon"
            }
        }
        this.props.updateAdminOrderStatus(data, "", "All")
        this.setState({
            cancelModal: false
        })
    }

    toggleTrackingModal = () => {
        this.setState({
            trackingModal: !this.state.trackingModal,
            currentProdId: "",
            currentProdName: "",
            currentProdImage: ""
        })
    }

    enableTrackingModal = (id, name, image, status) => {
        this.setState({
            status: status,
            orderStatus: status,
            trackingModal: true,
            currentProdId: id,
            currentProdName: name,
            currentProdImage: image,
            statusesToShow: ["Package Arrived", "Out For Delivery", "Delivered"].filter(x => ![status].includes(x))
        })
    }

    changeOrderStatus = (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        let data = {
            "orderId": params.id,
            "productId": this.state.currentProdId,
            "status": {
                "status": this.state.status,
                "updated_at": new Date().toISOString(),
                "location": this.state.location
            }
        }
        this.props.updateAdminOrderStatus(data, "", "All")
        this.setState({
            trackingModal: false
        })
    }

    changeStatus = (value) => {
        this.setState({
            status: value
        })
    }

    changeFilter = (value) => {
        this.setState({
            filter: value
        }, () => this.filterProducts())
    }

    changeLocation = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    filterProducts = () => {
        this.props.fetchAdminOrders(this.state.filter, this.state.search);
    }

    render() {
        return (
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Dialog open={this.state.cancelModal} onClose={this.toggleModal} >
                    <DialogTitle id="form-dialog-title">
                        <h5>Are You Sure you want to Cancel this Item?</h5>
                        <span>
                            <img src={this.state.currentProdImage} style={{ height: "50px", width: "50px" }} />
                        </span>
                        <span style={{ marginLeft: "10px", overflowY: "hidden", textOverflow: "ellipsis" }}>
                            <b>{this.state.currentProdName}</b>
                        </span>
                    </DialogTitle>
                    <DialogActions>
                        <button type="button" class="btn btn-secondary orderButtons" style={{ height: "30px" }} onClick={this.toggleModal} >
                            Back
                        </button>
                        <button type="button" class="btn amazonButton" onClick={this.cancelOrder}>
                            Yes, Cancel Order
                            </button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth={120} open={this.state.trackingModal} onClose={this.toggleTrackingModal} >
                    <form onSubmit={this.changeOrderStatus}>
                        <DialogTitle id="form-dialog-title">
                            <div class="row" >
                                <h5>Update Order Status</h5>
                                <span>
                                    <img src={this.state.currentProdImage} style={{ height: "50px", width: "50px" }} />
                                </span>
                                <span style={{ marginLeft: "10px", overflowY: "hidden", textOverflow: "ellipsis" }}>
                                    <b>{this.state.currentProdName}</b>
                                </span>
                            </div>
                            <div class="dropdown row" style={{ marginBottom: "15px", marginTop: "15px" }}>
                                <b className="row">Update Product Status:</b>
                                <button class="form-control btn btn-default dropdown-toggle " type="button" data-toggle="dropdown" style={{ marginLeft: "0px", height: "25px", fontSize: "13px", padding: "3px 15px 3px", width: "max-content" }}>
                                    {this.state.status} <span class="caret" style={{ paddingBottom: "3px" }}></span>
                                </button>
                                <ul class="dropdown-menu" role="menu" style={{ fontSize: "11px", minWidth: "max-content", cursor: "pointer" }} >
                                    {this.state.statusesToShow.map(value => {
                                        return (<li ><a onClick={() => this.changeStatus(value)}>{value}</a></li>)
                                    })}
                                </ul>
                            </div>
                            <div class="form-group" style={{ width: "50%" }}>
                                <label for="exampleInputEmail1">Location</label>
                                <input type="text" autoComplete="off" class="form-control" id="exampleInputEmail1" onChange={this.changeLocation} required aria-describedby="emailHelp" placeholder="Enter the location" />
                            </div>
                        </DialogTitle>
                        <DialogActions>
                            <button type="button" class="btn btn-secondary orderButtons" style={{ height: "30px" }} onClick={this.toggleTrackingModal} >
                                Back
                        </button>
                            <button type="submit" class="btn amazonButton">
                                Update
                            </button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Loading />
                <div className="row" style={{ fontSize: "13px", marginBottom: "10px" }}>
                    <Link to={'/customer/' + sessionStorage.getItem("id")} style={{ textDecoration: "none" }}>Your Account</Link> >
                     <span style={{ color: "#c45500" }}> Orders</span>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-3" style={{ padding: "0px" }}>
                        <p style={{ fontSize: "25px" }}>All Orders</p>
                    </div>
                    <div className="col-md-6" style={{ marginTop: "5px", textAlign: "left" }} >
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            <input className="searchBar form-control" type="text" onChange={this.handleSearchChange} placeholder="Search all orders" />
                        </div>
                        <div className="col-md-4" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.filterProducts}>
                                <b style={{ fontSize: "14px", color: "white" }}>Search Orders</b>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div class="dropdown " style={{ marginBottom: "15px", marginTop: "5px" }}>
                            <button class="form-control btn btn-default dropdown-toggle " type="button" data-toggle="dropdown" style={{ marginLeft: "0px", height: "35px", fontSize: "13px", padding: "3px 15px 3px", width: "140px" }}>
                                {this.state.filter} <span class="caret" style={{ paddingBottom: "3px" }}></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style={{ fontSize: "11px", minWidth: "max-content", cursor: "pointer" }} >
                                {this.state.orderStatuses.map(value => {
                                    return (<li ><a onClick={() => this.changeFilter(value)}>{value}</a></li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <Divider light style={{ margin: "2px 0px 15px" }} />
                <div className="row" style={{ fontSize: "14px" }}>
                    <b>{this.state.orders.length} Orders</b> Found
                </div>
                {this.state.orders.map(order => {
                    let total = 0;
                    order.products.map(product => { total = total + product.price })
                    return (
                        <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "20px" }}>
                            <div className="row" style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "4px" }}>
                                <div className="row">
                                    <div className="col-md-3" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>ORDER PLACED ON</div>
                                    <div className="col-md-1" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>TOTAL</div>
                                    <div className="col-md-3" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>SHIP TO</div>
                                    <div className="col-md-2" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>ORDERED BY</div>
                                    <div className="col-md-3" style={{ textAlign: "right", padding: "0px", contrast: "6.9", fontSize: '11px', color: "#555555" }}>
                                        ORDER # <a className="linkColor"> {order._id}</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3" style={{ fontSize: '12px', color: "#555555" }}>
                                        {moment(order.placed_on).format("dddd, MMMM Do")}
                                    </div>
                                    <div className="col-md-1" style={{ fontSize: '12px', color: "#555555" }}>${total}</div>
                                    <div className="col-md-3" style={{ fontSize: '12px', color: "#555555" }}>
                                        <a className="linkColor">{order.address.name}</a>
                                    </div>
                                    <div className="col-md-3" style={{ fontSize: '12px', color: "#555555" }}>
                                        <a className="linkColor">{order.customer_id.name}</a>
                                    </div>
                                </div>
                            </div>
                            {order.products.map(product => {
                                return (
                                    <div>
                                        <div className="row" style={{ margin: "10px 20px 10px" }}>
                                            <span style={{ fontWeight: "700", fontSize: "13px" }}>
                                                Recent Update: <span style={{ color: "#c45500" }}>
                                                    {product.tracking[product.tracking.length - 1].status}
                                                    &nbsp; {moment(product.tracking[product.tracking.length - 1].updated_at).format("MMMM Do, YYYY")}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="row" style={{ marginLeft: "5px", marginBottom: "25px" }}>
                                            <div className="col-md-1"><img src={product.product_id.images[0]} style={{ height: "60px", width: "60px" }} /></div>
                                            <div className="col-md-8">
                                                <div className="row" style={{ fontSize: "13px" }}>
                                                    <Link to={'/product/' + product.product_id._id} className="linkColor">{product.product_id.name}</Link>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#555555" }}>
                                                    <p style={{ margin: "0px" }}>
                                                        <b>Sold By:</b> <Link to={{
                                                            pathname: "/seller/profile",
                                                            state: {
                                                                seller: product.seller_id,
                                                                isSeller: false,
                                                            }
                                                        }} className="linkColor">{product.seller_id.name}</Link>
                                                    </p>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                                    ${product.price}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                {(product.currentStatus !== "Cancelled" && product.currentStatus !== "Delivered") ? (
                                                    <div className="row" style={{ marginBottom: "5px" }}>
                                                        <button type="button" class="btn amazonButton" style={{ width: "100%" }} onClick={() => this.enableModal(product._id, product.product_id.name, product.product_id.images[0])}>
                                                            Cancel Order
                                                        </button>
                                                    </div>
                                                ) : ("")}
                                                {(product.currentStatus === "Out For Shipping" || product.currentStatus === "Package Arrived" || product.currentStatus === "Out For Delivery") ? (
                                                    <div className="row" style={{ marginBottom: "5px" }}>
                                                        <button type="button" class="btn amazonButton" style={{ width: "100%" }} onClick={() => this.enableTrackingModal(product._id, product.product_id.name, product.product_id.images[0], product.currentStatus)}>
                                                            Change Order Status
                                                </button>
                                                    </div>
                                                ) : ("")}
                                            </div>
                                        </div>
                                        <Divider light /></div>)
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminOrders: state.orders.adminOrders
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchAdminOrders: (status, search) => dispatch(fetchAdminOrders(status, search)),
        updateAdminOrderStatus: (payload, status, search) => dispatch(updateAdminOrderStatus(payload, status, search))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);