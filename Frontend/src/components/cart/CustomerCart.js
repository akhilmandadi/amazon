import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerCart } from '../../redux/actions/cart';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import '../css/cart.css';
import _ from 'lodash'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            subtotal: 0,
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        };
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this);
    }
    componentDidMount() {
        this.props.getCustomerCart(sessionStorage.getItem("id"))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cart: nextProps.cart
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            persona: this.state.persona,
            email: this.state.mail,
            password: this.state.password,
        }
        this.props.login(data);
    }

    handleOptionChange = (e) => {
        this.setState({
            persona: e.target.value
        })
    }

    sortFun = (sortType) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: this.state.filterCategory,
            displayResultsOffset: this.state.displayResultsOffset,
            sortType: sortType
        }

        this.props.fetchProducts(data)
    }

    fetchProductsbyCategory = (category) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: category,
            displayResultsOffset: this.state.displayResultsOffset,
            sortType: this.state.sortType
        }

        this.props.fetchProducts(data)
    }

    fetchProductsbyRating = (category) => {
        let data = {
            searchText: this.state.searchText,
            filterCategory: category,
            displayResultsOffset: this.state.displayResultsOffset,
            sortType: this.state.sortType
        }

        this.props.fetchProducts(data)
    }

    validateCredentials = () => {
        if (this.state.mail !== "" && this.state.password !== "") return false
        else return true
    }

    ratingPopover = (e, index) => {
        let stylePopover = this.state.stylePopover
        if (e === 'Focus') {
            stylePopover[index] = 'popoverDisplay'
            this.setState({
                stylePopover: stylePopover
            })
        } else if (e === 'onFocusOut') {
            stylePopover[index] = 'popoverNone'
            this.setState({
                stylePopover: stylePopover
            })
        }
    }

    render() {
        let redirectVar = null;
        let cartlist = null;
        let customercart = [];
        let totalPrice = null;
        let proceedtocheckout = null;
        customercart = this.state.cart;

        if (customercart) {
            let subtotal = _.sumBy(customercart, function (item) { return (item.product.discountedPrice * item.quantity) });
            cartlist = (<div>
                {customercart.map((cartitem, index) => {
                    return (
                        <div class='productConatiner'>
                            <div class='row'>
                                <div class='col-md-3 imageContainer'>
                                    <img class='productImage' src={cartitem.product.images[0]} alt={cartitem.product.name}></img>
                                </div>
                                <div class='col-md-7 detailsContainer'>
                                    <div class='productTitle'>{cartitem.product.name}</div>
                                    <div class='stocklabel'>
                                        Only {Math.ceil(Math.random() * 10)} left in stock - order soon.
                                        </div>
                                        <div class='checkboxContainer'>
                                    <input type="checkbox" name="" value="" />
                                    <span class='giftlabel'>
                                        This is a gift
                                                <span class='learnlabel'>
                                            Learn more
                                                </span>
                                    </span>
                                </div>
                                <div class='qtyContainer'>
                                    <span class='qtyButton'>
                                        <span class='qtyButtontxt'>
                                            <span class='qtyLabel'>Qty:</span>
                                        </span>
                                    </span>
                                    <span class="separator"></span>
                                    <span class='deleteProduct'>Delete</span>
                                    <span class="separator"></span>
                                    <span class='deleteProduct'>Save for later</span>
                                </div>
                                </div>
                                <div class='col-md-2 productprice'>
                                    ${cartitem.product.discountedPrice}
                                </div>

                                
                            </div>
                        </div>
                    )
                })}
            </div>)

            totalPrice = (<div class='subtotalContainer'>
                <span class='subtotalLabel'>
                    Subtotal ({(customercart.length === 1) ? customercart.length + ' item' : customercart.length + ' items'}):
                        </span>
                <span class='productprice'>
                    ${subtotal}
                </span>
            </div>)

            proceedtocheckout = (<div class='checkoutContainer'>
                <div class='checkoutSubtotal'>
                    <span class='subtotalLabel'>
                        Subtotal ({(customercart.length === 1) ? customercart.length + ' item' : customercart.length + ' items'}):
                        </span>
                    <span class='productprice'>
                        ${subtotal}
                    </span>
                </div>
                <div class='checkoutCheckbox'>
                    <input type="checkbox" name="" value="" />
                    <span class='giftlabel'>This is order contains a gift</span>
                </div>
                <button class='checkoutButton'>
                    <div class='checkoutButtonText'>
                        Proceed to checkout
                    </div>
                </button>
            </div>)
        }


        return (
            <div class="cartContainer">
                <div class='col-md-9 productsContainer'>
                    <h2 class='shoppingcart'>Shopping Cart</h2>
                    {!customercart ? <h2 class='shoppingcart'>Your Shopping Cart is empty</h2> :
                        <div>
                            <div class='row pricecontainer'>
                                <div class='pricehead'>Price</div>
                            </div>
                            {cartlist}
                            {totalPrice}c
                            <div class='gradient'>

                            </div>
                            <p class='CartInfo'>
                                The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                            <p class='CartInfo'>
                                Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
                            </p>
                        </div>}
                </div>
                <div class='col-md-3'>
                    {proceedtocheckout}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartlist
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getCustomerCart: payload => dispatch(getCustomerCart(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);