import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import { fetchCustomerOrders } from '../../redux/actions/orders'
import Loading from '../loading';
import '../css/orders.css'

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps.customerOrders
        })
    }

    componentDidMount() {
        this.props.fetchCustomerOrders();
    }

    render() {
        return (
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Loading />
                <div className="row">
                    <div className="col-md-5">
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
                <Divider light style={{ margin: "5px 0px 10px" }} />
                <div className="row" style={{ fontSize: "14px" }}>
                    <b>{this.state.orders.length} Orders</b> Placed by you recently
                </div>
                {this.state.orders.map(order => {
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
                                    <div className="col-md-1" style={{ fontSize: '12px', color: "#555555" }}>${order.total}</div>
                                    <div className="col-md-4" style={{ fontSize: '12px', color: "#555555" }}>
                                        <a>{order.address.name}</a>
                                    </div>

                                    <div className="col-md-3" style={{ textAlign: "right", padding: "0px", fontSize: '12px', color: "#555555" }}>
                                        <Link to={'/orders/' + order._id}>Order Details</Link> | <a >Invoice</a>
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
                                                    <Link to={'/product/' + product.product_id._id}>{product.product_id.name}</Link>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#555555" }}>
                                                    <p style={{ margin: "0px" }}>Sold By: <Link to={'/seller/' + product.seller_id._id}>{product.seller_id.name}</Link> | Product question?
                                                    <Link to={'/seller/' + product.seller_id._id}> Ask seller</Link></p>
                                                </div>
                                                <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                                    ${product.price}
                                                </div>
                                                <div className="row" style={{ marginTop: "5px" }}>
                                                    <Link to={'/product/' + product.product_id._id}>
                                                        <button style={{ backgroundColor: "#f0c14b", marginRight: "10px", height: "30px", color:"black", padding: "3px 10px 3px", border: "1px solid #a88734" }}
                                                            type="button" class="btn" >
                                                            <img style={{ height: "20px", width: "20px" }}
                                                                src="https://m.media-amazon.com/images/G/01/AUIClients/YourAccountOrderHistoryCSSBuzz-bia_button_with_icon-9b49d8917348b252575f26251838e739ade8186a._V2_.png"></img> Buy it again
                                                        </button>
                                                    </Link>
                                                    <Link to={'/orders/' + order._id}>
                                                        <button style={{ backgroundColor: "#e3e3e3", height: "30px", padding: "3px 10px 3px", color:"black" }} type="button" className="btn orderButtons" >
                                                            View your item
                                                    </button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
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
                                                    <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                        Write a product review
                                                    </button>
                                                </div>
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
        customerOrders: state.orders.customerOrders
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchCustomerOrders: payload => dispatch(fetchCustomerOrders(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);