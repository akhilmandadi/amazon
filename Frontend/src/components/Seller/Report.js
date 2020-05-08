
import React, { Component } from 'react';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { fetchSellerStatictics, fetchSellerMonthlyStatictics } from '../../redux/actions/analytics';
import '../css/analytics.css';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';




class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthClass: "selectedReport",
            checkClass: "",
            monthcheck: true,
            check: false,
            year: "2020"
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMonthCheck = this.handleMonthCheck.bind(this);
        this.submitForm = this.submitForm.bind(this)

    }
    componentDidMount() {
        this.handleMonthCheck();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.list,
            monthlist: nextProps.monthlist,

        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCheck = () => {
        let sellerId = this.props.location.state ? this.props.location.state.seller._id : sessionStorage.getItem('id');
        this.props.fetchSellerStatictics(sellerId);
        this.setState({
            monthClass: "",
            checkClass: "selectedReport",
            monthcheck: false,
            check: true,

        })
    }
    handleMonthCheck = () => {
        const data = {
            year: "2020",

        }
        let sellerId = this.props.location.state ? this.props.location.state.seller._id : sessionStorage.getItem('id');

        this.props.fetchSellerMonthlyStatictics(sellerId, data);
        this.setState({
            monthClass: "selectedReport",
            checkClass: "",
            monthcheck: true,
            check: false,
        })
    }
    submitForm = (e) => {
        const data = {
            year: this.state.year,

        }
        console.log(data)
        let sellerId = this.props.location.state ? this.props.location.state.seller._id : sessionStorage.getItem('id');

        this.props.fetchSellerMonthlyStatictics(sellerId, data);
    }

    render() {
        let redirectVar = null;
        // if(sessionStorage && sessionStorage.getItem('persona') !== 'seller' ){
        // redirectVar = <Redirect to= "/Signup"/>
        // }
        let graph = null;
        if (this.state.check) {
            graph = (<div className="">

                <div className="col-md-6">
                    <ComposedChart
                        width={2000}
                        height={500}
                        data={this.props.list}
                     
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />

                        <XAxis  dataKey="pname"/>
                        <YAxis  />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="totalamount" barSize={5} fill="#6191ab" />

                    </ComposedChart>
                    <div>STATISTICS  OF ALL PRODUCTS </div>

                </div>

            </div>
            )
        }
        if (this.state.monthcheck) {
            graph = (<div className="">
                <div className="col-md-2">
                    <div style={{ width: "120px" }}><form>
                        <div><input type="text" name="year" id="year" value={this.state.year} placeholder="Enter Year" onChange={this.onChange} class="form-control" required /></div>
                        <button type="button" class="btn btn-secondary" onClick={this.submitForm} style={{ fontSize: "13px", marginBottom: "20px", padding: "3px", borderRadius: "2px", textAlign: "center", marginTop: "20px" }}>
                            <span style={{ textAlign: "center", paddingTop: "3px" }}>Get Data</span>
                        </button>
                    </form>
                    </div>
                </div>
                <div className="col-md-10">
                    <ComposedChart

                        width={1000}
                        height={500}
                        data={this.props.monthlist}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="amount" barSize={30} fill="#ab6361" />


                    </ComposedChart>
                    <div>SELLER MONTHLY AMOUNT EARNED BY SALES OF PRODUCTS</div>
                </div>


            </div>
            )
        }


        return (<div>
            {redirectVar}
            <div class="row">
                <div class="col-md-2" style={{ paddingLeft: "0px" }}>
                {this.props.location.state ? <div class="backToProf" style = {{
                            "margin-top": "10px",
                            "margin-left": "25px",
                            "margin-bottom": "20px"
                    }}>
                       <Link
                            to={{
                                pathname: "/seller/profile",
                                state: {
                                    seller: this.props.location.state.seller,
                                    isSeller: false,
                                    admin: true,
                                }
                            }} >
                            Back to Seller Profile
                                </Link> 
                    </div>: ""}
                    <div class="sidebar" style={{ "margin-top": "1px" }}>

                    {!this.props.location.state ? <header>My Reports</header>:<header>Seller Reports</header>}
                        <ul>
                            <div onClick={() => this.handleMonthCheck()} class={this.state.monthClass} > Monthly sales</div>
                            <div onClick={() => this.handleCheck()} class={this.state.checkClass}>Statictics</div>
                        </ul>

                    </div>
                </div>
                
                <div class="col-md-6" style={{ "margin-top": "70px" }} >{graph}

                </div>

            </div>

        </div>

        );
    }
}
const mapStateToProps = state => {
    return {

        list: state.analytics.list,
        monthlist: state.analytics.monthlist,


    };
};

export default connect(mapStateToProps, { fetchSellerStatictics, fetchSellerMonthlyStatictics })(Report);