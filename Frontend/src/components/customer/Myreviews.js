import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerRatings } from '../../redux/actions/profile';
import { Redirect } from "react-router";
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';


//import '../css/profile.css';

class Myreviews extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.props.fetchCustomerRatings(sessionStorage.getItem('id'));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            customerRating: nextProps.customerRating
        })
    }

    render() {
        let details = null;
        let redirectVar=null;
        if(sessionStorage && sessionStorage.getItem('persona') !== 'customer' ){
        redirectVar = <Redirect to= "/Signup"/>
        }
        if (this.props.customerRating) {
            details = (
                <div>
                    {this.props.customerRating ? this.props.customerRating.map(cr => {
                        return (
                            <div class='productConatiner'>
                                <div class='row'>
                                    <div class='col-md-2 imageContainer'>
                                        <img class='productImage' src={cr.images ? cr.images[0] : ""} alt={cr.productname ? cr.productname : ""}></img>
                                    </div>
                                    <div class='col-md-2 detailsContainer' style={{ "padding-bottom": "20px" }}>
                                        <div>
                                        <Link to={'/product/' + cr.product_id} className="linkColor"  >{cr.productname ? cr.productname : ""}</Link></div>

                                        <div>
                                            <Rating name="half-rating-read" size="large" value={cr.rating ? cr.rating : 0} precision={0.5} readOnly />
                                        </div>
                                        <div> 
                                         <Link to={'/product/' + cr.product_id} className="linkColor" > {cr.review ? cr.review : ""}</Link></div>
                                    </div>
                                    <div class="col-md-5">
                                        <div style={{ fontSize: "15px" ,}}> 
                                        <Link to={'/product/' + cr.product_id} className="linkColor" > {cr.headline ? cr.headline : ""}</Link></div>
                                    </div>
                                    <div class="col-md-3" style={{ "padding-left": "100px"}}>
                                        <div style={{ fontSize: "10px", "padding-left": "50px", }}> {cr.timestamp ? cr.timestamp.slice(0, 10) : ""}</div>
                                    </div>

                                </div>

                            </div>)
                    }) : ""}
                </div>
            )
        }

        return (
            <div>{redirectVar}
            
            <div class="cartContainer" >
                <div class='col-md-9 productsContainer'>
                    <h2 class='shoppingcart'>MY REVIEWS</h2>
                
                
                    {!(this.props.customerRating?this.props.customerRating.length>0:false) ? <h2 class='shoppingcart'>NO REVIEWS YET</h2> :
                        <div>
                            <div class='row pricecontainer' style={{"padding-right":"60px"}}>
                                <div class='pricehead'>Date</div>
                            </div>
                            {details}
                            <Link to="/customerprofile" className="btn" style={{  "background-color":"#f0c14b", "margin-right": "10px",
                              "height": "30px", color:"black","padding": "3px 10px 3px", "border": "1px solid #a88734"}}>Back to profile</Link>  
                        </div>}
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        customerRating: state.profile.customerRating ? state.profile.customerRating.finalresult1 : ""

    };
};

export default connect(mapStateToProps, { fetchCustomerRatings })(Myreviews);

