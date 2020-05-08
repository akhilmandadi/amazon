import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchOrderDetails, updateOrderStatus } from '../../redux/actions/orders'
import Loading from '../loading';
import '../css/orders.css'

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                "products": [],
                "address": {},
                "payment": {}
            },
            cancelModal: false,
            currentProdId: "",
            currentProdName: "",
            currentProdImage: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            order: nextProps.customerOrderDetails
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.fetchOrderDetails(params.id);
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
        this.props.updateOrderStatus(data, "", "")
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
                <Loading />
                <div className="row" style={{ fontSize: "13px" }}>
                    <Link to={'/customer/account'} style={{ textDecoration: "none" }}>Your Account</Link> >
                    <Link to={'/your-account/order-history'} style={{ textDecoration: "none" }}> Your Orders</Link> > <span style={{ color: "#c45500" }}>Order Details</span>
                </div>
                <div className="row">
                    <div className="col-md-5" style={{ padding: "10px 0px 10px" }}>
                        <p style={{ fontSize: "25px", margin: "0px" }}>Order Details</p>
                    </div>
                </div>
                <div className="row" style={{ fontSize: "14px" }}>
                    Ordered on {moment(this.state.order.placed_on).format("MMMM Do, YYYY")} | Order# {this.state.order._id}
                </div>
                <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "10px", padding: "10px" }}>
                    <div className="col-md-4">
                        <div style={{ fontSize: "13px", marginBottom: "4px" }}><b>Shipping Address</b></div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.name}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.line1}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.line2}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.city}, {this.state.order.address.state}, {this.state.order.address.zipcode}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.country}</div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ fontSize: "13px", marginBottom: "4px" }}><b>Payment Method</b></div>
                        <div style={{ fontSize: "13px" }}>
                            <img alt="Visa" src="https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/card-logos-small/visa._CB485936331_.gif" />
                            &nbsp;<b>****</b> {_.isUndefined(this.state.order.payment.card_number) ? "" : this.state.order.payment.card_number.substr(12, 4)}
                        </div>
                    </div>
                    <div className="col-md-4" style={{ fontSize: "13px" }}>
                        <div style={{ fontSize: "13px", marginBottom: "2px" }} className="row"><b>Order Summary</b></div>
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            Items(s) Subtotal:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ {this.state.order.products.length > 0 ? this.calculateSubtotal(this.state.order) : ""}
                        </div>
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            Shipping & Handling:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ 0.0
                        </div>
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            Other Charges (Gift):
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ {this.state.order.products.length > 0 ? this.calculateGiftTotal(this.state.order) : ""}
                        </div>
                        <div className="col-md-8" style={{ padding: "10px 0px 0px" }}>
                            Total before tax:
                        </div>
                        <div className="col-md-4" style={{ float: "right", padding: "10px 15px 0px" }}>
                            $ {this.state.order.products.length > 0 ? (this.calculateTotal(this.state.order)) : ""}
                        </div>
                        <div className="col-md-7" style={{ padding: "0px" }}>
                            Estimated tax to be collected:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ {this.state.order.products.length > 0 ? (this.calculateTotal(this.state.order) * 9.25 / 100).toFixed(2) : ""}
                        </div>
                        <div className="col-md-8" style={{ padding: "10px 0px 0px" }}>
                            <b>Grand Total:</b>
                        </div>
                        <div className="col-md-4" style={{ float: "right", padding: "10px 15px 0px" }}>
                            <b> $ {this.state.order.total}</b>
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.order.products.map(product => {
                        return (
                            <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "10px" }}>
                                <div className="row" style={{ margin: "10px 20px 10px" }}>
                                    <span style={{ fontWeight: "700", fontSize: "16px" }}>
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
                                        <div className="row" style={{ fontSize: "11px", color: "#555555" }}>
                                            Qty: {product.quantity}
                                        </div>
                                        <div className="row" style={{ fontSize: "12px", color: "#555555" }}>
                                            <div>{product.gift === true ? (
                                                <span style={{ fontSize: "10px", color: "#555555" }}><span class="glyphicon glyphicon-gift"></span> This is a Gift - ({product.message})</span>
                                            ) : ""}</div>
                                            <p style={{ margin: "0px" }}>Sold By:  <Link to={{
                                                pathname: "/seller/profile",
                                                state: {
                                                    seller: product.seller_id,
                                                    isSeller: false,
                                                }
                                            }} className="linkColor">{product.seller_id.name}</Link> | Product question?
                                                    <Link to={{
                                                    pathname: "/seller/profile",
                                                    state: {
                                                        seller: product.seller_id,
                                                        isSeller: false,
                                                    }
                                                }} className="linkColor"> Ask seller</Link></p>
                                        </div>
                                        <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                            ${product.price.toFixed(2)}
                                        </div>
                                        <div className="row" style={{ marginTop: "5px", textDecoration: "none" }}>
                                            <Link to={'/product/' + product.product_id._id}>
                                                <button style={{ backgroundColor: "#f0c14b", marginRight: "10px", height: "30px", padding: "3px 10px 3px", border: "1px solid #a88734", color: "black" }}
                                                    type="button" class="btn" >
                                                    <img style={{ height: "20px", width: "20px" }}
                                                        src="https://m.media-amazon.com/images/G/01/AUIClients/YourAccountOrderHistoryCSSBuzz-bia_button_with_icon-9b49d8917348b252575f26251838e739ade8186a._V2_.png"></img> Buy it again
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        {(product.currentStatus !== "Cancelled" && product.currentStatus !== "Delivered") ? (
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
                                                    <Link to={{ pathname: '/review/review-your-purchases', state: { productName: product.product_id.name, productId: product.product_id._id, productImage: product.product_id.images[0] } }}>
                                                        <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px 10px 3px", color: "black" }} type="button" className="btn orderButtons" >
                                                            Write a product review
                                                                </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : ("")}
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ padding: "10px" }}>
                                    <p style={{ margin: "0px" }}>
                                        <a style={{ textDecoration: "none" }} className="linkColor" data-toggle="collapse" href={'#' + this.state.order._id + product.product_id._id} role="button" >View Tracking History</a>
                                    </p>
                                    <div class="row">
                                        <div class="collapse multi-collapse" id={this.state.order._id + product.product_id._id} >
                                            {product.tracking.map(tracking => {
                                                return (
                                                    <div className="row" style={{ marginTop: "10px", color: "#555555", fontSize: "11px" }}>
                                                        <div className="col-md-3">
                                                            {moment(tracking.updated_at).format("LLLL")}
                                                        </div>
                                                        <div className="col-md-3" style={{ borderLeft: "1px solid #555555" }}>
                                                            <div>{tracking.status}</div>
                                                            <b>{tracking.location}</b>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
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
        customerOrderDetails: state.orders.orderDetails
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchOrderDetails: payload => dispatch(fetchOrderDetails(payload)),
        updateOrderStatus: (payload, location, status) => dispatch(updateOrderStatus(payload, location, status))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);