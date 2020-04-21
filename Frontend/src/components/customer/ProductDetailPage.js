import React, { Component } from 'react';
import { connect } from "react-redux";
import '../css/productDetailPage.css';
import AmazonPrime from '../images/AmazonPrimeLogo.png';
import Cart from '../images/Cart.jpg'
import Rating from '@material-ui/lab/Rating';
import Drift from 'drift-zoom';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            currentImage:Cart,
            magnifyScreen:true
        }
        this.enableMagnifyingScreen=this.enableMagnifyingScreen.bind(this);
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

    componentDidMount() {
        new Drift(document.getElementById("imgHover"), {
            paneContainer: document.getElementById("pHover"),
            zoomFactor: 2,
            hoverDelay: 500
        });
    }
    render() {
        return (
            <div className="row" style={{ margin: "50px 0px 0px" }}>

                <div className="col-md-6" style={{ marginLeft: "-15px", marginRight: "10px" }}>

                    <div className="col-md-1">
                        <img onMouseEnter={() => this.changeCurrentImage(AmazonPrime)} className="smallImages" src={AmazonPrime} height="40" width="40" />
                    </div>

                    <div className="col-md-11">
                        <img className="largeImage" id="imgHover" onMouseLeave={() => this.enableMagnifyingScreen(true)} onMouseEnter={() => this.enableMagnifyingScreen(false)} src={this.state.currentImage} height="540" width="570" data-zoom={this.state.currentImage} />
                    </div>

                </div>

                <div className="col-md-4" style={{ marginLeft: "-15px" }}>

                    <div className="row" style={{ fontSize: "19px", color: "#111111" }}>
                        Product Name
                    </div>

                    <div className="row" style={{ fontSize: "13px" }}>
                        <div className="col-md-1" style={{ color: "#111111", padding: "0px" }}>
                            by
                        </div>
                        <div className="col-md-11" style={{ color: "#0066C0", padding: "0px", marginLeft: "-20px" }}>
                            Seller Name
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

                    <hr style={{marginBottom: "22px", marginRight: "20px" }} />

                    <p id="pHover" hidden={this.state.magnifyScreen} style={{ left: "0px", top: "0px", width: "667px", height: "439px", zIndex: "40000", position: "absolute" }}></p>

                    <div className="row" style={{ marginTop: "-22px" }}>
                        <span style={{ fontSize: "13px", color: "#555555", verticalAlign: "text-bottom" }}>Price:</span>
                        <span style={{ fontSize: "17px", color: "#B12704" }}> $ 120.00</span>
                        <span style={{ fontSize: "13px" }}><img src={AmazonPrime} height="60" width="70" /></span>
                        <span style={{ fontSize: "13px", color: "#111111" }}>&</span>
                        <span style={{ fontSize: "13px", color: "#0066C0" }}> FREE Returns</span>
                    </div>

                </div>

                <div className="col-md-2 well well-lg" style={{ marginLeft: "-15px" }}>

                    <div style={{ marginLeft: "-8px" }}>

                        <div style={{ fontSize: "17px", color: "#B12704", marginTop: "-12px" }}> $ 120.00</div>

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

                        <div className="dropdown" style={{ marginBottom: "15px"}}>

                            <button className="form-control btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{ background: "#e7e9ec", borderColor: "#111111", height: "22px", fontSize: "11px", borderRadius: "1px", paddingTop: "3px",marginLeft:"-40px", width: "max-content" }}>
                                Qty:{this.state.quantity} <span className="caret" style={{ paddingBottom: "3px" }}></span>
                            </button>

                            <ul className="dropdown-menu" role="menu" style={{ fontSize: "11px", minWidth: "max-content", cursor: "pointer",marginLeft:"-35px" }} >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
                                    return (<li ><a onClick={() => this.changeQuantity(value)}>{value}</a></li>)
                                })}
                            </ul>

                        </div>

                        <div>
                            <button type="button" class="btn btn-secondary btn-lg btn-block" style={{ padding: "5px", borderColor: "#111111", height: "30px", background: "#f0c14b", borderRadius: "2px" }}>
                                <div style={{ marginBottom: "3px", display: "inline", alignContent: "left" }}><img src={Cart} height="24px" width="30px" background-size="cover" style={{ borderRadius: "2px", textAlign: "left", marginTop: "-8.72px", marginLeft: "-40px" }} /></div>
                                <div style={{ display: "inline", fontSize: "13px", verticalAlign: "text-top" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add to Cart</div>
                            </button>
                        </div>

                        <div style={{ fontSize: "13px", marginTop: "15px" }}>
                            <span> Sold by </span>
                            <span style={{ color: "#0066C0" }}>Seller</span>
                            <span> and  </span>
                            <span style={{ color: "#0066C0" }}> Fulfilled by Amazon. </span>
                        </div>

                        <hr />
                        <hr />

                        <div>
                            <button type="button" class="btn btn-secondary btn-lg btn-block" style={{ fontSize: "13px", padding: "5px", borderColor: "#111111", height: "30px", background: "#e7e9ec", borderRadius: "2px" }}> Save for later...</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);