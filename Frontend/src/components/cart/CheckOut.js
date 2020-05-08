import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerCheckoutDetails, placeOrder, clearOrderFlag } from '../../redux/actions/cart';
import { addCard } from '../../redux/actions/profile'
import '../css/checkout.css';
import '../css/cart.css';
import logo from '../images/amazoncheckout.png'
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import _ from 'lodash'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutdetails: {},
            checkouttotalitems: 0,
            checkoutsubtotal: 0,
            address: true,
            card: false,
            itemdetails: false,
            cardStyle: [],
            selectedAddress: {},
            selectedAddressIndex: 0,
            selectedCardIndex: 0,
            addNewAddress: false,
            newAddress: {country:'',name:'',line1:'',line2:'',city:'',state:'',zipcode:'',phone:''},
            newCard: {card_number:'',name:'',expiry:'',CVV:''},
            addresses: [],
            cards: [],
            cart: [],
            selectedCard: {}
        };
    }

    inputChangeHandlerForAddress = (e) => {
        let value = e.target.value;
        let newAddress = this.state.newAddress;

        newAddress[e.target.name] = value

        this.setState({
            newAddress: newAddress
        })
        console.log(this.state.newAddress)
    }

    inputChangeHandlerForCard = (e) => {
        let value = e.target.value;
        let newCard = this.state.newCard;

        newCard[e.target.name] = value

        this.setState({
            newCard: newCard
        })
        console.log(this.state.newCard)
    }

    componentDidMount() {
        this.props.getCustomerCheckoutDetails(sessionStorage.getItem("id"));
    }

    componentWillReceiveProps(nextProps) {
        let addresses = []
        let cards = []
        let cart = []
        if (nextProps.checkoutdetails) {
            addresses = nextProps.checkoutdetails.addresses;
            cards = nextProps.checkoutdetails.cards;
            cart = nextProps.checkoutdetails.cart
        }
        this.setState({
            checkoutdetails: nextProps.checkoutdetails,
            checkouttotalitems: nextProps.checkouttotalitems,
            addresses: addresses,
            cards: cards,
            cart: cart,
            checkoutsubtotal: nextProps.checkoutsubtotal
        })
    }

    pickAddress = (index) => {
        this.setState({
            selectedAddressIndex: index
        })
    }

    finalizedAddress = () => {
        console.log(this.state.addresses[this.state.selectedAddressIndex])
        let address = this.state.addresses[this.state.selectedAddressIndex]
        this.setState({
            selectedAddress: address,
            address: false,
            card: true
        })
    }

    addandFinalizeAddress = () => {
        let addNewAddress = this.state.addNewAddress;
        let newAddress = this.state.newAddress;
        let addresses = this.state.addresses
        addresses.push(_.clone(newAddress))
        this.setState({
            addNewAddress: !addNewAddress,
            addresses: addresses,
            selectedAddress: newAddress,
            selectedAddressIndex: (addresses.length - 1),
            newAddress : {country:'',name:'',line1:'',line2:'',city:'',state:'',zipcode:'',phone:''},
            address: false,
            card: true
        })
    }

    addNewAddress = () => {
        let addNewAddress = this.state.addNewAddress

        this.setState({
            addNewAddress: !addNewAddress
        })
    }

    pickCard = (index) => {
        this.setState({
            selectedCardIndex: index
        })
    }

    finalizedCard = () => {
        console.log(this.state.cards[this.state.selectedCardIndex])
        let card = this.state.cards[this.state.selectedCardIndex]
        console.log(this.state.selectedCardIndex)
        this.setState({
            selectedCard: card,
            address: false,
            card: false,
            itemdetails: true
        })
    }

    addandFinalizeCard = () => {
        let addNewCard = this.state.addNewCard;
        let newCard = this.state.newCard;
        let cards = this.state.cards
        cards.push(_.clone(newCard))
        console.log(cards.length)
        let cvv = newCard.CVV

        newCard['customer_id'] = sessionStorage.getItem('id');
        newCard['cvv'] = cvv;

        this.props.addCard(newCard)

        this.setState({
            addNewCard: !addNewCard,
            cards: cards,
            selectedCard: newCard,
            selectedCardIndex: (cards.length - 1),
            newCard:{card_number:'',name:'',expiry:'',CVV:''},
            address: false,
            card: false,
            itemdetails: true
        })
    }

    addNewCard = () => {
        let addNewCard = this.state.addNewCard

        this.setState({
            addNewCard: !addNewCard
        })
    }

    componentWillUnmount(){
        this.props.clearOrderFlag()
    }

    validateAddressDetails = () =>{
        var statesAbbrevations=["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
        ,"Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Minor Outlying Islands", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "U.S. Virgin Islands", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        var zipcodeRegex1=/[0-9][0-9][0-9][0-9][0-9]/
        var zipcodeRegex2=/[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
        if(this.state.newAddress.country !== "" &&
         (this.state.newAddress.fullname!=="")&&
         this.state.newAddress.line1!== "" &&
         this.state.newAddress.line2!=="" &&
         this.state.newAddress.city!=="" &&
        //  (this.state.newAddress.phone?(this.state.newAddress.phone.length)===10:("" === "")) &&
         this.state.newAddress.phone.length === 10 &&
         statesAbbrevations.includes(this.state.newAddress.state) &&
         (this.state.newAddress.zipcode.match(zipcodeRegex1)||this.state.newAddress.zipcode.match(zipcodeRegex2)) &&
         (this.state.newAddress.zipcode.length===5 || this.state.newAddress.zipcode.length===10))
          {
            return false
        } else {
            return true
        }
    }

    validateCardDetails = () =>{
        let expiry = this.state.newCard.expiry.split('/')
        console.log(expiry)
        console.log(Number(expiry[0]))
        console.log(Number(expiry[1]))
        if(this.state.newCard.card_number.length === 16 && this.state.newCard.name.length !== 0 && (Number(expiry[0]) > 0) && (Number(expiry[0]) < 13) && (Number(expiry[1]) > 2019) && this.state.newCard.CVV.length===3){
            return false
        } else {
            return true
        }
    }

    placeOrder = () => {
        let products = []
        let address = this.state.addresses[this.state.selectedAddressIndex];
        let card = this.state.cards[this.state.selectedCardIndex];
        let date = new Date().toISOString();

        this.state.cart.forEach((item, index) => {
            products[index] = {
                product_id: item.product._id,
                quantity: item.quantity,
                gift: item.gift,
                message: item.message,
                price: item.product.discountedPrice,
                seller_id: item.product.seller_id,
                tracking: [{
                    status: 'Ordered',
                    updated_at: date,
                    location: address.city
                }],
                currentStatus: "Ordered"
            }
        })
        let data = {
            customer_id: sessionStorage.getItem('id'),
            products: products,
            address: address,
            payment: card,
            total: ((this.state.checkoutsubtotal)*(109.25/100)).toFixed(2),
            placed_on: date
        }
        console.log(data)
        console.log(card)
        console.log(this.state.selectedAddressCard)

        this.props.placeOrder(data)
    }

    render() {
        const checkoutdetails = this.state.checkoutdetails
        const checkouttotalitems = this.state.checkouttotalitems;
        var shippingaddress = null;
        var paymentmethod = null;
        var itemsandshipping = null;
        var orderitems = null;
        var addressform = null;
        var cardform = null;
        var ordersuccess = null;

        ordersuccess = (<div>
                <h1 class='title' style={{marginLeft:'50px'}}>Your Order is Successfully placed</h1>
                <p style={{fontSize:'17px',marginLeft:'50px'}}>Navigate to <Link to='/your-account/order-history'>Your Orders</Link> to view your recent orders</p>
                <p style={{fontSize:'17px',marginLeft:'50px'}}>Navigate to Catalog to view new products...</p>
                <p style={{fontSize:'13px',marginLeft:'50px'}}>Happy Shopping :)</p>
                </div>)

        if (Object.keys(checkoutdetails).length) {
            console.log(checkoutdetails)
            addressform = (<Dialog open={this.state.addNewAddress}>
                <DialogContent class='dialogContent'>
                    <div class='popoverWrapper'>
                        <div class='popoverHeader'>
                            <h4 class='popoverHeaderContent'>Enter a new shipping address</h4>
                            <button class='popoverClose' onClick={() => this.addNewAddress()}>
                                <i class='popoverCloseIcon'>x</i>
                            </button>
                        </div>
                        <div class='popoverContent'>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Country/Region: </span>
                                <span class='inputFieldContainer'><input type='text' name='country' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Full Name: </span>
                                <span class='inputFieldContainer'><input type='text' name='name' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Address line 1: </span>
                                <span class='inputFieldContainer'><input type='text' name='line1' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Address line 2: </span>
                                <span class='inputFieldContainer'><input type='text' name='line2' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>City: </span>
                                <span class='inputFieldContainer'><input type='text' name='city' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>State / Province: </span>
                                <span class='inputFieldContainer'><input type='text' name='state' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Postal code: </span>
                                <span class='inputFieldContainer'><input type='text' name='zipcode' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Phone Number: </span>
                                <span class='inputFieldContainer'><input type='text' name='phone' class='inputField' onChange={this.inputChangeHandlerForAddress} /></span>
                            </div>
                        </div>
                        <div class='contentBottom'>
                            <button class="useAddress" disabled={this.validateAddressDetails()} onClick={() => this.addandFinalizeAddress()}>
                                <span class="buttonInner">Use this address</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>)

            cardform = (<Dialog open={this.state.addNewCard}>
                <DialogContent class='dialogContent'>
                    <div class='popoverWrapper'>
                        <div class='popoverHeader'>
                            <h4 class='popoverHeaderContent'>Enter a new shipping address</h4>
                            <button class='popoverClose' onClick={() => this.addNewCard()}>
                                <i class='popoverCloseIcon'>x</i>
                            </button>
                        </div>
                        <div class='popoverContent'>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Card number </span>
                                <span class='inputFieldContainer'><input type='text' name='card_number' class='inputField' onChange={this.inputChangeHandlerForCard} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Name on card </span>
                                <span class='inputFieldContainer'><input type='text' name='name' class='inputField' onChange={this.inputChangeHandlerForCard} /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>Expiration date </span>
                                <span class='inputFieldContainer'><input type='text' name='expiry' class='inputField' onChange={this.inputChangeHandlerForCard} placeholder='mm/yyyy' /></span>
                            </div>
                            <div class='inputText'>
                                <span class='col-md-4 inputLabel'>CVV </span>
                                <span class='inputFieldContainer'><input type='text' name='CVV' class='inputField' onChange={this.inputChangeHandlerForCard} /></span>
                            </div>
                        </div>
                        <div class='contentBottom'>
                            <button class="useAddress" disabled={this.validateCardDetails()} onClick={() => this.addandFinalizeCard()}>
                                <span class="buttonInner">Add your card</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>)

            if (this.state.address) {
                shippingaddress = (<div>
                    <div class='row'>
                        <div class='col-md-1 sectionCount'>1</div>
                        <div class='col-md-11 sectionContent'>
                            <div class='addressHeader'>
                                Choose a shipping address
                            </div><br /><br />
                            <div class='content'>
                                <div class='contentInner'>
                                    <h4 class='contenthead'>Addresses</h4>
                                    <hr class='contentSeperator' />
                                    {checkoutdetails.addresses.map((address, index) => {
                                        return (
                                            <div class={(index === this.state.selectedAddressIndex) ? 'selectedLabel addressContent' : 'addressContent'}>
                                                <input type="radio" id={index} name="addresses" checked={index === this.state.selectedAddressIndex} onChange={() => this.pickAddress(index)} />
                                                <span class='addressLabel'>
                                                    <b>{address.name} </b>
                                                    {address.line1} {address.line2}, {address.city}, {address.state}, {address.zipcode}, {address.country}
                                                </span>
                                            </div>
                                        )
                                    })
                                    }

                                    <div class='contentFooter'>
                                        <Link onClick={() => this.addNewAddress()}>
                                            <img class='addIcon' src='https://images-na.ssl-images-amazon.com/images/G/01/checkout/assets/addAddress._CB454652023_.png' alt='add icon'></img>
                                            <span class='addLabel'> Add a new address</span>
                                        </Link>
                                        {this.state.addNewAddress ? addressform : null}
                                    </div>

                                </div>
                                <div class='contentBottom'>
                                    <button class="useAddress" onClick={() => this.finalizedAddress()} disabled={this.state.addresses.length === 0}>
                                        <span class="buttonInner">Use this address</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            } else {
                shippingaddress = (<div>{(this.state.addresses.length) ? <div>
                    <div class='row'>
                        <div class='col-md-1 otherCount'>1</div>
                        <div class='col-md-3 sectionContent'>
                            <div class='otherHeader'> Shipping address</div>
                        </div>
                        <div class='col-md-8 sectionContent'>
                            <div>{this.state.addresses[this.state.selectedAddressIndex].name}</div>
                            <div>{this.state.addresses[this.state.selectedAddressIndex].line1} {this.state.addresses[this.state.selectedAddressIndex].line2}</div>
                            <div>{this.state.addresses[this.state.selectedAddressIndex].city}, {this.state.addresses[this.state.selectedAddressIndex].state}, {this.state.addresses[this.state.selectedAddressIndex].zipcode}</div>
                            <div><img src='https://images-na.ssl-images-amazon.com/images/G/01/Campus/Badges/locker-pin._CB485944747_.png' width='16'></img><b> Or Free Pickup from nearby Amazon Pickup Store</b></div>
                        </div>
                    </div>
                </div> : <div></div>}</div>)
            }

            if (this.state.card) {
                paymentmethod = (<div class='row'>
                    <div class='col-md-1 sectionCount'>2</div>
                    <div class='col-md-11 sectionContent'>
                        <div class='addressHeader'>
                            Choose a payment method
                            </div><br /><br />
                        <div class='content'>
                            <div class='contentInner'>
                                <div class='row'>
                                    <h4 class='col-md-7 contenthead'>Your credit and debit cards</h4>
                                    <div class='col-md-3'>Name on card</div>
                                    <div class='col-md-2 expiryrow'>Expires on</div>
                                </div>
                                <hr class='contentSeperator' />
                                {checkoutdetails.cards.map((card, index) => {
                                    return (
                                        <div class={(index === this.state.selectedCardIndex) ? 'selectedLabel addressContent' : 'addressContent'}>
                                            <div class='row addressLabel'>
                                                <div class='col-md-1' style={{ 'padding': '0px', 'width': '16px' }}><input type="radio" id={index} name="cards" checked={index === this.state.selectedCardIndex} onChange={() => this.pickCard(index)} /></div>
                                                <div class='col-md-6' style={{ 'paddingLeft': '0px', width: '370px', color: '#111111' }}><img src='https://images-na.ssl-images-amazon.com/images/G/01/payments-portal/r1/add-payment-method/card-logo-compact._CB478583243_.gif' class='addcard'></img>card ending in <b>{card.card_number.substring(12)}</b></div>
                                                <div class='col-md-3' style={{ width: '165px', color: '#111111' }}>{card.name}</div>
                                                <div class='col-md-2 expiryrow'>{card.expiry}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                }

                                <div class='contentFooter'>
                                    <Link onClick={() => this.addNewCard()}>
                                        <img class='addIcon' src='https://images-na.ssl-images-amazon.com/images/G/01/checkout/assets/addAddress._CB454652023_.png' alt='add icon'></img>
                                        <span class='addLabel'> <img src='https://images-na.ssl-images-amazon.com/images/G/01/payments-portal/r1/add-payment-method/card-logo-compact._CB478583243_.gif' class='addcard'></img>Add a credit or debit card</span>
                                    </Link>
                                    {this.state.addNewCard ? cardform : null}
                                </div>

                            </div>
                            <div class='contentBottom'>
                                <button class="useAddress" onClick={() => this.finalizedCard()} disabled={this.state.cards.length === 0}>
                                    <span class="buttonInner">Use this payment method</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            } else if (!this.state.card && !this.state.address) {
                paymentmethod = (<div>{(this.state.cards.length) ? <div>
                    <div class='row'>
                        <div class='col-md-1 otherCount'>2</div>
                        <div class='col-md-3 sectionContent'>
                            <div class='otherHeader'> Payment method</div>
                        </div>
                        <div class='col-md-8 sectionContent'>
                            <div><img src='https://images-na.ssl-images-amazon.com/images/G/01/payments-portal/r1/add-payment-method/card-logo-compact._CB478583243_.gif' class='addcard'></img>card ending in <b>{this.state.cards[this.state.selectedCardIndex].card_number.substring(12)}</b>, {this.state.cards[this.state.selectedCardIndex].expiry}</div>
                            <div><span style={{ color: '#0066C0' }}>Billing name: </span>{this.state.cards[this.state.selectedCardIndex].name}</div>
                        </div>
                    </div>
                </div> : <div></div>}</div>)
            } else {
                paymentmethod = (<div class='row'>
                    <div class='col-md-1 otherCount'>2</div>
                    <div class='col-md-11 sectionContent'>
                        <div class='otherHeader'> Payment method</div>
                    </div>
                </div>)
            }
            if (this.state.itemdetails) {
                itemsandshipping = (<div>
                    <div class='row'>
                        <div class='col-md-1 sectionCount'>3</div>
                        <div class='col-md-11 sectionContent'>
                            <div class='addressHeader'>
                                Item and Shipping
                            </div><br /><br />
                            <div class='content'>
                                <div class='contentInner'>
                                    {checkoutdetails.cart.map((cartitem, index) => {
                                        return (
                                            <div class='productConatiner'>
                                                <div class='row'>
                                                    <div class='col-md-3 imageContainer' style={{paddingBottom:'10px'}}>
                                                        <img class='productImage' style={{maxHeight:'150px',maxWidth:'150px'}} src={cartitem.product.images[0]} alt={cartitem.product.name}></img>
                                                    </div>
                                                    <div class='col-md-7 detailsContainer'>
                                                        <Link class='productlink' to={"/product/" + cartitem.product._id}>
                                                            <div class='productTitle'>{cartitem.product.name}</div>
                                                        </Link>
                                                        <div class='checkboxContainer'>
                                                            <input type="checkbox" name="productgift" checked={cartitem.gift} disabled/>
                                                            <span class='giftlabel'>
                                                                This is a gift
                                                            <span class='learnlabel'>
                                                                    Learn more
                                                            </span>
                                                            </span>
                                                        </div>
                                                        <div class='qtyContainer'>
                                                            <span style={{ color: '#111', fontSize: '13px', fontWeight: '550' }}>Qty:{cartitem.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div class='col-md-2 productprice'>
                                                        ${cartitem.gift ? (cartitem.product.discountedPrice * 105 / 100).toFixed(2) : cartitem.product.discountedPrice}
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                </div>
                                <div class='contentBottom'>
                                    <button class="useAddress" onClick={() => this.placeOrder()}>
                                        <span class="buttonInner">Place your order</span>
                                    </button>
                                </div>
                            </div></div></div>
                </div>)
            } else {
                itemsandshipping = <div class='row'>
                    <div class='col-md-1 otherCount'>3</div>
                    <div class='col-md-11 sectionContent'>
                        <div class='otherHeader'> Items and shipping</div>
                    </div>
                </div>
            }

            orderitems = (<div class='checkOutContainer'>
                {this.state.address ? <button class="checkOutButton" onClick={() => this.finalizedAddress()}>
                    <span class="buttonInner">Use this address</span>
                </button> :
                    this.state.card ? <button class="checkOutButton" onClick={() => this.finalizedCard()}>
                        <span class="buttonInner">Use this Payment method</span>
                    </button> :
                        <button class="checkOutButton" onClick={() => this.placeOrder()}>
                            <span class="buttonInner">Place your order</span>
                        </button>}
                <hr />
                <div class='summary'>
                    <h3 class='summaryLabel'>Order Summary</h3>
                    <div class='summaryContent'>
                        <table class='summaryTable'>
                            <tbody>
                                <tr>
                                    <td>Items({checkouttotalitems}):</td>
                                    <td class='lastChild'>${this.state.checkoutsubtotal}</td>
                                </tr>
                                <tr>
                                    <td>Tax(9.25%):</td>
                                    <td class='lastChild'>${(this.state.checkoutsubtotal*(9.25/100)).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td><hr class='contentSeperator' /></td>
                                    <td class='lastChild'><hr class='contentSeperator' /></td>

                                </tr>
                                <tr>
                                    <td class='orderTotal'>Order total:</td>
                                    <td class='lastChild orderTotal'>${(this.state.checkoutsubtotal*(109.25/100)).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >)
        }

        return (<div>
            {this.props.orderflag?ordersuccess:
            <div class="checkoutHeader">
                <div class="row headerContainer">
                    <div class="col-md-2 logoContainer">
                        <img class='logo' src={logo} alt='amazon'></img>
                    </div>
                    <div class='col-md-10 titleContainer'>
                        <h1 class='title'>Checkout (<span class='items'>{(checkouttotalitems === 1) ? checkouttotalitems + ' item' : checkouttotalitems + ' items'}</span>)</h1>
                    </div>
                    <div class='row checkoutContent'>
                        <div class='col-md-9'>
                            {shippingaddress}
                            <hr class='lineposition' />
                            {paymentmethod}
                            <hr class='lineposition' />
                            {itemsandshipping}
                        </div>
                        {(checkoutdetails.length === 0) ? <div></div> : <div class='col-md-3'>
                            {orderitems}
                        </div>}
                    </div>
                </div>
            </div>}
        </div>)
    }

}


const mapStateToProps = state => {
    return {
        checkoutdetails: state.cart.checkoutdetails,
        checkoutsubtotal: state.cart.checkoutsubtotal,
        checkouttotalitems: state.cart.checkouttotalitems,
        orderflag: state.cart.orderflag
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getCustomerCheckoutDetails: payload => dispatch(getCustomerCheckoutDetails(payload)),
        placeOrder: payload => dispatch(placeOrder(payload)),
        clearOrderFlag : payload => dispatch(clearOrderFlag(payload)),
        addCard : payload => dispatch(addCard(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);