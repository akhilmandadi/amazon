import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from 'lodash';
import { fetchCustomerOrders, updateOrderStatus } from '../../redux/actions/orders'
import Loading from '../loading';
import '../css/orders.css'

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderTiles: ["orderNavTilesActive", "orderNavTiles", "orderNavTiles"],
            currentTab: 0,
            filter: ["Ordered"],
            cancelModal: false,
            currentProdId: "",
            currentProdName: "",
            currentProdImage: ""
        };
        this.changeNavTileStyle = this.changeNavTileStyle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps.customerOrders
        })
    }

    changeNavTileStyle = index => {
        let nav = ["orderNavTiles", "orderNavTiles", "orderNavTiles"];
        nav[index] = "orderNavTilesActive"
        let filter = []
        if (index === 0) filter = ["Ordered"];
        if (index === 1) filter = ["Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery"];
        if (index === 2) filter = ["Cancelled"];
        this.props.fetchCustomerOrders(filter);
        this.setState({
            orderTiles: nav,
            currentTab: index,
            filter: filter
        })
    }

    componentDidMount() {
        this.props.fetchCustomerOrders("Ordered");
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
                "location": "Cancelled By Customer"
            }
        }
        this.props.updateOrderStatus(data, "home", this.state.filter)
        this.setState({
            cancelModal: false
        })
    }

    render() {
        let ordersBanner = null;
        if (_.isEmpty(this.props.customerOrders) && !this.props.loading) {
            ordersBanner = (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <div>Looking for an order? There are no active orders currently!</div>
                    <div className="row" style={{ marginBottom: "5px" }}>
                        <Link to='/catalog'>
                            <span class="linkColor"  >
                                Go Browse the Product Catalog
                            </span>
                        </Link>
                    </div>
                </div>
            )
        }
        return (
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Loading />
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
                <div className="row" style={{ fontSize: "13px", marginBottom: "10px" }}>
                    <Link to={'/customer/' + sessionStorage.getItem("id")} style={{ textDecoration: "none" }}>Your Account</Link> >
                     <span style={{ color: "#c45500" }}> Your Orders</span>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-5" style={{ padding: "0px" }}>
                        <p style={{ fontSize: "25px" }}>Your Orders</p>
                    </div>
                    <div className="col-md-7" style={{ marginTop: "5px" }} >
                        <div className="col-md-9" >
                            <input className="searchBar form-control" type="text" onChange={this.searchData} placeholder="Search all orders" />
                        </div>
                        <div className="col-md-3" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" >
                                <b style={{ fontSize: "14px", color: "white" }}>Search Orders</b>
                            </button>
                        </div>
                    </div>
                </div>
                <span className={this.state.orderTiles[0]} onClick={() => this.changeNavTileStyle(0)}>Orders</span>
                <span className={this.state.orderTiles[1]} onClick={() => this.changeNavTileStyle(1)}>Open Orders</span>
                <span className={this.state.orderTiles[2]} onClick={() => this.changeNavTileStyle(2)}>Cancelled Orders</span>
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
                                    <div className="col-md-3" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>ORDER PLACED</div>
                                    <div className="col-md-1" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>TOTAL</div>
                                    <div className="col-md-4" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>SHIP TO</div>
                                    <div className="col-md-4" style={{ textAlign: "right", padding: "0px", contrast: "6.9", fontSize: '11px', color: "#555555" }}>ORDER # {order._id}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3" style={{ fontSize: '12px', color: "#555555" }}>
                                        {moment(order.placed_on).format("dddd, MMMM Do")}
                                    </div>
                                    <div className="col-md-1" style={{ fontSize: '12px', color: "#555555" }}>${total}</div>
                                    <div className="col-md-4" style={{ fontSize: '12px', color: "#555555" }}>
                                        <a className="linkColor">{order.address.name}</a>
                                    </div>

                                    <div className="col-md-3" style={{ textAlign: "right", padding: "0px", fontSize: '12px', color: "#555555" }}>
                                        <Link to={'/orders/' + order._id} className="linkColor">Order Details</Link> | <a className="linkColor" >Invoice</a>
                                    </div>
                                </div>
                            </div>
                            {order.products.map(product => {
                                return (
                                    <div>
                                        <div className="row" style={{ margin: "10px 20px 10px" }}>
                                            <span style={{ fontWeight: "700", fontSize: "15px" }}>
                                                {product.tracking[product.tracking.length - 1].status}
                                                &nbsp;{moment(product.tracking[product.tracking.length - 1].updated_at).format("MMMM Do, YYYY")}
                                            </span>
                                        </div>
                                        <div className="row" style={{ marginLeft: "5px", marginBottom: "25px" }}>
                                            <div className="col-md-1"><img src={product.product_id.images[0]} style={{ height: "60px", width: "60px" }} /></div>
                                            <div className="col-md-8">
                                                <div className="row" style={{ fontSize: "13px" }}>
                                                    <Link to={'/product/' + product.product_id._id} className="linkColor">{product.product_id.name}</Link>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#555555" }}>
                                                    <p style={{ margin: "0px" }}>Sold By: <Link to={{
                                                            pathname: "/seller/profile",
                                                            state: {
                                                                seller: product.seller_id,
                                                                isSeller: false,
                                                            }
                                                        }}  className="linkColor">{product.seller_id.name}</Link> | Product question?
                                                    <Link to={{
                                                            pathname: "/seller/profile",
                                                            state: {
                                                                seller: product.seller_id,
                                                                isSeller: false,
                                                            }
                                                        }}  className="linkColor"> Ask seller</Link></p>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                                    ${product.price}
                                                </div>
                                                <div className="row" style={{ marginTop: "5px" }}>
                                                    <Link to={'/product/' + product.product_id._id}>
                                                        <button style={{ backgroundColor: "#f0c14b", marginRight: "10px", height: "30px", color: "black", padding: "3px 10px 3px", border: "1px solid #a88734" }}
                                                            type="button" class="btn" >
                                                            <img style={{ height: "20px", width: "20px" }}
                                                                src="https://m.media-amazon.com/images/G/01/AUIClients/YourAccountOrderHistoryCSSBuzz-bia_button_with_icon-9b49d8917348b252575f26251838e739ade8186a._V2_.png"></img> Buy it again
                                                        </button>
                                                    </Link>
                                                    <Link to={'/orders/' + order._id}>
                                                        <button style={{ backgroundColor: "#e3e3e3", height: "30px", padding: "3px 10px 3px", color: "black" }} type="button" className="btn orderButtons" >
                                                            View your item
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                {(product.currentStatus !== "Cancelled" && product.currentStatus !== "Delivered" && this.state.currentTab === 1) ? (
                                                    <div className="row" style={{ marginBottom: "5px" }}>
                                                        <button type="button" class="btn amazonButton" style={{ width: "100%" }} onClick={() => this.enableModal(product._id, product.product_id.name, product.product_id.images[0])}>
                                                            Cancel
                                                    </button>
                                                    </div>
                                                ) : ("")}
                                                {(product.currentStatus !== "Cancelled") ? (
                                                    <div>
                                                        <div className="row" style={{ marginBottom: "5px" }}>
                                                            <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                                Ask Product Question
                                                    </button>
                                                        </div>
                                                        <div className="row" style={{ marginBottom: "5px" }}>
                                                            <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                                Leave seller feedback
                                                    </button>
                                                        </div>
                                                        <div className="row">
                                                            <Link to={{ pathname: '/review/review-your-purchases', state:{productName: product.product_id.name, productId: product.product_id._id, productImage: product.product_id.images[0] }}}>
                                                                <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px 10px 3px", color: "black" }} type="button" className="btn orderButtons" >
                                                                    Write a product review
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : ("")}
                                            </div>
                                        </div>
                                        <Divider light />
                                    </div>)
                            })}
                        </div>
                    )
                })}
                {ordersBanner}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customerOrders: state.orders.customerOrders,
        loading: state.common.loading
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchCustomerOrders: payload => dispatch(fetchCustomerOrders(payload)),
        updateOrderStatus: (payload, location, status) => dispatch(updateOrderStatus(payload, location, status))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);