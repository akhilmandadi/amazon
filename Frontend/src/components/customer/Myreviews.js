import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerRatings } from '../../redux/actions/profile';
import profilepicavatar from '../images/profilepicavatar.jpeg';
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
           
            

            <div class="cartContainer" >
                <div class='col-md-9 productsContainer'>
                    <h2 class='shoppingcart'>MY REVIEWS</h2>
                    {!(this.props.customerRating!=null) ? <h2 class='shoppingcart'>NO REVIEWS YET</h2> :
                        <div>
                            <div class='row pricecontainer' style={{"padding-right":"60px"}}>
                                <div class='pricehead'>Date</div>
                            </div>
                            {details}



                        </div>}
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

{/* <div >
<br></br>
<div class="card" style={{
    "padding-top": "20px", "padding-left": "20px",
    "border-spacing": "60px", "background-color": "#fff", "min-width": "860px", "margin": "0 auto", "width": "860px", height: "150px", "border-style": "solid",
    "border-width": "1px", "border-color": "#bbbbbb"
}}>
  
    <div class="col-md-1">
        <img src={profilepicavatar} alt="coverpic" variant="circle" style={{
            position: "relative",
            height: "60px", width: "60px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
        }}></img>
    </div>

    <div class="col-md-3">
        <div style={{ fontSize: "20px", "padding-left": "20px" }}>{cr.productname ? cr.productname : ""}</div>
            <div style={{ display: "inline", "padding-left": "20px"}}>
                <Rating name="half-rating-read" size="large" value={cr.rating ? cr.rating : 0} precision={0.5} readOnly />
            </div>
            <div style={{ fontSize: "20px", "padding-left": "20px" }}> {cr.review ? cr.review : ""}</div>
        </div>
    

         
    <div class="col-md-6">
        <div style={{ fontSize: "20px" }}> {cr.headline ? cr.headline : ""}</div>
    </div>
    <div class="col-md-2">
        <div style={{ fontSize: "10px","padding-left": "50px", }}> {cr.timestamp ? cr.timestamp.slice(0, 10) : ""}</div>
    </div>
    </div>



</div>) */}