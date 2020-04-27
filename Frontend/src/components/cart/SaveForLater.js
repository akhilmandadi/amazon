import React, { Component } from 'react';
import { connect } from 'react-redux';
import profilepicavatar from '../images/profilepicavatar.jpeg';
import { fetchSaveForLater, addSaveForLater, deleteSaveForLater, moveToCart } from '../../redux/actions/cart';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


//import '../css/profile.css';

class Saveforlater extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.deleteitem = this.deleteitem.bind(this)
        this.moveToCart = this.moveToCart.bind(this)
    }



    componentDidMount() {
        this.props.fetchSaveForLater(sessionStorage.getItem('id'));
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            saveforlater: nextProps.saveforlater
        })
    }
    deleteitem = (id) => {
        const data = {
            productid: id,
        }
        this.props.deleteSaveForLater(sessionStorage.getItem('id'), data.productid)
    }
    moveToCart = (id) => {
        const data = {
            productid: id,
        }
        this.props.moveToCart(sessionStorage.getItem('id'), data)

    }

    render() {
        let cartlist = null;
        if (this.props.saveforlater.length>0) {
            cartlist = (
            <div>
                {this.props.saveforlater.map((item, index) => {
                    return (
                        <div class='productConatiner'>
                            <div class='row'>
                                <div class='col-md-3 imageContainer'>
                                    <img class='productImage' src={item.product.images[0]} alt={item.product.name}></img>
                                </div>
                                <div class='col-md-7 detailsContainer'>
                                    <div class='productTitle'>{item.product ? item.product.name : ""}</div>
                                    <div class='stocklabel'>
                                        Only {Math.ceil(Math.random() * 10)} left in stock - order soon.
                                        </div>
                                        <div class='qtyContainer' >
                                    
                                  
                                    <span class='deleteProduct' onClick={() => this.deleteitem(item.product ? item.product._id : "")} >Delete</span>
                                    <span class="separator"></span>
                                    <span class='deleteProduct' onClick={() => this.moveToCart(item.product?item.product._id:"")}>Move to cart</span>
                                    <span class="separator"></span>
                                    <span class='deleteProduct'>Move to Wish List</span>
                                    <span class="separator"></span>
                                    <span class='deleteProduct'>Compare with similar items</span>
                                </div>
                                        </div>
                                       
                                <div class='col-md-2 productprice'>
                                ${item.product ? item.product.price : ""}
                                  
                                </div>

                                
                            </div>
                        </div>
                    )
                })}
            </div>)

            
           
        }

            return (
                <div class="cartContainer">
                    <div class='col-md-9 productsContainer'>
                        <h2 class='shoppingcart'>Saved for Later</h2>
                        {!(this.props.saveforlater.length>0) ? <h2 class='shoppingcart'>No Items in Saved for Later List</h2> :
                            <div>
                                <div class='row pricecontainer'>
                                    <div class='pricehead'>Price</div>
                                </div>
                                {cartlist}
                               
                                <div class='gradient'>
    
                                </div>
                                <p class='CartInfo'>
                                    The price and availability of items at Amazon.com are subject to change. This list is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                               
                            </div>}
                    </div>
                    
                </div>
            )





    }
}



const mapStateToProps = state => {
    return {
        saveforlater: state.cart.saveforlater ? state.cart.saveforlater : state.cart.saveforlater

    };
};

export default connect(mapStateToProps, { fetchSaveForLater, addSaveForLater, deleteSaveForLater, moveToCart })(Saveforlater);

                  