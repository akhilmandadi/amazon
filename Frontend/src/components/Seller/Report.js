
import React, { Component } from 'react';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { fetchSellerStatictics,  fetchSellerMonthlyStatictics} from '../../redux/actions/analytics';
import '../css/analytics.css'




class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthcheck: false,
            check: false,
        }
        this.handleCheck=this.handleCheck.bind(this);
        this.handleMonthCheck = this.handleMonthCheck.bind(this);

    }
    componentDidMount() {

        // this.props.fetchSellerStatictics(sessionStorage.getItem('id'));
        // this.props.fetchSellerMonthlyStatictics(sessionStorage.getItem('id'));
      
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.list,
            monthlist: nextProps.monthlist,
           
        })
    }
    handleCheck = () => {
        this.props.fetchSellerStatictics(sessionStorage.getItem('id'));
        this.setState({
            monthcheck: false,
            check: true,

        })
    }
    handleMonthCheck = () => {
        this.props.fetchSellerMonthlyStatictics(sessionStorage.getItem('id'));
        this.setState({
            monthcheck: true,
            check: false,
        })
    }
    render() {
        let graph = null;
        if (this.state.check) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <ComposedChart
                        width={700}
                        height={500}
                        data={this.props.list}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="pname" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="totalamount" barSize={50} fill="#6191ab" />

                    </ComposedChart>
                    <div>STATISTICS  OF ALL PRODUCTS </div>

                </div>

            </div>
            )
        }
        if (this.state.monthcheck) {
            graph = (<div className="">
                <div className="col-md-2"></div>
                <div className="col-md-10">
          
               
                    <ComposedChart
                    
                        width={700}
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

                        <Bar dataKey="amount" barSize={50} fill="#ab6361" />
                       

                    </ComposedChart>
                     <div>SELLER MONTHLY AMOUNT EARNED BY SALES OF PRODUCTS</div>
                </div>
               

            </div>
            )
        }
       

        return (<div>
            <div class="row">
            <div class="col-md-2" style={{paddingLeft:"0px"}}>

               


                    <div class="sidebar" style={{"margin-top":"1px"}}>
                        <header>My Reports</header>
                        <ul>


                            <div onClick={() => this.handleMonthCheck()} > Monthly sales</div>
                            <div onClick={() => this.handleCheck()} >Statictics</div>
                           

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

        list: state.analytics.list,
        monthlist: state.analytics.monthlist,
 

    };
};

export default connect(mapStateToProps, {  fetchSellerStatictics,fetchSellerMonthlyStatictics })(Report);