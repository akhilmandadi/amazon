
import React, { Component } from 'react';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { fetchTopSoldProducts, fetchOrdersPerDay, fetchTopSellers, fetchTopCustomers, fetchTopRatedProducts, fetchTopViewedProducts } from '../../redux/actions/analytics';
import '../css/analytics.css'
const backgroundColor = [
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(0, 0, 128, 0.6)',
    'rgba(128, 128, 0, 0.6)',
    'rgba(128, 0, 0, 0.6)',
    'rgba(128, 0, 0, 1.0)',
    'rgba(128, 0, 128, 1.0)'
];




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
        this.props.fetchTopSoldProducts();
        this.props.fetchOrdersPerDay();
        this.props.fetchTopSellers();
        this.props.fetchTopCustomers();
        this.props.fetchTopRatedProducts();
        this.props.fetchTopViewedProducts();
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
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: true,
            customercheck: false,
            ratecheck: false,
            viewcheck: false



        })
    }
    handleCustomers = () => {
        this.setState({
            productcheck: false,
            ordercheck: false,
            sellercheck: false,
            customercheck: true,
            ratecheck: false,
            viewcheck: false



        })
    }
    handleRating = () => {
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

                        <Bar dataKey="quantity" barSize={50} fill="#413ea0" />

                    </ComposedChart>

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
                        <XAxis dataKey="productname" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="quantity" barSize={50} fill="#413ea0" />

                    </ComposedChart>

                </div>

            </div>
            )
        }
        if (this.state.sellercheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.sellerlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="amount" barSize={50} fill="#413ea0" />

                    </ComposedChart>

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

                        <Bar dataKey="amount" barSize={50} fill="#413ea0" />

                    </ComposedChart>

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

                        <Bar dataKey="topviews" barSize={50} fill="#413ea0" />

                    </ComposedChart>

                </div>

            </div>
            )
        }

        
 
       

        return (<div>
            <div class="row">
                <div class="col-md-2">


                    <div class="sidebar" >
                        <header>My Analytics</header>
                        <ul>


                            <div onClick={() => this.handleOrders()} >Orders</div>
                            <div onClick={() => this.handleProducts()} >Products</div>
                            <div onClick={() => this.handleSellers()} >Sellers</div>
                            <div onClick={() => this.handleCustomers()} >Customers</div>
                            <div onClick={() => this.handleRating()} >Rating</div>
                            <div onClick={() => this.handleViews()} >Views</div>

                        </ul>
                    </div>

                </div>
                <div class="col-md-6">{graph}

                </div>

            </div>

        </div>

        );
    }
}
const mapStateToProps = state => {
    return {

        productlist: state.analytics.productlist,
        //  orderlist:state.analyticss.orderlist,
        sellerlist: state.analytics.sellerlist,
        customerlist: state.analytics.customerlist,
        ratelist: state.analytics.ratelist,
        viewlist: state.analytics.viewlist,

    };
};

export default connect(mapStateToProps, { fetchTopSoldProducts, fetchOrdersPerDay, fetchTopSellers, fetchTopCustomers, fetchTopRatedProducts, fetchTopViewedProducts })(Analytics);