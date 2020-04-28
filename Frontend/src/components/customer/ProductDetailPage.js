import React, { Component } from 'react';
import { connect } from "react-redux";
import '../css/productDetailPage.css';
import AmazonPrime from '../images/AmazonPrimeLogo.png';
import { Redirect } from 'react-router';
import Cart from '../images/Cart.jpg'
import Rating from '@material-ui/lab/Rating';
import Drift from 'drift-zoom';
import { getProductDetails } from '../../redux/actions/customerActions';
import { moveToCartFromProductPage } from '../../redux/actions/cart';
import { addSaveForLater } from '../../redux/actions/cart';
import { Link } from 'react-router-dom';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            currentImage: "",
            magnifyScreen: true
        }
        this.enableMagnifyingScreen = this.enableMagnifyingScreen.bind(this);
    }

    changeQuantity = (selectedQuantity) => {
        this.setState({
            quantity: selectedQuantity
        })
    }

    changeCurrentImage = (hoveredImage) => {
        this.setState({
            currentImage: hoveredImage
        })
    }

    enableMagnifyingScreen = (value) => {
        this.setState({
            magnifyScreen: value
        })
    }

    moveToCart = (e) => {
        e.preventDefault();
        const data = {
            body: {
                product_id: this.props.clickedProductDetails._id,
                gift: false,
                quantity: this.state.quantity
            },
            id: sessionStorage.getItem("id")
        }
        this.props.moveToCartFromProductPage(data);
    }

    moveToSaveForLater = (e) => {
        e.preventDefault(); 
        this.props.addSaveForLater(sessionStorage.getItem("id"), this.props.clickedProductDetails._id);
    }

    componentDidMount() {
        new Drift(document.getElementById("imgHover"), {
            paneContainer: document.getElementById("pHover"),
            zoomFactor: 2
        });
        const { match: { params } } = this.props;
        this.props.getProductDetails(params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentImage: nextProps.clickedProductDetails.images[0]
        })
    }

    render() {
        let redirect = null;
        if (this.props.cartRedirect === true) {
            redirect = <Redirect to={`/customer/${sessionStorage.getItem("id")}/cart`} />
        }
        let redirectToSaveForLater = null;
        if (this.props.redirectToSaveForLater === true) {
            redirectToSaveForLater = <Redirect to={`/saveforlater`} />
        }
        return (
            <div>
                {redirect}
                {redirectToSaveForLater}
                <div className="row" style={{ margin: "50px 0px 0px" }}>

                    <div className="col-md-6" style={{ marginLeft: "-15px", marginRight: "10px" }}>

                        <div className="col-md-1">

                            {this.props.clickedProductDetails ? this.props.clickedProductDetails.images.map(productImage => {
                                return (
                                    <img onMouseEnter={() => this.changeCurrentImage(productImage)} className="smallImages" src={productImage} height="40" width="40" style={{ marginBottom: "20px" }} />
                                )
                            }) : ""}

                        </div>

                        <div className="col-md-11">
                            <img className="largeImage" id="imgHover" onMouseLeave={() => this.enableMagnifyingScreen(true)} onMouseEnter={() => this.enableMagnifyingScreen(false)} src={this.state.currentImage} height="540" width="570" data-zoom={this.state.currentImage} />
                        </div>

                    </div>

                    <div className="col-md-4" style={{ marginLeft: "-15px" }}>

                        <div className="row" style={{ fontSize: "19px", color: "#111111" }}>
                            {this.props.clickedProductDetails.name}
                        </div>

                        <div className="row" style={{ fontSize: "13px" }}>
                            <div className="col-md-1" style={{ color: "#111111", padding: "0px" }}>
                                by
                        </div>
                            <div className="col-md-11" style={{ color: "#0066C0", padding: "0px", marginLeft: "-20px" }}>
                                {this.props.clickedProductDetails.seller_id ? this.props.clickedProductDetails.seller_id.name : ""}
                            </div>
                        </div>

                        <div className="row" style={{ fontSize: "12px", marginTop: "5px", marginBottom: "3px" }}>
                            <span style={{ color: "#FFFFFF", backgroundColor: "#232F3E", padding: "3px" }}>Amazon's</span>
                            <span style={{ color: "#F69931", backgroundColor: "#232F3E", padding: "3px" }}>Choice</span>
                        </div>

                        <div style={{ marginBottom: "-20px" }}>
                            <div style={{ display: "inline" }}>
                                <Rating name="half-rating-read" size="large" value={3.50} precision={0.5} readOnly />
                            </div>

                            <div style={{ display: "inline", fontSize: "13px", color: "#0066C0", verticalAlign: "text-bottom" }}>
                                &nbsp;&nbsp;309 ratings
                        </div>
                        </div>

                        <hr style={{ marginBottom: "22px", marginRight: "20px" }} />

                        <p id="pHover" hidden={this.state.magnifyScreen} style={{ boxShadow: "0px 0px 3px 1.5px rgba(0,0,0,0.3)", backgroundColor: "white", left: "0px", top: "0px", width: "667px", height: "439px", zIndex: "40000", position: "absolute" }}></p>

                        <div className="row" style={{ marginTop: "-22px" }}>
                            <span style={{ fontSize: "13px", color: "#555555", verticalAlign: "text-bottom" }}>Price:</span>
                            <span style={{ fontSize: "17px", color: "#B12704" }}> $ {this.props.clickedProductDetails.price}</span>
                            <span style={{ fontSize: "13px" }}><img src={AmazonPrime} height="60" width="70" /></span>
                            <span style={{ fontSize: "13px", color: "#111111" }}>&</span>
                            <span style={{ fontSize: "13px", color: "#0066C0" }}> FREE Returns</span>
                        </div>

                    </div>

                    <div className="col-md-2 well well-lg" style={{ marginLeft: "-15px" }}>

                        <div style={{ marginLeft: "-8px" }}>

                            <div style={{ fontSize: "17px", color: "#B12704", marginTop: "-12px" }}> $ {this.props.clickedProductDetails.price}</div>

                            <div style={{ marginTop: "-7px" }}>
                                <span style={{ fontSize: "13px" }}><img src={AmazonPrime} height="60" width="70" /></span>
                                <span style={{ fontSize: "13px", color: "#111111" }}>&</span>
                                <span style={{ fontSize: "13px", color: "#0066C0" }}> FREE Returns</span>
                            </div>

                            <div style={{ color: "#111111", fontSize: "13px" }}>
                                FREE delivery:
                        </div>

                            <div style={{ fontSize: "13px", color: "#111111" }}>

                                <span style={{ fontWeight: "700" }}>
                                    Extended delivery time:
                            </span>

                                <span>
                                    &nbsp;We will ship this item as soon as we can and email you a confirmation when it ships.
                            </span>

                            </div>

                            <div style={{ fontSize: "17px", color: "#007600", marginTop: "4px", marginBottom: "10px" }}>
                                In Stock.
                        </div>

                            <div className="dropdown" style={{ marginBottom: "15px" }}>

                                <button className="form-control btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{ background: "#e7e9ec", borderColor: "#111111", height: "22px", fontSize: "11px", borderRadius: "1px", paddingTop: "3px", marginLeft: "-40px", width: "max-content" }}>
                                    Qty:{this.state.quantity} <span className="caret" style={{ paddingBottom: "3px" }}></span>
                                </button>

                                <ul className="dropdown-menu" role="menu" style={{ fontSize: "11px", minWidth: "max-content", cursor: "pointer", marginLeft: "-35px" }} >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
                                        return (<li ><a onClick={() => this.changeQuantity(value)}>{value}</a></li>)
                                    })}
                                </ul>

                            </div>

                            <div>
                                <button onClick={this.moveToCart} type="button" class="btn btn-secondary btn-lg btn-block row" style={{ fontSize: "13px", padding: "3px", borderColor: "#111111", background: "#f0c14b", borderRadius: "2px", textAlign: "left" }}>
                                    <img className="col-md-2" src={Cart} height="22px" width="30px" background-size="cover" style={{ textAlign: "left", padding: "0px" }} />
                                    <span className="col-md-10" style={{ textAlign: "center", paddingTop: "3px" }}>Add to Cart</span>
                                </button>
                            </div>

                        <div style={{ fontSize: "13px", marginTop: "15px" }}>
                            <span> Sold by </span>
                            <Link style={{ color: "#0066C0" }} to={{
                                                            pathname: "/seller/profile",
                                                            state: {
                                                                seller: this.props.clickedProductDetails.seller_id,
                                                                isSeller: false,
                                                            }
                                                        }} >{this.props.clickedProductDetails.seller_id ? this.props.clickedProductDetails.seller_id.name : ""}</Link>
                            <span> and  </span>
                            <span style={{ color: "#0066C0" }}> Fulfilled by Amazon. </span>
                        </div>

                            <hr />
                            <hr />

                            <div>
                                <button onClick={this.moveToSaveForLater} type="button" class="btn btn-secondary btn-lg btn-block" style={{ fontSize: "13px", padding: "5px", borderColor: "#111111", height: "30px", background: "#e7e9ec", borderRadius: "2px" }}> Save for later...</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartRedirect: state.cart.cartRedirect,
        clickedProductDetails: state.customer.clickedProductDetails,
        redirectToSaveForLater:state.cart.redirectToSaveForLater
    };
};


function mapDispatchToProps(dispatch) {
    return {
        getProductDetails: payload => dispatch(getProductDetails(payload)),
        moveToCartFromProductPage: payload => dispatch(moveToCartFromProductPage(payload)),
        addSaveForLater: (id,productid) => dispatch(addSaveForLater(id,productid))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);