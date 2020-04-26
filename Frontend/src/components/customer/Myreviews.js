import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerRatings } from '../../redux/actions/profile';
import profilepicavatar from '../images/profilepicavatar.jpeg';
import Rating from '@material-ui/lab/Rating';


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
        let details=null;
        if(this.props.customerRating)
        {
            details=(
                <div>
                 {this.props.customerRating ? this.props.customerRating.map(cr => {
                    return (
                        <div >
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

                                <div class="col-md-9">

                                    <div style={{ fontSize: "20px", "padding-left": "20px" }}>{cr.productname ? cr.productname : ""}</div>
                                    <div class="col-md-2">

                                        <div style={{ display: "inline" }}>
                                            <Rating name="half-rating-read" size="large" value={cr.rating ? cr.rating : 0} precision={0.5} readOnly />
                                        </div>
                                    </div>


                                    <div class="col-md-10">
                                        <div style={{ fontSize: "20px" }}> {cr.headline ? cr.headline : ""}</div></div>
                                    <div style={{ fontSize: "20px", "padding-left": "20px" }}> {cr.review ? cr.review : ""}</div>

                                </div>
                                <div class="col-md-2">
                                    <div > {cr.timestamp ? cr.timestamp.slice(0, 10) : ""}</div>
                                </div>
                            </div>


                        </div>)
                }) : ""}



                </div>
            )
        }
        else{
            details=(<div calss="card">
                <h1>NO REVIEWS YET</h1>
            </div>)
        }


        return (

            <div >
            {details}

               

            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        customerRating: state.profile.customerRating?state.profile.customerRating.finalresult1:""

    };
};

export default connect(mapStateToProps, { fetchCustomerRatings })(Myreviews);