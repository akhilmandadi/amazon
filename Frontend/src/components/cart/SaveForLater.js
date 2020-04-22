import React, { Component } from 'react';
import { connect } from 'react-redux';
import profilepicavatar from '../images/profilepicavatar.jpeg';
import { fetchSaveForLater,addSaveForLater,deleteSaveForLater,moveToCart} from '../../redux/actions/cart';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


//import '../css/profile.css';

class Saveforlater extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        this.deleteitem=this.deleteitem.bind(this)
        this.moveToCart=this.moveToCart.bind(this)
    }

   

    componentDidMount() {
        this.props.fetchSaveForLater(sessionStorage.getItem('id'));
    }
    

    componentWillReceiveProps(nextProps) {
        this.setState({
            saveforlater: nextProps.saveforlater
        })
    }
    deleteitem=(id)=>
    {
      const data={
          productid:id, 
      }
        this.props.deleteSaveForLater(sessionStorage.getItem('id'),data)
    }
    moveToCart=(id) =>
    {
        const data={
            productid:id, 
        }
          this.props.moveToCart(sessionStorage.getItem('id'),data)

    }

    render() {
        return (
          
            <div>
            {this.props.saveforlater?this.props.saveforlater.map(cr => {
                    return (
                        <div >
                            <br></br>
                            <div class="card" style={{
                                "padding-top": "20px", "padding-left": "20px",
                                "border-spacing": "60px", "background-color": "#fff", "min-width": "860px", "margin": "0 auto", "width": "860px", height: "150px", "border-style": "solid",
                                "border-width": "1px", "border-color": "#FFFFFF"
                            }}>

                                <div class="col-md-2">
                                {cr.product?cr.product.images?cr.product.images[0]?
                                    (<img src={cr.product.images[0]} alt="coverpic" variant="box" style={{
                                        position: "relative",
                                        height: "100px", width: "100px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                                    }}></img>): (<img src={profilepicavatar} alt="coverpic" variant="box" style={{
                                        position: "relative",
                                        height: "100px", width: "100px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                                    }}></img>):(<img src={profilepicavatar} alt="coverpic" variant="box" style={{
                                        position: "relative",
                                        height: "100px", width: "100px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                                    }}></img>):(<img src={profilepicavatar} alt="coverpic" variant="box" style={{
                                        position: "relative",
                                        height: "100px", width: "100px", "box-shadow": "0 0 0 4px #fff", "border-radius": "50%"
                                    }}></img>)}
                                </div>

                                <div class="col-md-9">

                                    <div style={{ fontSize: "30px", "padding-left": "19px" }}><Link to={'/product'}>
                                    {cr.product?cr.product.name :""}</Link></div>
                                    <div class="col-md-2">
                                    <div  style={{ fontSize: "13px",  "padding-right": "19px","padding-top": "20px"}} onClick={()=>this.deleteitem(cr.product?cr.product._id :"")}  >
                                    <span style={{color:"#0066c0"}}>delete</span></div>
                                    </div>
                                    <div class="col-md-3">
                                    <div style={{ fontSize: "13px","padding-top": "20px"}} onClick={()=>this.moveToCart(cr.product?cr.product._id :"")}>
                                    <span style={{color:"#0066c0"}}>Move to Cart</span></div>
                                    </div>
                                    <div class="col-md-3">
                                    <div style={{ fontSize: "13px","padding-top": "20px"}}>
                                    <span style={{color:"#0066c0"}}>Move to Wish List</span></div>
                                    </div>
                                    <div class="col-md-4">
                                    <div style={{ fontSize: "13px","padding-top": "20px"}}>
                                    <span style={{color:"#0066c0"}}>Compare with similar items </span></div>
                                    </div>
                                    

                                       
                


                                </div>
                              
                                </div>

                        </div>)
                }) :""}



            </div>
        
            
              
                           
                            
                           
                            


                
                            
           
        )
    }
}

    

const mapStateToProps = state => {
    return {
        saveforlater:state.cart.saveforlater?state.cart.saveforlater:state.cart.saveforlater
        
    };
};

export default connect(mapStateToProps, { fetchSaveForLater,addSaveForLater,deleteSaveForLater,moveToCart })(Saveforlater);