import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from '@material-ui/core/TablePagination';
import { fetchSellerOrders, updateOrderStatus } from '../../redux/actions/orders'
import Loading from '../loading';
import SnackBar from '../snackbar';
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
            currentProdImage: "",
            page: 0,
            rowsPerPage: 10
        };
        this.changeNavTileStyle = this.changeNavTileStyle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps.sellerOrders
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    changeNavTileStyle = index => {
        let nav = ["orderNavTiles", "orderNavTiles", "orderNavTiles"];
        nav[index] = "orderNavTilesActive"
        let filter = []
        if (index === 0) filter = ["Ordered"];
        if (index === 1) filter = ["Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery"];
        if (index === 2) filter = ["Cancelled"];
        this.props.fetchSellerOrders(filter);
        this.setState({
            orderTiles: nav,
            currentTab: index,
            filter: filter
        })
    }

    componentDidMount() {
        this.props.fetchSellerOrders("Ordered");
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
                "location": "Cancelled By Seller"
            }
        }
        this.props.updateOrderStatus(data, "home", this.state.filter)
        this.setState({
            cancelModal: false
        })
    }
    calculateSubtotal = (order) => {
        let subtotal = 0;
        order.products.map(product => {
            subtotal = subtotal + (product.price * product.quantity)
        })
        return subtotal.toFixed(2)
    }

    calculateGiftTotal = (order) => {
        let subtotal = 0;
        order.products.map(product => {
            if (product.gift === true) {
                let price = 0
                price = price + (product.price * product.quantity)
                price = (price * (5 / 100))
                subtotal = subtotal + price
            }
        })
        return subtotal.toFixed(2)
    }

    calculateTotal = (order) => {
        let gift = this.calculateGiftTotal(order)
        let subtotal = this.calculateSubtotal(order)
        let total = parseFloat(gift) + parseFloat(subtotal)
        return total.toFixed(2)
    }

    calculateGrandTotal = (order) => {
        let total = this.calculateTotal(order)
        let tax = total * 9.25 / 100
        total = parseFloat(total) + parseFloat(tax)
        return total.toFixed(2)
    }

    render() {
        return (
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Loading />
                <SnackBar />
                <Dialog open={this.state.cancelModal} onClose={this.toggleModal} >
                    <DialogTitle id="form-dialog-title">
                        <h5>Are You Sure you want to Cancel this Order?</h5>
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
                    <Link to={'/seller/profile'} style={{ textDecoration: "none" }}>Your Account</Link> >
                     <span style={{ color: "#c45500" }}> Your Orders</span>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-md-5" style={{ padding: "0px" }}>
                        <p style={{ fontSize: "25px" }}>Your Orders</p>
                    </div>
                    {/* <div className="col-md-7" style={{ marginTop: "5px" }} >
                        <div className="col-md-9" >
                            <input className="searchBar form-control" type="text" onChange={this.searchData} placeholder="Search all orders" />
                        </div>
                        <div className="col-md-3" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" >
                                <b style={{ fontSize: "14px", color: "white" }}>Search Orders</b>
                            </button>
                        </div>
                    </div> */}
                </div>
                <span className={this.state.orderTiles[0]} onClick={() => this.changeNavTileStyle(0)}>Orders</span>
                <span className={this.state.orderTiles[1]} onClick={() => this.changeNavTileStyle(1)}>Open Orders</span>
                <span className={this.state.orderTiles[2]} onClick={() => this.changeNavTileStyle(2)}>Cancelled Orders</span>
                <Divider light style={{ margin: "2px 0px 15px" }} />
                <div className="row" style={{ fontSize: "14px" }}>
                    <b>{this.state.orders.length} Orders</b> Found
                </div>
                {this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(order => {
                    // let total = 0;
                    // order.products.map(product => { total = total + product.price })
                    return (
                        <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "20px" }}>
                            <div className="row" style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "4px" }}>
                                <div className="row">
                                    <div className="col-md-3" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>ORDER RECIEVED ON</div>
                                    <div className="col-md-1" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>TOTAL</div>
                                    <div className="col-md-4" style={{ fontSize: '11px', color: "#555555", contrast: "6.9" }}>ORDER BY</div>
                                    <div className="col-md-4" style={{ textAlign: "right", padding: "0px", contrast: "6.9", fontSize: '11px', color: "#555555" }}>
                                        ORDER # <Link to={'/seller/orders/' + order._id} className="linkColor"> <b>{order._id}</b></Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3" style={{ fontSize: '12px', color: "#555555" }}>
                                        {moment(order.placed_on).format("dddd, MMMM Do")}
                                    </div>
                                    <div className="col-md-1" style={{ fontSize: '12px', color: "#555555" }}>${order.products.length > 0 ? (this.calculateGrandTotal(order)) : ""}</div>
                                    <div className="col-md-5" style={{ fontSize: '12px', color: "#555555" }}>
                                        <a className="linkColor">{order.customer_id.name}</a>
                                    </div>

                                    <div className="col-md-3" style={{ textAlign: "right", padding: "0px", fontSize: '12px', color: "#555555" }}>
                                        <Link to={'/seller/orders/' + order._id} className="linkColor">Order Details</Link>
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
                                                    <div>{product.gift === true ? (
                                                        <span style={{ fontSize: "10px", color: "#555555" }}><span class="glyphicon glyphicon-gift"></span> This is a Gift</span>
                                                    ) : ""}</div>
                                                    <p style={{ margin: "0px" }}>Ship To: <b className="linkColor" style={{ color: "#337AB7" }}>{order.address.name}</b></p>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                                    ${product.price.toFixed(2)}
                                                </div>
                                                <div className="row" style={{ marginTop: "10px" }}>
                                                    <Link to={'/seller/orders/' + order._id}>
                                                        <button style={{ backgroundColor: "#e3e3e3", height: "30px", padding: "3px 10px 3px", color: "black" }} type="button" className="btn orderButtons" >
                                                            View Order Details
                                                    </button>
                                                    </Link>
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
                                                {(product.currentStatus !== "Cancelled") ? (
                                                    <div>
                                                        <Link to={'/product/' + product.product_id._id} style={{ color: "black" }}>
                                                            <div className="row">
                                                                <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                                    View product reviews
                                                            </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ) : ("")}
                                            </div>
                                        </div>
                                        <Divider light /></div>)
                            })}
                        </div>
                    )
                })}
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={this.state.orders.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sellerOrders: state.orders.sellerOrders
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSellerOrders: payload => dispatch(fetchSellerOrders(payload)),
        updateOrderStatus: (payload, location, status) => dispatch(updateOrderStatus(payload, location, status))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);