import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerRatings} from '../../redux/actions/profile';


//import '../css/profile.css';

class Myratings extends Component {
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
        
        
        console.log(this.props.customerRating)
     
        return (
          
            <div>
            
              {this.props.customerRating?this.props.customerRating.map(cr => {
                        return (
                            <div >
                            <br></br>
                            <div class="card" style={{ "padding-top":"20px","padding-left":"20px",
                    "border-spacing": "60px", "background-color": "#fff", "min-width": "860px", "margin": "0 auto", "width": "860px", height: "100px", "border-style": "solid",
                    "border-width": "1px", "border-color": "#bbbbbb"
                    }}> 
                      
                    <div class="col-md-3">
                            <div style={{fontSize:"20px"}}>{cr.name?cr.name:""}</div></div>
                            <div class="col-md-3"></div>
                            <div class="col-md-3">
                            <div style={{fontSize:"20px","padding-left":"80px"}}> {cr.product_reviews?cr.product_reviews.comment?cr.product_reviews.comment:"":""}</div></div>
                            </div>
                            
                           
                            
                           
                            

                            </div>)
                    }):""}

                
                            
            </div>
        )
    }
}

    

const mapStateToProps = state => {
    return {
        customerRating:state.profile.customerRating
        
    };
};

export default connect(mapStateToProps, { fetchCustomerRatings })(Myratings);