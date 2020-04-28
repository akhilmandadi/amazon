
import React, { Component } from 'react';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { fetchTopSoldProducts, fetchOrdersPerDay, fetchTopSellers, fetchTopCustomers, fetchTopRatedProducts, fetchTopViewedProducts } from '../../redux/actions/analytics';
import '../css/analytics.css';
import { Redirect } from "react-router";

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productcheck: false,
            ordercheck: false,
            sellercheck: false,
            customercheck: false,
            ratecheck: false,
            viewcheck: false

        }
        this.handleOrders = this.handleOrders.bind(this);
        this.handleProducts = this.handleProducts.bind(this);
        this.handleSellers = this.handleSellers.bind(this);
        this.handleCustomers = this.handleCustomers.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleViews = this.handleViews.bind(this);

    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            productlist: nextProps.productlist,
            orderlist: nextProps.orderlist,
            sellerlist: nextProps.sellerlist,
            customerlist: nextProps.customerlist,
            ratelist: nextProps.ratelist,
            viewlist: nextProps.viewlist,

        })
    }
    handleOrders = () => {
        this.props.fetchOrdersPerDay();
        this.setState({
            productcheck: false,
            ordercheck: true,
            sellercheck: false,
            customercheck: false,
            ratecheck: false,
            viewcheck: false
        })
    }
    handleProducts = () => {
        this.props.fetchTopSoldProducts();
        this.setState({
            productcheck: true,
            ordercheck: false,
            sellercheck: false,
            customercheck: false,
            ratecheck: false,
            viewcheck: false
        })
    }
    handleViews = () => {
        this.props.fetchTopViewedProducts();
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: false,
            customercheck: false,
            ratecheck: false,
            viewcheck: true,
        })
    }
    handleSellers = () => {
        this.props.fetchTopSellers();
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: true,
            customercheck: false,
            ratecheck: false,
            viewcheck: false,
        })
    }
    handleCustomers = () => {
        this.props.fetchTopCustomers();
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: false,
            customercheck: true,
            ratecheck: false,
            viewcheck: false,
        })
    }
    handleRating = () => {
        this.props.fetchTopRatedProducts();
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: false,
            customercheck: false,
            ratecheck: true,
            viewcheck: false
        })
    }
  

   
    render() {
        let graph = null;
        let redirectVar=null;
        if(sessionStorage && sessionStorage.getItem('persona') !== 'admin' ){
        redirectVar = <Redirect to= "/Signup"/>
        }
        
        if (this.state.productcheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.productlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="productname" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="quantity" barSize={50} fill="#ab6361" />

                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>TOP 5 MOST SOLD PRODUCTS</div>

                </div>

            </div>
            )
        }
        if (this.state.ordercheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.orderlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="count" barSize={10} fill="#a88734" />

                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>NO.OF ORDERS PER DAY</div>

                </div>

            </div>
            )
        }
        if (this.state.sellercheck) {
            let data = [
                {
                    "name": "sony",
                    "amount": 1140
                }
            ]
            console.log(data)
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.state.sellerlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="amount" barSize={50} fill="#34b4eb" />

                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>>TOP 5 SELLERS BASED ON TOTAL SALES AMOUNT </div>

                </div>

            </div>
            )
        }
        if (this.state.customercheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.customerlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" barSize={50} fill="#61ab8b" />
                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>TOP 5 CUSTOMERS BASED ON TOTAL PURCHASE AMOUNT </div>


                </div>

            </div>
            )
        }
        if (this.state.ratecheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.ratelist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="rating" barSize={50} fill="#413ea0" />

                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>TOP 10 PRODUCTS BASED ON RATING </div>


                </div>

            </div>
            )
        }
        if (this.state.viewcheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.viewlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="topviews" barSize={50} fill=" rgb(211, 100, 9)" />

                    </ComposedChart>
                    <div style={{fontWeight:"bold"}}>TOP 10 PRODUCTS VIEWED PER DAY </div>

                </div>

            </div>
            )
        }
        return (
        <div>
        {redirectVar}
            <div class="row">
                <div class="col-md-2" style={{paddingLeft:"0px"}}>
                    <div class="sidebar" style={{"margin-top":"1px",textAlign:"center"}}>
                        <header>My Analytics</header>
                        <ul>
                            <div onClick={() => this.handleProducts()} >Products</div>
                            <div onClick={() => this.handleSellers()} >Sellers</div>
                            <div onClick={() => this.handleCustomers()} >Customers</div>
                            <div onClick={() => this.handleRating()} >Rating</div>
                            <div onClick={() => this.handleViews()} >Views</div>
                            <div onClick={() => this.handleOrders()} >Orders</div>

                        </ul>
                    </div>

                </div>
                <div class="col-md-6" style={{"margin-top":"70px"}} >{graph}
                </div>
            </div>
        </div>

        );
    }
}
const mapStateToProps = state => {
    return {

        productlist: state.analytics.productlist,
         orderlist:state.analytics.orderlist,
        sellerlist: state.analytics.sellerlist,
        customerlist: state.analytics.customerlist,
        ratelist: state.analytics.ratelist,
        viewlist: state.analytics.viewlist,

    };
};

export default connect(mapStateToProps, { fetchTopSoldProducts, fetchOrdersPerDay, fetchTopSellers, fetchTopCustomers, fetchTopRatedProducts, fetchTopViewedProducts })(Analytics);